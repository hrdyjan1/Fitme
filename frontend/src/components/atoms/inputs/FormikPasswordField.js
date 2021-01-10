import React from 'react';
import {
  OutlinedInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { Field } from 'formik';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { InputLabel } from 'src/components/atoms';

function FormikPasswordField({ name, label, placeholder }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {label && <InputLabel label={label} />}
      <Field
        validateOnBlur
        validateOnChange
        name={name}
        render={({ form }) => (
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              id={name}
              type={showPassword ? 'text' : 'password'}
              name={name}
              placeholder={placeholder}
              onChange={form.handleChange}
              error={Boolean(form.errors[name] && form.touched[name])}
              onBlur={form.handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error>
              {form.errors[name] &&
                form.touched[name] &&
                String(form.errors[name])}
            </FormHelperText>
          </FormControl>
        )}
      />
    </>
  );
}

export { FormikPasswordField };

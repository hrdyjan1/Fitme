import React from 'react';
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import { Field } from 'formik';
import { Visibility, VisibilityOff } from '@material-ui/icons';

function FormikPasswordField({
  name, label, placeholder, formikBag, validText,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Field
      validateOnBlur
      validateOnChange
      name={name}
      render={({ form }) => (
        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel shrink htmlFor="filled-adornment-password">
            {label}
          </InputLabel>
          <FilledInput
            id={name}
            type={showPassword ? 'text' : 'password'}
            name={name}
            placeholder={placeholder}
            onChange={formikBag.handleChange}
            error={Boolean(form.errors[name] && form.touched[name])}
            onBlur={formikBag.handleBlur}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            )}
          />
          <FormHelperText error>
            {form.errors[name] && form.touched[name] && String(form.errors[name]) && validText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

export { FormikPasswordField };

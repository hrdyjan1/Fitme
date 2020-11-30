import React from 'react';
import { TextField } from '@material-ui/core'
import { Field } from 'formik';

function FormikTextField({name, label, placeholder}) {
  return (
    <>
      <div
        color="textPrimary"
        className="input__label"
      >
        {label}
      </div>
      <Field
        validateOnBlur
        validateOnChange
        name={name}
        render={({ form }) => (
          <TextField
            id={name}
            name={name}
            placeholder={placeholder}
            value={form.values[name]}
            onChange={form.handleChange}
            error={Boolean(form.errors[name] && form.touched[name])}
            onBlur={form.handleBlur}
            helperText={
              form.errors[name]
              && form.touched[name]
              && String(form.errors[name])
            }
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </>
  );
}

export { FormikTextField };

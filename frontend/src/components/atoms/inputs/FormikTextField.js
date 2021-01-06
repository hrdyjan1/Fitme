import React from 'react';
import { TextField } from '@material-ui/core';
import { Field } from 'formik';
import { InputLabel } from 'src/components/atoms';

function FormikTextField({ name, label, placeholder }) {
  return (
    <>
      { label && <InputLabel label={label}/> }
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

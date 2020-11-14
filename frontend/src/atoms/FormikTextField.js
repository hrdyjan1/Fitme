import React from 'react';
import { TextField } from '@material-ui/core'
import {Field} from 'formik'

function FormikTextField({ name, label, placeholder, formikBag }) {

  return (
    <Field
      validateOnBlur
      validateOnChange
      name={name}
      render={({ form }) => (
        <TextField
          name={name}
          placeholder={placeholder}
          label={label}
          value={formikBag.values[name]}
          onChange={formikBag.handleChange}
          error={Boolean(form.errors[name] && form.touched[name])}
          onBlur={formikBag.handleBlur}
          helperText={
            form.errors[name]
            && form.touched[name]
            && String(form.errors[name])
          }
          variant="filled"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
}

export {FormikTextField}

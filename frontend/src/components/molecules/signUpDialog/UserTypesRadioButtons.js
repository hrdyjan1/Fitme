import React from 'react';
import {Box, FormControlLabel, Radio} from '@material-ui/core'
import { Field } from 'formik'
import { RadioGroup } from 'formik-material-ui';

function UserTypesRadioButtons({ name }) {
  return (
    <Field component={RadioGroup} name={name}>
        <div className="input__label">Vyberte kategorii účtu</div>
        <Box display="flex" justifyContent="space-evenly">
        <FormControlLabel
          value="athlete"
          control={<Radio color="primary" />}
          label="Sportovec"
        />
        <FormControlLabel
          value="place"
          control={<Radio color="primary" />}
          label="Majitel sportoviště"
        />
        <FormControlLabel
          disabled
          value="trainer"
          control={<Radio color="primary" />}
          label="Trenér"
        />
        </Box>
    </Field>
  );
}

export { UserTypesRadioButtons };

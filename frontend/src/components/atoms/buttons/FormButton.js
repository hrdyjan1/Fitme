import React from 'react';
import { Button } from '@material-ui/core';

const FormButton = ({ text, disabled }) => (
  <Button
    disabled={disabled}
    variant="contained"
    type="submit"
    color="primary"
    size="large"
  >
    {text}
  </Button>
);

export { FormButton };

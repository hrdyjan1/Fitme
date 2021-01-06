import React from 'react';
import { Button } from '@material-ui/core'

const InputFileButton = ({ text, onChange, loading }) => {
  return (
    <Button
      component="label"
      color="primary"
      size="small"
      disabled={loading}
    >
      <input
        hidden
        accept="image/*"
        id="contained-button-file"
        type="file"
        onChange={onChange}
      />
      {text}
    </Button>
  )
};

export { InputFileButton };

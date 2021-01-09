import React from 'react';
import { Button } from '@material-ui/core'

const InputImageButton = ({ text, onLoad, loading }) => {
  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => onLoad(reader.result);
  };

  return (
    <Button
      component="label"
      variant="contained"
      color="primary"
      size="large"
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

export { InputImageButton };

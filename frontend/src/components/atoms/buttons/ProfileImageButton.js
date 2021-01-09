import React from 'react';
import { Button } from '@material-ui/core'

const ProfileImageButton = ({ text, onClick, loading }) => {
  return (
    <Button
      color="primary"
      variant="contained"
      fullWidth
      size="small"
      onClick={onClick}
      disabled={loading}
    >
      {text}
    </Button>
  )
};

export { ProfileImageButton };

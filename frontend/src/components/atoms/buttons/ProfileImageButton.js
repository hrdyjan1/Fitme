import React from 'react';
import { Button } from '@material-ui/core';

const ProfileImageButton = ({ text, onClick, loading }) => (
  <Button
    color="primary"
    variant="contained"
    onClick={onClick}
    disabled={loading}
  >
    {text}
  </Button>
);

export { ProfileImageButton };

import React from 'react';
import { Button } from '@material-ui/core';

const ImageButton = ({ text, onClick, loading }) => (
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
);

export { ImageButton };

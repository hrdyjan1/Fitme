/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Chip } from '@material-ui/core';

const SportTypeChip = ({ id, text, onDelete, loading }) => {

  return (
    <Chip
      size="small"
      label={text}
      clickable
      color="primary"
      onDelete={() => onDelete(id)}
      disabled={loading}
    />
  );
};

export { SportTypeChip };

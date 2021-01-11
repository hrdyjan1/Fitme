/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Chip } from '@material-ui/core';

const SportTypeChip = ({
  text, onDelete, loading, className,
}) => (
  <Chip
    label={text}
    clickable
    color="primary"
    onDelete={onDelete}
    disabled={loading}
    className={className}
  />
);

export { SportTypeChip };

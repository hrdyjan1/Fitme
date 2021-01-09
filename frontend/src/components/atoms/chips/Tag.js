/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Chip } from '@material-ui/core';

const Tag = ({ text, onDelete }) => {

  return (
    <Chip
      size="small"
      label={text}
      clickable
      color="primary"
      onDelete={onDelete}
    />
  );
};

export { Tag };

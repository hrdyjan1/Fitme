/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Chip, TextField } from '@material-ui/core';

const TextInput = ({ name, placeholder }) => (
  <TextField
    placeholder="Jméno disciplíny"
    variant="outlined"
    size="medium"
    name="tag"
    fullWidth
    type="text"
  />
);

export { TextInput };

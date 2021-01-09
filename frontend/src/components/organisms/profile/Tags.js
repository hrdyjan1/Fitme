/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  TextField,
  Button,
  Divider,
  Box,
} from '@material-ui/core';
import { FormTitle, Tag, InputLabel, TextInput } from 'src/components/atoms'

const useStyles = makeStyles((theme) => ({
  titleCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Tags = ({ tags, onSave, onDelete }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <FormTitle title="Přidávání a odebírání sportovních disciplín"/>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
          { tags.map(tag => (
            <Tag text={tag.name} onDelete={onDelete}/>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <InputLabel label="Sportovní disciplína"/>
            <TextField
              placeholder="Jméno disciplíny"
              variant="outlined"
              size="medium"
              name="tag"
              fullWidth
              type="text"
            />
          </div>
          <Box marginY={4}>
            <Grid item container justify="center">
              <Button
                variant="contained"
                type="submit"
                color="primary"
                size="large"
              >
                Přidat
              </Button>
            </Grid>
          </Box>
        </Grid>

      </Grid>
    </div>
  );
};

export { Tags };

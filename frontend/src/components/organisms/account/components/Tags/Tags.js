/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Chip,
  Box,
} from '@material-ui/core';
import { noop } from 'src/constants/functions/basic';

const useStyles = makeStyles((theme) => ({
  root: {},
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  titleCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Notifications = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Přidávání a odebírání sportovních disciplín
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
          <Chip
            size="small"
            label="Basketball"
            clickable
            color="primary"
            onDelete={noop}
          />
          <Chip
            size="small"
            label="Streetball"
            clickable
            color="primary"
            onDelete={noop}
          />
          <Chip
            size="small"
            label="Košíková"
            clickable
            color="primary"
            onDelete={noop}
          />
          <Chip
            size="small"
            label="Posilovna"
            clickable
            color="primary"
            onDelete={noop}
          />
          <Chip
            size="small"
            label="Bazén"
            clickable
            color="primary"
            onDelete={noop}
          />
          <Chip
            size="small"
            label="Lezecká stěna"
            clickable
            color="primary"
            onDelete={noop}
          />
          <Chip
            size="small"
            label="Zumba"
            clickable
            color="primary"
            onDelete={noop}
          />

        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              className={classes.inputTitle}
            >
              Sportovní disciplína
            </Typography>
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

export default Notifications;

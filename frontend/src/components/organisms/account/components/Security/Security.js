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
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  switchTitle: {
    fontWeight: 700,
  },
  titleCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Security = (props) => {
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
            Změna hesla
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Aktuální heslo
          </Typography>
          <TextField
            placeholder=""
            variant="outlined"
            size="medium"
            name="fullname"
            fullWidth
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Nové heslo
          </Typography>
          <TextField
            placeholder=""
            variant="outlined"
            size="medium"
            name="fullname"
            fullWidth
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Heslo znova
          </Typography>
          <TextField
            placeholder=""
            variant="outlined"
            size="medium"
            name="fullname"
            fullWidth
            type="password"
          />
        </Grid>
        <Grid item container justify="center" xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
          >
            Uložit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Security;

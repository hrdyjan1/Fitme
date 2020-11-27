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
}));

const General = (props) => {
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
            Základní informace
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Název
          </Typography>
          <TextField
            placeholder="Sportoviště"
            variant="outlined"
            size="medium"
            name="fullname"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            IČO
          </Typography>
          <TextField
            placeholder="25596641"
            variant="outlined"
            size="medium"
            name="ico"
            fullWidth
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Popis
          </Typography>
          <TextField
            placeholder="Naše sportoviště ..."
            variant="outlined"
            name="bio"
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Adresa
          </Typography>
          <TextField
            placeholder="Adresa 123, Město"
            variant="outlined"
            size="medium"
            name="address"
            fullWidth
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Zeměpisná šířka
          </Typography>
          <TextField
            placeholder="50,1232"
            variant="outlined"
            size="medium"
            name="latitude"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Zeměpisná délka
          </Typography>
          <TextField
            placeholder="14,538"
            variant="outlined"
            size="medium"
            name="longitude"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Email
          </Typography>
          <TextField
            placeholder="email@sportoviste.cz"
            variant="outlined"
            size="medium"
            name="email"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Telefon
          </Typography>
          <TextField
            placeholder="+420 723 456 789"
            variant="outlined"
            size="medium"
            name="phone"
            fullWidth
            type="text"
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

export default General;

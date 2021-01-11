/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Avatar,
  Box,
  Grid,
  ListItem,
  Typography,
} from '@material-ui/core';
import CardBase from 'src/components/organisms/cardBase';

const useStyles = makeStyles((theme) => ({
  cardBase: {
    borderWidth: 1,
    borderRadius: theme.spacing(1),
    '& .card-base__content': {
      padding: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
    },
  },
  avatar: {
    width: 110,
    height: 110,
    justifyContent: 'flex-end',
    border: `4px solid ${theme.palette.alternate.dark}`,
    borderRadius: '100%',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
  },
  listItem: {
    height: '100%',
    width: '100%',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  listItemAvatar: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  listItemText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 0,
    height: '100%',
  },
  fullWidth: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
}));

const TrainerCard = ({
  name, imageSrc, description, onDelete, loading,
}) => {
  const classes = useStyles();

  return (
    <CardBase className={classes.cardBase}>
      <ListItem disableGutters className={classes.listItem}>
        <Grid
          container
          justify="flex-end"
          alignContent="space-between"
          className={classes.fullWidth}
        >
          <Grid item xs={8} container direction="column" justify="center">
            <Typography>{name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center">
              <Avatar src={imageSrc} className={classes.avatar} />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box marginY={2}>
              <Typography>{description}</Typography>
            </Box>
          </Grid>
          <Grid container item sm={12} justify="flex-end">
            <Button
              onClick={onDelete}
              variant="contained"
              color="secondary"
              disabled={loading}
              size="small"
            >
              Odstranit
            </Button>
          </Grid>
        </Grid>
      </ListItem>
    </CardBase>
  );
};

export { TrainerCard };

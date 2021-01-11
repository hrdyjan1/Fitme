import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { CardBase } from 'src/components/organisms';
import { useHistory } from 'react-router-dom';
import { route } from 'src/constants/routes';
import { SectionHeader } from '../profile/SectionHeader';

const useStyles = makeStyles((theme) => ({
  root: {},
  cardBase: {
    boxShadow: 'none',
    cursor: 'pointer',
    background: theme.palette.alternate.main,
    '&:hover': {
      boxShadow: '0 9px 18px 0 rgba(0, 0, 0, 0.5)',
    },
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
    border: `4px solid ${theme.palette.alternate.dark}`,
    borderRadius: '100%',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
  },
  listItem: {
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
  bonus: {
    fontWeight: 'bold',
  },
}));

const Team = (props) => {
  const { data, className } = props;
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onClick = (id) => history.push(route.trainerDetail(id));

  return (
    <div className={clsx(classes.root, className)}>
      <SectionHeader
        title="Poznej naše trenéry"
        subtitle="Zde je seznam našich trenérů. Pro bližší informace můžete kliknout na trenéra."
      />
      <Grid container spacing={isMd ? 2 : 1}>
        {data.map((item) => (
          <Grid item xs={6} sm={4} key={item.key} data-aos="fade-up">
            <CardBase
              className={classes.cardBase}
              liftUp
              onClick={() => onClick(item.id)}
            >
              <ListItem disableGutters className={classes.listItem}>
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar src={item.imageURL} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary={item.authorName}
                  secondary={item.bonus}
                  primaryTypographyProps={{
                    className: classes.bonus,
                    variant: 'h6',
                    align: isMd ? 'left' : 'center',
                  }}
                  secondaryTypographyProps={{
                    varinat: 'subtitle1',
                    color: 'textPrimary',
                    align: isMd ? 'left' : 'center',
                  }}
                />
              </ListItem>
            </CardBase>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export { Team };

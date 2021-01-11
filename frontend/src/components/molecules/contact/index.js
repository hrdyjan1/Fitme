import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import CityIcon from '@material-ui/icons/House';
import StreetIcon from '@material-ui/icons/Streetview';
import { SectionHeader } from '../profile/SectionHeader';

const useStyles = makeStyles((theme) => ({
  root: {},
  map: {
    zIndex: 9,
  },
  icon: {
    background: 'transparent',
    borderRadius: 0,
  },
  item: {
    padding: theme.spacing(2),
    paddingLeft: 0,
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
}));

const Contact = (props) => {
  const {
    className, phone, email, city, street, title,
  } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div>
        <SectionHeader
          title={title}
          subtitle="Pokud se chcete na cokoliv zeptat, tak zde jsou důležité údaje, které by vám mohly pomoci."
          subtitleProps={{
            variant: 'body1',
            color: 'textPrimary',
          }}
          data-aos="fade-up"
          align="left"
        />
        <List disablePadding>
          <ListItem disableGutters data-aos="fade-up">
            {city && (
              <div className={classes.item}>
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar>
                    <CityIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary="Město"
                  secondary={city}
                  primaryTypographyProps={{
                    className: classes.title,
                    variant: 'subtitle1',
                    color: 'textSecondary',
                  }}
                  secondaryTypographyProps={{
                    variant: 'subtitle1',
                    color: 'textPrimary',
                  }}
                />
              </div>
            )}
            {street && (
              <div className={classes.item}>
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar>
                    <StreetIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary="Ulice"
                  secondary={street}
                  primaryTypographyProps={{
                    className: classes.title,
                    variant: 'subtitle1',
                    color: 'textSecondary',
                  }}
                  secondaryTypographyProps={{
                    variant: 'subtitle1',
                    color: 'textPrimary',
                  }}
                />
              </div>
            )}
            {phone && (
              <div className={classes.item}>
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar>
                    <PhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary="Telefon"
                  secondary={phone}
                  primaryTypographyProps={{
                    className: classes.title,
                    variant: 'subtitle1',
                    color: 'textSecondary',
                  }}
                  secondaryTypographyProps={{
                    variant: 'subtitle1',
                    color: 'textPrimary',
                  }}
                />
              </div>
            )}
            {email && (
              <div className={classes.item}>
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary="Email"
                  secondary={email}
                  primaryTypographyProps={{
                    className: classes.title,
                    variant: 'subtitle1',
                    color: 'textSecondary',
                  }}
                  secondaryTypographyProps={{
                    variant: 'subtitle1',
                    color: 'textPrimary',
                  }}
                />
              </div>
            )}
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export { Contact };

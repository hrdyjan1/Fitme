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
import ImageIcon from '@material-ui/icons/Image';
import { SectionHeader } from '../profile/SectionHeader';

const useStyles = makeStyles(() => ({
  root: {},
  map: {
    zIndex: 9,
  },
  icon: {
    background: 'transparent',
    borderRadius: 0,
  },
}));

const Contact = (props) => {
  const {
    data, className, phone, email, city, street, ...rest
  } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div>
        <SectionHeader
          title="Kontaktujte nás"
          subtitle="Pokud se chcete na cokoliv zeptat, tak zde jsou důležité údaje, které by vám mohli pomoci."
          subtitleProps={{
            variant: 'body1',
            color: 'textPrimary',
          }}
          data-aos="fade-up"
          align="left"
        />
        <List disablePadding>
          <ListItem disableGutters data-aos="fade-up">
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
          </ListItem>
          <ListItem disableGutters data-aos="fade-up">
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
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export { Contact };

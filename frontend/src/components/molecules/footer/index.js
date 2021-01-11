/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  Grid,
  List,
  ListItem,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { route } from 'src/constants/routes';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12, 0),
    },
    background: theme.palette.background.footer,
  },
  footerContainer: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
  },
  logoContainerItem: {
    paddingTop: 0,
  },
  logoContainer: {
    textAlign: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoText: {
    color: 'white',
  },
  groupTitle: {
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
  socialIcon: {
    padding: 0,
    marginRight: theme.spacing(1),
    color: 'rgba(255,255,255,.6)',
    '&:hover': {
      background: 'transparent',
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 24,
  },
  menuListContainer: {
    padding: '0 !important',
  },
  menu: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  },
  menuItem: {
    display: 'inline',
    margin: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  listItem: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  menuGroupItem: {
    display: 'inline',
    paddingTop: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    paddingBottom: theme.spacing(1 / 2),
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
    color: 'white',
  },
  divider: {
    width: '100%',
  },
  navLink: {
    marginRight: 5,
    color: 'rgba(255,255,255,.6)',
  },
  navLinkInternal: {
    cursor: 'pointer',
  },
}));

const Footer = ({ pages, className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();

  const historyPush = (path) => history.push(path);
  const goHome = () => historyPush(route.home());

  const MenuGroup = (props) => {
    const { item } = props;
    return (
      <List disablePadding className={classes.menuItem}>
        <ListItem disableGutters className={classes.menuGroupItem}>
          <Typography variant="body2" className={classes.menuGroupTitle}>
            {item.groupTitle}
          </Typography>
        </ListItem>
        {item.pages.map((page) => (
          <ListItem
            disableGutters
            key={page.title}
            className={classes.menuGroupItem}
          >
            {page.href.includes('http') ? (
              <Typography
                variant="body2"
                component="a"
                href={page.href}
                className={clsx(classes.navLink, 'submenu-item')}
              >
                {page.title}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                component="p"
                onClick={goHome}
                className={clsx(
                  classes.navLink,
                  classes.navLinkInternal,
                  'submenu-item',
                )}
              >
                {page.title}
              </Typography>
            )}
          </ListItem>
        ))}
      </List>
    );
  };

  const Pages = () => {
    const {
      profile, sportPlaces, web, external,
    } = pages.web.children;
    return (
      <div className={classes.menu}>
        <MenuGroup item={profile} />
        <MenuGroup item={web} />
        <MenuGroup item={sportPlaces} />
        <MenuGroup item={external} />
      </div>
    );
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.footerContainer}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={2}>
            <List disablePadding>
              <ListItem
                disableGutters
                className={clsx(classes.logoContainerItem, classes.listItem)}
              >
                <div className={classes.logoContainer}>
                  <Typography variant="h6" className={classes.logoText}>
                    Fit.me
                  </Typography>
                </div>
              </ListItem>
              <ListItem disableGutters className={classes.listItem}>
                <IconButton className={classes.socialIcon}>
                  <FacebookIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.socialIcon}>
                  <InstagramIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.socialIcon}>
                  <TwitterIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.socialIcon}>
                  <PinterestIcon className={classes.icon} />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={10}>
            <Pages />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export { Footer };

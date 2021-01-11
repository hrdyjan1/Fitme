import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { CardBase } from 'src/components/organisms';

const useStyles = makeStyles((theme) => ({
  menu: {
    height: 'auto',
  },
  list: {
    display: 'inline-flex',
    overflow: 'auto',
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(-3),
      marginLeft: theme.spacing(-3),
    },
  },
  listItem: {
    cursor: 'pointer',
    marginRight: theme.spacing(2),
    flex: 0,
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      borderLeft: '2px solid transparent',
    },
  },
  listItemActive: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    '& .menu__item': {
      color: theme.palette.text.primary,
    },
  },
}));

function ProfileMenu({ pages, pageId, setPageId }) {
  const classes = useStyles();
  return (
    <CardBase withShadow align="left" className={classes.menu}>
      <List disablePadding className={classes.list}>
        {pages.map((item) => (
          <ListItem
            key={item.id}
            component="a"
            className={clsx(
              classes.listItem,
              pageId === item.id ? classes.listItemActive : {},
            )}
            onClick={() => setPageId(item.id)}
            disableGutters
          >
            <Typography
              variant="subtitle1"
              noWrap
              color="textSecondary"
              className="menu__item"
            >
              {item.title}
            </Typography>
          </ListItem>
        ))}
      </List>
    </CardBase>
  );
}

export { ProfileMenu };

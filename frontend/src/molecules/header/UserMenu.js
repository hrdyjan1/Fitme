import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Menu, MenuItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { ExitToApp, AccountBox } from '@material-ui/icons';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    disableAutoFocusItem
    disableScrollLock
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function UserMenu({
  onProfileClick, onLogoutClick, onClose, anchorEl,
}) {
  return (
    <StyledMenu
      id="user-dropdown-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <StyledMenuItem onClick={onProfileClick}>
        <ListItemIcon>
          <AccountBox fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Můj profil" />
      </StyledMenuItem>
      <StyledMenuItem onClick={onLogoutClick}>
        <ListItemIcon>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Odhlásit" />
      </StyledMenuItem>
    </StyledMenu>
  );
}

export { UserMenu };

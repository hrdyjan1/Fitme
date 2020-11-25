import React from 'react';
import {
  Box,
  Dialog,
  Toolbar,
  IconButton,
  Typography,
  DialogContent,
  Button,
  Grid,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import useTheme from '@material-ui/core/styles/useTheme';
import { useUser } from 'src/contexts/user';
import { compose } from 'src/constants/functions/basic';
import { useNotification } from 'src/contexts/notification';

const SUCCESS_MESSAGE = 'Prave jste se uspesne odhlasil.';

function LogoutDialog({ show, close }) {
  const theme = useTheme();
  const { logout } = useUser();
  const { showMessage } = useNotification();

  const showLogoutSuccess = () => showMessage(SUCCESS_MESSAGE);
  const onLogout = compose(showLogoutSuccess, close, logout);

  return (
    <Dialog fullWidth className="logout" open={show}>
      <Toolbar
        variant="regular"
        className="toolbar"
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <div />
        <Box color="white">
          <Typography variant="h6"> Odhlášení</Typography>
        </Box>
        <IconButton onClick={close}>
          <Close fontSize="large" style={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
      <DialogContent>
        <Box
          marginTop="20px"
          width="100%"
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          alignItems="center"
        >
          <Box width="65%" marginBottom={5}>
            <Box m={3}>
              <Typography color="main" variant="h5" align="center">
                Opravdu se chcete odhlásit?
              </Typography>
            </Box>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Button variant="outlined" color="secondary" size="large" onClick={onLogout}>
                  Ano
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="large" onClick={close}>
                  Ne
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;

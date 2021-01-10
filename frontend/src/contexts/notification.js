/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createCtx } from 'src/constants/functions/createCtx';

const SEVERITY = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

const [useNotification, Provider] = createCtx();

function Alert({ ...rest }) {
  return <MuiAlert elevation={6} variant="filled" {...rest} />;
}

function NotificationProvider({ children, autoHideDuration = 3000 }) {
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState(SEVERITY.SUCCESS);

  function showMessage(_message, _severity = SEVERITY.SUCCESS) {
    setMessage(_message);
    setSeverity(_severity);
    setOpen(true);
  }

  function showErrorMessage(_message) {
    showMessage(_message, SEVERITY.ERROR);
  }

  function closeMessage() {
    setOpen(false);
  }

  const value = { showMessage, showErrorMessage, closeMessage };

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={closeMessage}
      >
        <Alert severity={severity} onClose={closeMessage}>
          {message}
        </Alert>
      </Snackbar>
      <Provider value={value}>{children}</Provider>
    </>
  );
}

export { NotificationProvider, useNotification, SEVERITY };

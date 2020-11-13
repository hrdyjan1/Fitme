import React from 'react'
import { Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

function UserNameButton ({firstName, onClick }) {
  return (
    <Button
      variant="text"
      color="primary"
      size="large"
      aria-controls="customized-menu"
      aria-haspopup="true"
      onClick={onClick}
      startIcon={<AccountCircle style={{ fontSize: 30 }} />}>
      {firstName}
    </Button>
  )
}

export { UserNameButton };

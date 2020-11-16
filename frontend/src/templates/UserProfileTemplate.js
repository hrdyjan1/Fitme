import React from 'react';
import { Box } from '@material-ui/core';
import {
  ContactInfoForm,
  AddressForm,
  ChangePasswordForm,
  ImageForm,
} from 'src/organisms';

function UserProfileTemplate({
  user,
  passwordError,
  passwordLoading,
  userError,
  userLoading,
  onSaveUser,
  onSavePassword,
  imageError,
  imageLoading,
  onSaveImage,
}) {
  return (
    <div>
      <h2>Můj profil</h2>
      {user && (
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
          marginTop="20px"
        >
          <Box width="350px">
            <ContactInfoForm
              user={user}
              error={userError}
              loading={userLoading}
              onSave={onSaveUser}
            />
          </Box>
          <Box width="350px">
            <AddressForm
              user={user}
              error={userError}
              loading={userLoading}
              onSave={onSaveUser}
            />
          </Box>
          <Box width="350px">
            <ChangePasswordForm
              error={passwordError}
              loading={passwordLoading}
              onSave={onSavePassword}
            />
          </Box>
          <Box width="350px">
            <ImageForm
              error={imageError}
              loading={imageLoading}
              onSave={onSaveImage}
            />
          </Box>
        </Box>
      )}
    </div>
  );
}

export { UserProfileTemplate };

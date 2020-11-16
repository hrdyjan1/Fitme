import React from 'react';
import { Box, LinearProgress } from '@material-ui/core';
import { ContactInfoForm, AddressForm, ChangePasswordForm } from 'src/organisms';
import { ProfilePicture } from 'src/molecules';

function UserProfileTemplate(
  {
    user, passwordLoading, userLoading, profileImageLoading, onSaveUser, onSavePassword, onSaveProfileImage,
  },
) {
  return (
    <div>
      { (passwordLoading || userLoading || profileImageLoading) && <LinearProgress />}
      <h2>Můj profil</h2>
      {user && (
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        marginTop="20px"
      >
        <Box
          marginTop="20px"
          marginBottom="70px"
          width="100%"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
        >
          <ProfilePicture imageURL={user?.imageURL} loading={profileImageLoading} onSave={onSaveProfileImage} />
        </Box>
        <Box width="350px">
          <ContactInfoForm user={user} loading={userLoading} onSave={onSaveUser} />
        </Box>
        <Box width="350px">
          <AddressForm user={user} loading={userLoading} onSave={onSaveUser} />
        </Box>
        <Box width="350px">
          <ChangePasswordForm loading={passwordLoading} onSave={onSavePassword} />
        </Box>
      </Box>
      )}
    </div>
  );
}

export { UserProfileTemplate };

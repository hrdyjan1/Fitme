import React from 'react'
import { Box } from '@material-ui/core'
import { ContactInfoForm, AddressForm, ChangePasswordForm } from 'src/organisms'
import { ProfilePicture } from 'src/molecules'

function UserProfileTemplate(
  { user, passwordError, passwordLoading, userError, userLoading, onSaveUser, onSavePassword }
  ) {
  return (
    <div>
      {console.log(JSON.stringify(user))}
      <h2>Můj profil</h2>
      {user && <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
          marginTop="20px">
          <Box
            marginTop="20px"
            marginBottom="70px"
            width="100%"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
          >
            <ProfilePicture imageURL={user?.imageURL} />
          </Box>
          <Box width="350px">
            <ContactInfoForm user={user} error={userError} loading={userLoading} onSave={onSaveUser}/>
          </Box>
          <Box width="350px">
            <AddressForm user={user} error={userError} loading={userLoading} onSave={onSaveUser}/>
          </Box>
          <Box width="350px">
            <ChangePasswordForm error={passwordError} loading={passwordLoading} onSave={onSavePassword}/>
          </Box>
        </Box>
      }
    </div>
  );
}

export { UserProfileTemplate };

import React from 'react'
import { Card, Box } from '@material-ui/core'
import { ContactInfoForm, AddressForm, ChangePasswordForm } from 'src/organisms'

function UserProfileTemplate() {
  return (
    <div>
      <h2>Můj profil</h2>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        marginTop="20px">
        <Box width="350px">
          <Card>
            <ContactInfoForm/>
          </Card>
        </Box>
        <Box width="350px">
          <Card>
            <AddressForm/>
          </Card>
        </Box>
        <Box width="350px">
          <Card>
            <ChangePasswordForm/>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export { UserProfileTemplate };

import React from 'react'
import {Box, Card, CardMedia} from '@material-ui/core'

function ProfilePicture({imageURL}) {

  return (
    <Box width="300px" justifyText="center">
      <Card>
        <CardMedia component="img" image={imageURL} height="350px" width="200px" />
      </Card>
    </Box>
  );
}

export { ProfilePicture };

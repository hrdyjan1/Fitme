import React from 'react';
import {
  Typography,
  Box,
  Fab,
  Card,
  Button,
} from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { gql, useMutation } from '@apollo/client';

import { SEVERITY, useNotification } from 'src/contexts/notification';

const UPLOAD_PROFILE_IMAGE = gql`
  mutation UploadProfileImage($file: String!) {
    uploadProfileImage(file: $file)
  }
`;

function UploadImagePage() {
  const { showMessage } = useNotification();
  const [imageSource, setImageSource] = React.useState();
  const [uploadFile, { loading }] = useMutation(UPLOAD_PROFILE_IMAGE);

  const change = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImageSource(reader.result);
  };

  const upload = () => {
    try {
      uploadFile({ variables: { file: imageSource } }).then(
        () => showMessage('Uspesne nahrani fotografie'),
        () => showMessage('Zvolte prosim jiny soubor', SEVERITY.WARNING),
      );
    } catch (error) {
      showMessage(String(error.message), SEVERITY.ERROR);
    }
  };

  return (
    <div>
      <Box
        marginTop="20px"
        width="100%"
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        alignItems="center"
      >
        <Typography variant="h6">Zmena obrazku</Typography>
        <label htmlFor="contained-button-file">
          <input
            hidden
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={change}
          />
          <Fab component="span">
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
        {imageSource && (
          <Card marginTop="50px" flexDirection="column" width="200px">
            <Box
              marginTop="20px"
              width="200px"
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              alignItems="center"
            >
              <Box marginY="20px">
                <img
                  width="100px"
                  height="100px"
                  src={imageSource}
                  alt="Profile"
                />
              </Box>
              <Box width="80%" marginY="20px">
                <Button
                  onClick={upload}
                  size="large"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Odeslat
                </Button>
              </Box>
            </Box>
          </Card>
        )}
      </Box>
    </div>
  );
}

export { UploadImagePage };

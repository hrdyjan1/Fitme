import React from 'react';
import { Box, Fab, Card, Button } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { CardForm } from 'src/components/organisms/CardForm';

function ImageForm({ onSave, loading }) {
  const [imageSource, setImageSource] = React.useState();

  const change = (e) => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setImageSource(reader.result);
    } catch (e) {}
  };

  return (
    <CardForm header="ZMĚNA PROFILOVKY">
      <Box
        marginTop="20px"
        width="100%"
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        alignItems="center"
      >
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
          <span />
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
                  onClick={() => onSave(imageSource)}
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
    </CardForm>
  );
}

export { ImageForm };

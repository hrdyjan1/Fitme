import React from 'react';
import {
  Box, Card, CardMedia,
} from '@material-ui/core';
import { InputImageButton, ProfileImageButton } from 'src/components/atoms'

function ProfilePicture({ imageURL, loading, onSave }) {
  const [imageSource, setImageSource] = React.useState();
  const [isLoaded, setIsLoaded] = React.useState(false);

  const onload = (image) => {
    setImageSource(image);
    setIsLoaded(true);
  };

  const onSaveClick = () => {
    onSave(imageSource);
    setIsLoaded(false);
  };

  return (
    <Box width="300px" justifyText="center">
      <Card>
        <CardMedia
          component="img"
          image={imageSource || imageURL}
          height="350px"
          width="200px"
        />
      </Card>
      { !isLoaded && (
      <InputImageButton
        text="Změnit profilovou fotku"
        onLoad={onload}
        loading={loading}
      />
      )}
      { isLoaded && (
      <ProfileImageButton
        text="Uložit"
        onClick={onSaveClick}
        loading={loading}
      />
      )}
    </Box>
  );
}

export { ProfilePicture };

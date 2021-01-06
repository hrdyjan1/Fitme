import React from 'react';
import {
  Box, Card, CardMedia,
} from '@material-ui/core';
import { InputFileButton, ImageButton } from 'src/components/atoms'

function ProfilePicture({ imageURL, loading, onSave }) {
  const [imageSource, setImageSource] = React.useState();
  const [isLoaded, setIsLoaded] = React.useState(false);

  const change = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImageSource(reader.result);
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
      <InputFileButton
        text="Změnit profilovou fotku"
        onChange={change}
        loading={loading}
      />
      )}
      { isLoaded && (
      <ImageButton
        text="Uložit"
        onClick={onSaveClick}
        loading={loading}
      />
      )}
    </Box>
  );
}

export { ProfilePicture };

import React from 'react';
import { Box, Card, CardMedia } from '@material-ui/core';
import { InputImageButton, ProfileImageButton } from 'src/components/atoms';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: '30px'
  }
}))

function ProfilePicture({ imageURL, loading, onSave }) {
  const classes = useStyles();
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
    <Box width="300px">
      <Card className={classes.button}>
        <CardMedia
          component="img"
          image={imageSource || imageURL}
          height="350px"
          width="200px"
        />
      </Card>
      {!isLoaded && (
        <InputImageButton
          text="Změnit profilovou fotku"
          onLoad={onload}
          loading={loading}
        />
      )}
      {isLoaded && (
        <ProfileImageButton
          text="Potvrdit"
          onClick={onSaveClick}
          loading={loading}
        />
      )}
    </Box>
  );
}

export { ProfilePicture };

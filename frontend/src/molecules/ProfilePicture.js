import React from 'react'
import {Box, Card, CardMedia, Button} from '@material-ui/core'

function ProfilePicture({ imageURL, loading,  onSave }) {
  const [imageSource, setImageSource] = React.useState();
  const [isLoaded, setIsLoaded] = React.useState(false);

  const change = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImageSource(reader.result);
    setIsLoaded(true)
  };

  const onSaveClick = () => {
    onSave(imageSource)
    setIsLoaded(false)
  }

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
      { !isLoaded && <Button
        component="label"
        color="primary"
        size="small"
        disabled={loading}
        >
          <input
            hidden
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={change}
          />
          Změnit profilovou fotku
      </Button>}
      { isLoaded && <Button
        color="primary"
        variant="contained"
        fullWidth
        size="small"
        onClick={onSaveClick}
        disabled={loading}
      >
        Uložit
      </Button>}

    </Box>
  );
}

export { ProfilePicture };

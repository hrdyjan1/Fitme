/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  GridList,
  GridListTile,
  Grid,
  Divider,
  Box,
} from '@material-ui/core';
import { FormTitle, InputImageButton } from 'src/components/atoms';
import { GalleryImage } from 'src/components/molecules';

const Gallery = ({
  name, images, reFetchData, onSave, onDelete,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  useEffect(() => {
    reFetchData();
  }, [reFetchData]);

  const onSaveImage = (image) => {
    onSave(image).then(() => {
      reFetchData();
    });
  };

  const onDeleteImage = (id) => {
    onDelete(id).then(() => {
      reFetchData();
    });
  };

  return (
    <div>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <FormTitle title="Přidání nebo odebrání fotografie" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <Box marginY={4}>
        <GridList cellHeight={isMd ? 260 : 160} cols={3} spacing={isMd ? 24 : 8}>
          {images.map((item) => (item?.imageURL && (
            <GridListTile key={item.toString()} cols={isMd ? 1 : 3}>
              <GalleryImage
                title={name}
                src={item?.imageURL}
                alt={name}
                onDelete={() => onDeleteImage(item.iid)}
              />
            </GridListTile>
          )))}
        </GridList>
      </Box>
      <Grid item container justify="center" xs={12}>
        <InputImageButton text="Přidat" onLoad={onSaveImage} />
      </Grid>
    </div>
  );
};

export { Gallery };

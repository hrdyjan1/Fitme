import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, GridList, GridListTile } from '@material-ui/core';
import { Image } from 'src/components/atoms/image';
import { SectionHeader } from 'src/components/molecules';

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
  },
}));

const GallerySportPlace = (props) => {
  const { data, className } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)}>
      <SectionHeader
        title="Zkontrolujte naší galerii"
        subtitle="Zde jsou vidět fotografie sportoviště, sportovců, ..."
        data-aos="fade-up"
      />
      <GridList cellHeight={isMd ? 360 : 260} cols={4} spacing={isMd ? 24 : 8}>
        {data.map((item) => (
          <GridListTile key={item.key} cols={isMd ? item.cols : 4 || 1}>
            <Image
              src={item.imageURL}
              alt={item.location}
              className={classes.image}
              lazyProps={{
                width: '100%',
                height: '100%',
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export { GallerySportPlace };

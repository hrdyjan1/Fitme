import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'src/components/atoms/image';
import { SectionHeader } from 'src/components/molecules';
import Section from 'src/components/organisms/Section';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    minHeight: 400,
    maxHeight: 600,
    height: 'initial',
    objectFit: 'cover',
  },
  textWhite: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
  section: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const HeroDetail = (props) => {
  const {
    className, title, subtitle, src,
  } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Image
        src={src}
        alt="Name"
        className={classes.image}
        lazyProps={{
          width: '100%',
          height: '100%',
        }}
      />
      <Section className={classes.section}>
        <SectionHeader
          title={title}
          subtitle={subtitle}
          align="left"
          data-aos="fade-up"
          disableGutter
          titleProps={{
            className: clsx(classes.title, classes.textWhite),
            variant: 'h3',
          }}
          subtitleProps={{
            className: classes.textWhite,
          }}
        />
      </Section>
    </div>
  );
};

export { HeroDetail };

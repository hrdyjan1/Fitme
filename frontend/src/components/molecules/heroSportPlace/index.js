import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'src/components/atoms/image';
import { SectionHeader } from 'src/components/molecules';
import Section from 'src/components/organisms/Section';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    minHeight: 400,
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
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

const HeroSportPlace = (props) => {
  const { className, name, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Image
        src="https://lh3.googleusercontent.com/proxy/283rGJBF39JzbzpzomOs9gMzqX6GR3nX5qUVFU9fdfkk4mRxshTod8wUlphDUQ4ypGs6yTOfuyAgsg8HOWoQffoPMo2BRkiqXAMQ5ELT3jZPdNK93Mo"
        alt="Name"
        className={classes.image}
        lazyProps={{
          width: '100%',
          height: '100%',
        }}
      />
      <Section className={classes.section}>
        <SectionHeader
          title={name}
          subtitle={`Zde je seznam informací ke sportovnímu místu ${name}`}
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

export { HeroSportPlace };

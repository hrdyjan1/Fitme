import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

const useStyles = makeStyles(() => ({
  root: {},
  extraSmall: {
    fontSize: 10,
  },
  small: {
    fontSize: 20,
  },
  medium: {
    fontSize: 30,
  },
  large: {
    fontSize: 40,
  },
}));

/**
 * Component to display the icon
 *
 * @param {Object} props
 */
const Icon = (props) => {
  const { fontIconClass, size, fontIconColor, className, ...rest } = props;

  const classes = useStyles();

  return (
    <NoSsr>
      <i
        className={clsx(
          'icon',
          classes.root,
          fontIconClass,
          classes[size],
          className
        )}
        style={{ color: fontIconColor }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </NoSsr>
  );
};

export { Icon };

import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import {
  match,
  compose,
  stringAfterEqual,
} from 'src/constants/functions/basic';
import Section from 'src/components/organisms/Section';
import { useNotification } from 'src/contexts/notification';
import { route } from 'src/constants/routes';

const VERIFY = gql`
  mutation verify($token: String!) {
    verify(token: $token)
  }
`;

const useStyles = makeStyles((theme) => ({
  pagePaddingTop: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
    paddingBottom: theme.spacing(1),
  },
}));

const pickUpVerToken = compose(
  stringAfterEqual,
  match(/\/verificationToken=(.+)/)
);

const TEXT = {
  success: 'Váš účet pro aplikaci Fit.me byl úspěšně ověřen.',
  fail: 'Uživatel již ověřen nebo vaše adresa již není platná.',
};

function Verification({ token }) {
  const classes = useStyles();
  const history = useHistory();
  const { showMessage, showErrorMessage } = useNotification();
  const [verify] = useMutation(VERIFY);

  const goHome = useCallback(() => history.push(route.home()), [history]);

  React.useEffect(() => {
    verify({ variables: { token } })
      .then((r) => {
        if (r.data?.verify) {
          showMessage(TEXT.success);
          goHome();
        }
        showErrorMessage(TEXT.fail);
        goHome();
      })
      .catch(compose(goHome, showErrorMessage));
  }, [token, verify, goHome, showMessage, showErrorMessage]);

  return (
    <Section className={classes.pagePaddingTop}>
      <Typography variant="h4" align="center">
        Probíhá proces ověřování...
      </Typography>
    </Section>
  );
}

export { Verification, pickUpVerToken };

import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

import { config } from 'src/config';
import { route } from 'src/constants/routes';
import { useAuth } from 'src/utils/auth/index';

const UNAUTHENTICATED_CODE = 'UNAUTHENTICATED';

const hasUnauthenticatedErrorCode = (errors) => errors
  && errors.some((error) => error.extensions.code === UNAUTHENTICATED_CODE);

const hasNetworkStatusCode = (error, code) => error && error.statusCode === code;

const httpLink = createHttpLink({
  uri: config.GRAPHQL_API,
});

const uploadLink = createUploadLink({
  uri: config.GRAPHQL_API,
});

export function EnhancedAppoloProvider({ children }) {
  const history = useHistory();
  const { token, signout } = useAuth();

  const handleSignout = useCallback(() => {
    signout();
    history.push(route.signIn());
    window.location.reload();
  }, [signout, history]);

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return forward(operation);
  });

  const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if (
      hasUnauthenticatedErrorCode(graphQLErrors)
      || hasNetworkStatusCode(networkError, 401)
    ) {
      handleSignout();
    }
  });

  const client = new ApolloClient({
    link: from([logoutLink, authLink, httpLink, uploadLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

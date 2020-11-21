import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from 'src/utils/ScrollToTop';
import { EnhancedAppoloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';
import { AuthProvider } from 'src/utils/auth/index';
import { UserProvider } from 'src/contexts/user/index';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from 'src/constants/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <EnhancedAppoloProvider>
            <ScrollToTop />
            <CssBaseline />
            <UserProvider>
              <Routes />
            </UserProvider>
          </EnhancedAppoloProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from 'src/Routes';
import { theme } from 'src/constants/theme';
import { AuthProvider } from 'src/utils/auth/index';
import { ScrollToTop } from 'src/utils/ScrollToTop';
import { UserProvider } from 'src/contexts/user/index';
import { NotificationProvider } from 'src/contexts/notification';
import { EnhancedAppoloProvider } from 'src/utils/apollo';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <EnhancedAppoloProvider>
            <ScrollToTop />
            <CssBaseline />
            <NotificationProvider>
              <UserProvider>
                <Routes />
              </UserProvider>
            </NotificationProvider>
          </EnhancedAppoloProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

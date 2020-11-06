import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from 'src/utils/ScrollToTop';
import { EnhancedAppoloProvider } from 'src/utils/apollo';
import { Routes } from './Routes';
import { AuthProvider } from './utils/auth';
import { UserProvider } from './contexts/user';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EnhancedAppoloProvider>
          <ScrollToTop />
          <UserProvider>
            <Routes />
          </UserProvider>
        </EnhancedAppoloProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

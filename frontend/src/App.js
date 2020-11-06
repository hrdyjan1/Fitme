import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from 'src/utils/ScrollToTop';
import { EnhancedAppoloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';
import { AuthProvider } from 'src/utils/auth/index';
import { UserProvider } from 'src/contexts/user/index';

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

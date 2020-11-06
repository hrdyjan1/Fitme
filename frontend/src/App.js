import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from 'src/utils/ScrollToTop';
import { AuthProvider } from 'src/utils/auth';
import { EnhancedAppoloProvider } from 'src/utils/apollo';
import { Routes } from './Routes';
import { User } from './contexts/user';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <User>
          <EnhancedAppoloProvider>
            <ScrollToTop />
            <Routes />
          </EnhancedAppoloProvider>
        </User>
      </AuthProvider>
    </BrowserRouter>
  );
}

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from 'src/utils/ScrollToTop';
import { EnhancedAppoloProvider } from 'src/utils/apollo';
import { Routes } from './Routes';
import { AuthProvider } from './utils/auth';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EnhancedAppoloProvider>
          <ScrollToTop />
          <Routes />
        </EnhancedAppoloProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

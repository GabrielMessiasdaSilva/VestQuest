// App.tsx
import AppRoutes from './src/navigation';
import './src/i18n';
import React from 'react';
import { UserProvider } from "./src/services/userContext";

export default function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}
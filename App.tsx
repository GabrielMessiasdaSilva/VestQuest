// App.tsx
import AppRoutes from './src/navigation';
import './src/i18n';
import React from 'react';
import { UserProvider } from "./src/services/userContext";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <UserProvider>
      <FlashMessage position="center" />

      <AppRoutes />

    </UserProvider>
  );
}
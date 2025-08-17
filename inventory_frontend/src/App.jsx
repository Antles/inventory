import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import InventoryDashboard from './components/InventoryDashboard';

// --- Main App Component ---
// This component acts as a router, deciding whether to show the
// login page or the main inventory dashboard based on the login state.
export default function App() {
  // In a real app, you'd check for a stored auth token here instead of defaulting to false.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If the user is not logged in, show the authentication form.
  if (!isLoggedIn) {
    return <AuthForm setIsLoggedIn={setIsLoggedIn} />;
  }

  // If the user is logged in, show the main application dashboard.
  return <InventoryDashboard setIsLoggedIn={setIsLoggedIn} />;
}

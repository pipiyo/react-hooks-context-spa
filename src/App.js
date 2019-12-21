import React from 'react';
import './App.css';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import { UserConsumer } from './context/UserContext';
import { objectIsEmpty } from './utils';

function App() {
  return (
    <UserConsumer>
      {({ user }) => objectIsEmpty(user) ? <LoginPage /> : <DashboardPage /> }
    </UserConsumer>
  );
}

export default App;

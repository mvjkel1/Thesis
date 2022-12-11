import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import './styling/App.css';
import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  Toolbar
} from '@mui/material';
import UserView from './views/UserView/UserView';
import SplashView from './views/SplashView/SplashView';
import Chat from './views/UserView/components/Chat/Chat';
import WelcomeScreen from './views/UserView/components/WelcomeScreen/WelcomeScreen';
import { useSelector } from 'react-redux';
import SignForm from './views/SplashView/components/SignForm/SignForm';
import RecoveryForm from './views/SplashView/components/RecoveryForm/RecoveryForm';
import GroupManager from './views/UserView/components/GroupManager/GroupManager';
import { getDesignTokens } from './styling/theme';
import { GroupAdmin } from './views/UserView/components/GroupAdmin/GroupAdmin';
import { Profile } from './views/UserView/components/Profile/Profile';
import { ClassDetails } from './views/UserView/components/ClassDetails/ClassDetails';

function RequireAuth({ children, redirectTo }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to={redirectTo} />;
}

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth redirectTo="/auth">
                <UserView />
              </RequireAuth>
            }
          >
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="chat" element={<Chat />} />
            <Route path="manage-groups" element={<GroupManager />} />
            <Route path="group-admin/:id" element={<GroupAdmin />} />
            <Route path="/class/:id" element={<ClassDetails />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/auth" element={<SplashView />}>
            <Route path="/auth" element={<SignForm />} />
            <Route path="/auth/recovery/" element={<RecoveryForm />} />
            <Route path="/auth/recovery/:token" element={<RecoveryForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;

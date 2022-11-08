import React, { useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import styled from "@emotion/styled";
import "./styling/App.css";
import { Box, Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import UserView from "./views/UserView/UserView";
import SplashView from "./views/SplashView/SplashView";
import Chat from "./views/UserView/components/Chat/Chat";
import WelcomeScreen from "./views/UserView/components/WelcomeScreen/WelcomeScreen";
import { useSelector } from "react-redux";
import SignForm from "./views/SplashView/components/SignForm/SignForm";
import RecoveryForm from "./views/SplashView/components/RecoveryForm/RecoveryForm";
import GroupCreator from "./views/UserView/components/GroupCreator/GroupCreator";

const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

function RequireAuth({ children, redirectTo }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to={redirectTo} />;
}

function App() {
  return (
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
          <Route path="new-group" element={<GroupCreator />} />
        </Route>
        <Route path="/auth" element={<SplashView />}>
          <Route path="/auth" element={<SignForm />} />
          <Route path="/auth/recovery/" element={<RecoveryForm />} />
          <Route path="/auth/recovery/:token" element={<RecoveryForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

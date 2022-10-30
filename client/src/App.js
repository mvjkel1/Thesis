import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import "./styling/App.css";
import {Box, Button, Container, Grid, Stack, Toolbar} from "@mui/material"
import ResponsiveAppBar from "./views/UserView/Appbar";
import Sidebar from "./views/UserView/Sidebar";
import Main from "./views/UserView/Main";
import { Rightbar } from "./views/UserView/Rightbar";
import { theme } from "./styling/theme";
import UserView from "./views/UserView/UserView";
import SplashView from "./views/SplashView/SplashView";
import Chat from "./views/UserView/Chat";
import MyCalendar from "./views/UserView/Calendar";
import { useSelector } from "react-redux";
import SignForm from "./views/SplashView/SignForm";
import RecoveryForm from "./views/SplashView/RecoveryForm";

const BlueButton = styled(Button)(({theme}) => ({
  backgroundColor: theme.palette.primary.main
}))

function RequireAuth({ children, redirectTo }) {
  const user = useSelector(state => state.auth.user);
  return user ? children : <Navigate to={redirectTo} />;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth redirectTo="/auth"><UserView/></RequireAuth>}>
          <Route path="/" element={<MyCalendar/>}/>
          <Route path="chat" element={<Chat/>}/>
        </Route>
        <Route path="/auth" element={<SplashView/>}>
          <Route path="/auth" element={<SignForm/>}/>
          <Route path='/auth/recovery' element={<RecoveryForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

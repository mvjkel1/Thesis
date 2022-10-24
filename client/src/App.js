import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import "./App.css";
import {Box, Button, Container, Grid, Stack, Toolbar} from "@mui/material"
import ResponsiveAppBar from "./components/UserView/Appbar";
import Sidebar from "./components/UserView/Sidebar";
import Main from "./components/UserView/Main";
import { Rightbar } from "./components/UserView/Rightbar";
import { theme } from "./theme";
import UserView from "./components/UserView/UserView";
import SignIn from "./components/SplashView/SplashView";
import Chat from "./components/UserView/Chat";
import MyCalendar from "./components/UserView/Calendar";
import { useSelector } from "react-redux";

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
        <Route path="/" element={<RequireAuth redirectTo="/login"><UserView/></RequireAuth>}>
          <Route path="/" element={<MyCalendar/>}/>
          <Route path="chat" element={<Chat/>}/>
        </Route>
        <Route path="/login" element={<SignIn/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

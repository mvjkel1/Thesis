import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './styling/App.css';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material';
import UserView from './views/UserView/UserView';
import SplashView from './views/SplashView/SplashView';
import WelcomeScreen from './views/UserView/components/WelcomeScreen/WelcomeScreen';
import { useSelector } from 'react-redux';
import SignForm from './views/SplashView/components/SignForm/SignForm';
import RecoveryForm from './views/SplashView/components/RecoveryForm/RecoveryForm';
import GroupManager from './views/UserView/components/GroupManager/GroupManager';
import { getDesignTokens } from './styling/theme';
import { GroupAdmin } from './views/UserView/components/GroupAdmin/GroupAdmin';
import { Profile } from './views/UserView/components/Profile/Profile';
import { ClassDetails } from './views/UserView/components/ClassDetails/ClassDetails';
import InvitationForm from './views/SplashView/components/InvitationDialog/InvitationDialog';
import ChatBox from './views/UserView/components/components/ChatBox/ChatBox';
import {StatusSnackbar, MessageSnackbar} from './views/UserView/Snackbar/Snackbar'
import { GroupFiles } from './views/UserView/components/GroupFiles/GroupFiles';
import Chat from './views/UserView/components/Chat/Chat';
import { Moodboard } from './views/UserView/components/Moodboard/Moodboard';

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
                <UserView/>
              </RequireAuth>
            }
          >
            <Route path="/" element={<WelcomeScreen/>}/>
            <Route path="chat/:conversationId" element={<ChatBox/>} />
            <Route path="chat" element={<Chat/>} />
            <Route path="moodboard" element={<Moodboard/>} />
            <Route path="manage-groups" element={<GroupManager/>} />
            <Route path="group-admin/:id" element={<GroupAdmin/>} />
            <Route path="/class/:id" element={<ClassDetails/>} />
            <Route path="/group-files" element={<GroupFiles/>} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route path="/auth" element={<SplashView/>}>
            <Route path="/auth" element={<SignForm/>} />
            <Route path="/auth/recovery/" element={<RecoveryForm/>} />
            <Route path="/auth/recovery/:token" element={<RecoveryForm/>} />
          </Route>
          <Route path="/invite" element={<SplashView />}>
            <Route path="/invite/:invitationToken" element={<InvitationForm/>}>
              <Route path="/invite/:invitationToken" element={<SignForm/>} />
            </Route>
          </Route>
        </Routes>
        <StatusSnackbar/>
        <MessageSnackbar/>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;

import React from 'react';
import './styling/App.css';
import { useSelector } from 'react-redux';
import { getDesignTokens } from './styling/theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { ViewLoader } from './styling/loader';
import { StatusSnackbar, MessageSnackbar } from './views/UserView/Snackbar/Snackbar';
import UserView from './views/UserView/UserView';
import SplashView from './views/SplashView/SplashView';
import SignForm from './components/SignForm/SignForm';
import RecoveryForm from './components/RecoveryForm/RecoveryForm';
import InvitationForm from './components/InvitationDialog/InvitationDialog';
const ChatBox = React.lazy(() => import('./components/subcomponents/ChatBox/ChatBox'));
const Chat = React.lazy(() => import('./components/Chat/Chat'));
const Moodboard = React.lazy(() => import('./components/Moodboard/Moodboard'));
const WelcomeScreen = React.lazy(() => import('./components/WelcomeScreen/WelcomeScreen'));
const GroupManager = React.lazy(() => import('./components/GroupManager/GroupManager'));
const GroupAdmin = React.lazy(() => import('./components/GroupAdmin/GroupAdmin'));
const ClassDetails = React.lazy(() => import('./components/ClassDetails/ClassDetails'));
const GroupFiles = React.lazy(() => import('./components/GroupFiles/GroupFiles'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));

function RequireAuth({ children, redirectTo }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to={redirectTo} />;
}

function SuspenseWrapper({ component }) {
  return <React.Suspense fallback={<ViewLoader />}>{component}</React.Suspense>;
}

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<SplashView />}>
            <Route path="/auth" element={<SignForm />} />
            <Route path="/auth/recovery/" element={<RecoveryForm />} />
            <Route path="/auth/recovery/:token" element={<RecoveryForm />} />
          </Route>
          <Route path="/invite" element={<SplashView />}>
            <Route path="/invite/:invitationToken" element={<InvitationForm />}>
              <Route path="/invite/:invitationToken" element={<SignForm />} />
            </Route>
          </Route>
          <Route
            path="/"
            element={
              <RequireAuth redirectTo="/auth">
                <UserView />
              </RequireAuth>
            }
          >
            <Route path="/" element={<SuspenseWrapper component={<WelcomeScreen />} />} />
            <Route path="chat/:conversationId" element={<SuspenseWrapper component={<ChatBox />} />}/>
            <Route path="chat" element={<SuspenseWrapper component={<Chat />} />} />
            <Route path="moodboard" element={<SuspenseWrapper component={<Moodboard />} />} />
            <Route path="manage-groups" element={<SuspenseWrapper component={<GroupManager />} />}/>
            <Route path="group-admin/:id" element={<SuspenseWrapper component={<GroupAdmin />} />}/>
            <Route path="/class/:id" element={<SuspenseWrapper component={<ClassDetails />} />} />
            <Route path="/group-files" element={<SuspenseWrapper component={<GroupFiles />} />} />
            <Route path="/profile/:id" element={<SuspenseWrapper component={<Profile />} />} />
            <Route path="/profile" element={<SuspenseWrapper component={<Profile />} />} />
          </Route>
        </Routes>
        <StatusSnackbar />
        <MessageSnackbar />
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;

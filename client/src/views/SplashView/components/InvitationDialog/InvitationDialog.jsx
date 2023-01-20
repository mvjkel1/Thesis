import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { SubmitButton } from './InvitationDialog.styles';
import { useEffect } from 'react';
import { joinGroup } from '../../../../redux/actions/workgroups';

const FADE_INTERVAL_MS = 1750;
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 2;
const WORDS_TO_ANIMATE = [
  'Hello',
  'Ciao',
  'Jambo',
  'Bonjour',
  'Salut',
  'Hola',
  'Nǐ hǎo',
  'Hallo',
  'Cześć',
  '👋🏻'
];

const AnimatedText = () => {
  const [fadeProp, setFadeProp] = useState({ fade: 'fade-in' });
  const [wordOrder, setWordOrder] = useState(0);

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fadeProp.fade === 'fade-in'
        ? setFadeProp({ fade: 'fade-out' })
        : setFadeProp({ fade: 'fade-in' });
    }, FADE_INTERVAL_MS);

    return () => clearInterval(fadeTimeout);
  }, [fadeProp]);

  useEffect(() => {
    const wordTimeout = setInterval(() => {
      setWordOrder((prevWordOrder) => (prevWordOrder + 1) % WORDS_TO_ANIMATE.length);
    }, WORD_CHANGE_INTERVAL_MS);

    return () => clearInterval(wordTimeout);
  }, []);

  return (
    <h2>
      <Typography
        textAlign="center"
        sx={{ fontSize: 28, fontWeight: 500 }}
        className={fadeProp.fade}
      >
        {WORDS_TO_ANIMATE[wordOrder]}
      </Typography>
    </h2>
  );
};

export default function InvitationForm() {
  const { invitationToken } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [authenticate, setAuthenticate] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onActionClick = () => {
    if (user) {
      dispatch(joinGroup(invitationToken, user.token)).then(() => navigate('/'));
    } else setAuthenticate(true);
  };

  const ActionButton = ({ user, ...props }) => {
    if (user)
      return (
        <SubmitButton fullWidth variant="contained" onClick={onActionClick}>
          Go to home
        </SubmitButton>
      );
    else
      return (
        <SubmitButton fullWidth variant="contained" onClick={onActionClick}>
          Authenticate me
        </SubmitButton>
      );
  };

  if (authenticate) return <Outlet context={[invitationToken]} />;
  else
    return (
      <Box sx={{ padding: 2 }}>
        <Box>
          <AnimatedText />
          <Typography component="h1" variant="h5" textAlign="center">
            You are invited you to join a group!
          </Typography>
        </Box>
        <Box>
          <ActionButton user={user} />
          <Grid container justifyContent="center">
            <Grid item>
              <Link variant="body2">{'Our terms of service (TOS)'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
}

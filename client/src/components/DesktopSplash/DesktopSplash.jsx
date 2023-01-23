import { Typography } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import anime from 'animejs';
import { useEffect } from 'react';

const DesktopSplash = () => {
  const { t } = useTranslation();
  const path = useRef(null);
  const animation = useRef(null);

  useEffect(() => {
    path.current = anime.path('.pathtest');
    animation.current = anime({
      targets: '.paperplane',
      translateX: path.current('x'),
      translateY: path.current('y'),
      rotate: path.current('angle'),
      duration: 5000,
      loop: true,
      easing: 'easeInOutSine',
      direction: 'reverse'
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Box sx={{ position: 'absolute' }}>
          <svg
            width="700"
            height="183"
            viewBox="0 0 523 183"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              visibility="hidden"
              className="pathtest"
              d="M146.635 5.31072C23.5342 24.5248 9.71359 32.7552 2.2824 69.3578C-5.14879 105.96 16.0683 150.763 163.616 167.224C311.163 183.685 468.19 195.566 504.269 150.763C540.349 105.96 512.777 69.3578 496.838 52.8672C480.899 36.3765 269.736 -13.9034 146.635 5.31072Z"
              stroke="black"
            />
          </svg>
          <Box className="paperplane">
            <img style={{ width: 40, height: 40 }} src="/assets/paper-plane.png" />
          </Box>
        </Box>
        <Typography fontSize="2.5rem" fontWeight="500">
          {t('description.header')}
        </Typography>
        <Typography sx={{ alignSelf: 'start' }} mt={-1} fontSize="1.5rem" fontWeight="500">
          {t('description.subheader')}
        </Typography>
      </Box>
    </>
  );
};

export default DesktopSplash;

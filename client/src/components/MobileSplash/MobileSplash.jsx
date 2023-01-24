import anime from 'animejs';
import { Box, Typography } from '@mui/material';
import { useRef } from 'react';
import { useEffect } from 'react';
import { SubmitButton } from './MobileSplash.styles';
import { useTranslation } from 'react-i18next';


const MobileSplash = () => {
  const animation = useRef({});
  const path = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    animation.current.logo = anime({
      targets: '.logo-container',
      translateY: 70
    });
    animation.current.header = anime({
      targets: '.description-container > #header-main, #header-secondary, #header-button',
      translateX: 25
    });
    path.current = anime.path('.path-mountain');
    animation.current.paperplane = anime({
      targets: '.paper-plane',
      translateX: path.current('x'),
      translateY: path.current('y'),
      rotate: path.current('angle'),
      duration: 7500,
      loop: true,
      direction: 'reverse',
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <Box className="mobile-splash-container">
      <Box
        className="logo-container"
        sx={{
          display: 'flex',
          position: 'relative',
          bottom: 60,
          alignItems: 'center',
          gap: 1,
          paddingLeft: 1
        }}
      >
        <img src="/assets/logo.svg" width="54" height="54" />
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>StudentShare</Typography>
      </Box>
      <Box className="description-container" sx={{ marginTop: 'auto', position: 'relative', width: "80vw" }}>
        <Typography
          mt={12}
          id="header-main"
          sx={{ fontSize: '10.2vw', fontWeight: 500, WebkitFontSmoothing: 'auto', width: '50vw' }}
        >
          {t('MobileSplash.hello')}
        </Typography>
        <Typography id="header-secondary" sx={{ fontSize: '5.2vw', fontWeight: 500 }}>
          {t('MobileSplash.desc')}
        </Typography>
        <SubmitButton
          disableElevation
          sx={{ width: '40vw', height: '50px' }}
          id="header-button"
          onClick={() => {
            const element = document.getElementById('auth');
            element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
          }}
          variant="contained"
        >
          {t('MobileSplash.submit')}
        </SubmitButton>
      </Box>
      <Box className="paper-plane" sx={{ position: 'absolute', bottom: '65vw' }}>
        <img src="/assets/paper-plane.png" style={{ maxWidth: '40px', zIndex: 2 }} />
      </Box>
      <Box className="image" sx={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
        <img
          src="/assets/mountain-1.svg"
          style={{ width: '100%', position: 'relative', zIndex: 1 }}
        />
        <img
          src="/assets/mountain-2.svg"
          style={{ width: '100%', position: 'absolute', bottom: 0, zIndex: 3 }}
        />
        <img
          src="/assets/mountain-3.svg"
          style={{ width: '100%', position: 'absolute', bottom: 0, zIndex: 4 }}
        />
        <img
          src="/assets/mountain-4.svg"
          style={{ width: '100%', position: 'absolute', bottom: 0, zIndex: 5 }}
        />
        <svg
          style={{ width: '100%', position: 'absolute', bottom: 5 }}
          viewBox="0 0 2127 1091"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="path-mountain"
            d="M1 1090C1 1090 17 1025 62 978.5C107 932 186.5 649.5 268.5 647.5C350.5 645.5 351 783.5 456 839C561 894.5 562 890.5 641 855.5C720 820.5 814.5 344 991.5 344C1168.5 344 1302 846 1385.5 902C1469 958 1486.5 974.5 1580 902C1673.5 829.5 1891 87.0005 1982 40.0005C2073 -6.99953 2126.5 2.00048 2126.5 2.00048"
          />
        </svg>
      </Box>
    </Box>
  );
};
export default MobileSplash;


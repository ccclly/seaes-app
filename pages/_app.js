import '@/styles/globals.css';
import {useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
};

import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import {
  Box,
  CssBaseline,
  Toolbar, useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LeftBar from '@/components/LeftBar';
import { useRouter } from 'next/router';

export default function App ({ Component, pageProps }) {
  const router = useRouter();
  const theme = createTheme(themeOptions);
  const isHome = (router.pathname === '/');
  const [open, setOpen] = useState(false);

  return (<ThemeProvider theme={theme}>
    <CssBaseline/>
    <TopBar url={router.pathname}/>
    {isHome && <LeftBar setOpen={setOpen} open={open}/>}
    <Box
      sx={{
        width: { lg: isHome && `calc(100% - 460px)` },
        position: 'relative',
        left: { md: 0, lg: isHome && (open ? '100%' : 460) },
        transition: (isHome) && theme.transitions.create('left', {
          easing: theme.transitions.easing.sharp,
          // duration: theme.transitions.duration.enteringScreen,
          duration: 375
        }),
      }}
    >
      <Toolbar/>
      <Component {...pageProps} />
    </Box>
    <Navbar/>
  </ThemeProvider>);
}

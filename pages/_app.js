import '@/styles/globals.css';

import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import { Box, CssBaseline, Drawer, TextField, Toolbar } from '@mui/material';


export default function App ({ Component, pageProps }) {
  return (<>
    <CssBaseline />
    <TopBar/>
    <Drawer
      variant="permanent"
      sx={{
        width: 460,
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width:460 },
      }}
      open
    >
      <Toolbar/>
      <TextField id="outlined-basic" label="input something" variant="outlined" />
    </Drawer>
    <Box
      sx={{
        width: { sm: `calc(100% - 460px)` },
        position: 'relative',
        left: 460
      }}
    >
      <Toolbar/>
      <Component {...pageProps} />
    </Box>
    <Navbar/>
  </>);
}

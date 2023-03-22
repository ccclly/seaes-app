import {useState} from 'react';
import {
  Drawer,
  InputAdornment,
  TextField,
  Toolbar,
  useTheme,
  styled, Box, Button, Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyIcon from '@mui/icons-material/Key';


const drawerWidth = 460;

const openedMixin = (theme) => {
  return ({
    width: `calc(100% - 60px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      // duration: theme.transitions.duration.enteringScreen,
      duration: 375
    }),
    overflowX: 'hidden',
  });
};

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    // duration: theme.transitions.duration.leavingScreen,
    duration: 375
  }),
  overflowX: 'hidden',
  width: drawerWidth,
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
});

const MyDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => {
    return({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    });
  }
);

export default function ({setOpen, open}) {
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onChange = e => {
    if (e.target.value === '') {
      handleDrawerClose();
    } else {
      handleDrawerOpen()
    }
  }

  return (<>
    <MyDrawer
      variant="permanent"
      sx={{
        display: { xs: 'none', lg: 'block', xl: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box' },
      }}
      open={open}
    >
      <Toolbar sx={{mb: 20}}/>
      <TextField id="outlined-basic" label="输入想了解的内容" variant="outlined"
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <SearchIcon />
                     </InputAdornment>
                   ),
                 }}
                 onChange={onChange}
                 sx={{
                   mt: 10,
                   height: 58,
                   width: open ? 580 : 390,
                   margin: '0 auto',
                   transition: theme.transitions.create('width', {
                     easing: theme.transitions.easing.sharp,
                     // duration: theme.transitions.duration.enteringScreen,
                     duration: 375
                   }),
                   '& label.Mui-focused': {
                     color: '#9c27b0',
                   },
                   // '& .MuiInput-underline:after': {
                   //   borderBottomColor: 'green',
                   // },
                   '& .MuiOutlinedInput-root': {
                     '&.Mui-focused fieldset': {
                       borderColor: '#9c27b0',
                     },
                   },
                 }}
                 size={'medium'}
      />
      <Fade in={!open}>
        <Button color={'secondary'} size="large" variant="outlined"
                endIcon={<KeyIcon/>} sx={{
          position: 'absolute',
          bottom: 40,
          left: 35,
        }}>
          后台入口
        </Button>
      </Fade>
      {/*{!open&&*/}
      {open&&<Box sx={{
        position: 'absolute',
        right: -60,
        width: 60,
        height: '100vh',
        writingMode: 'vertical-lr'
      }}>close0000000000000000000</Box>}
    </MyDrawer>
  </>);
}

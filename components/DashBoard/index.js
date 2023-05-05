import * as React from 'react';
import {useState} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems } from './ListItems';
import menu from '@/constant/backendMenu';
import DashBoardPane from '@/components/DashBoard/DashBoardPane';
import UserManage from '@/components/DashBoard/UserManage';
import ExamRelease from '@/components/DashBoard/ExamRelease';
import QuestionBank from '@/components/DashBoard/QuestionBank';
import CourseManage from '@/components/DashBoard/CourseManage';
import NoticeManage from '@/components/DashBoard/NoticeManage';
import RepositoryManage from '@/components/DashBoard/RepositoryManage';
import EnterManage from '@/components/DashBoard/EnterManage';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        实验室安全教育与考试系统
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const [current, setCurrent] = useState(menu.DASHBOARD);
  const currentPane = () => {
    if (current === menu.DASHBOARD) return <DashBoardPane />
    else if (current === menu.USERMANAGE) return <UserManage/>
    else if (current === menu.EXAMRELEASE) return <ExamRelease/>
    else if (current === menu.QUESTIONBANKMANAGE) return <QuestionBank />
    else if (current === menu.COURSEMANAGE) return <CourseManage />
    else if (current === menu.NOTICEMANAGE) return <NoticeManage />
    else if (current === menu.REPOSITORY) return <RepositoryManage/>
    else if (current === menu.ENTERMANAGE) return <EnterManage/>
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              后台仪表盘
            </Typography>
            {/*<IconButton color="inherit">*/}
            {/*  <Badge badgeContent={4} color="secondary">*/}
            {/*    <NotificationsIcon />*/}
            {/*  </Badge>*/}
            {/*</IconButton>*/}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems setCurrent={setCurrent}/>
            {/*<Divider sx={{ my: 1 }} />*/}
            {/*{secondaryListItems}*/}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {currentPane()}
            {/*<Grid container spacing={3}>*/}
            {/*  /!* Chart *!/*/}
            {/*  <Grid item xs={12} md={8} lg={9}>*/}
            {/*    <Paper*/}
            {/*      sx={{*/}
            {/*        p: 2,*/}
            {/*        display: 'flex',*/}
            {/*        flexDirection: 'column',*/}
            {/*        height: 240,*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <Chart />*/}
            {/*    </Paper>*/}
            {/*  </Grid>*/}
            {/*  /!* Recent Deposits *!/*/}
            {/*  <Grid item xs={12} md={4} lg={3}>*/}
            {/*    <Paper*/}
            {/*      sx={{*/}
            {/*        p: 2,*/}
            {/*        display: 'flex',*/}
            {/*        flexDirection: 'column',*/}
            {/*        height: 240,*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <Deposits />*/}
            {/*    </Paper>*/}
            {/*  </Grid>*/}
            {/*  /!* Recent Orders *!/*/}
            {/*  <Grid item xs={12}>*/}
            {/*    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>*/}
            {/*      <Orders />*/}
            {/*    </Paper>*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

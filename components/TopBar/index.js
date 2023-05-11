import Link from 'next/link';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';

export default function ({ url }) {

  const pages = [
    { name: '主页', url: '/' },
    { name: '安全学习', url: '/learn' },
    { name: '考试自测', url: '/exam' },
    { name: '个人中心', url: '/mine' }];
  return (
    <AppBar position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            elevation={0}

    >
      <Toolbar>
        <Typography gutterBottom sx={{
          fontFamily: 'var(--myfont-font)',
          fontSize: 25
        }}>
          实验室安全教育与考试系统
        </Typography>

        <Box sx={{
          flexGrow: 1,
          display: { xs: 'none', md: 'flex' },
          width: { sm: `calc(100% - 660px)` },
        }}>
          {pages.map((page) => (<Link key={page.url} href={page.url}>
            <Button
              key={page.url}
              // color="secondary"
              // variant={(page.url === url) ? 'outlined' : 'text'}
              variant={'text'}
              sx={{
                my: 2, color: 'white', display: 'block', width: 100,
                ml: 1,
                fontFamily: 'var(--myfont-font)',
                fontSize: 15
              }}
              // sx={{
              //   width:100,
              //   ml: 1
              // }}
            >
              {page.name}
              {/*{page.name}*/}
            </Button></Link>
          ))}
        </Box>
        <Button>fjwei</Button>
      </Toolbar>
      <Divider/>
    </AppBar>
  );
}

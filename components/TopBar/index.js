import Link from 'next/link';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';

import styles from '@/styles/Topbar.module.css';

export default function () {
  const pages = [
    { name: '主页', url: '/' },
    { name: '安全学习', url: '/learn' },
    { name: '考试自测', url: '/exam' },
    { name: '个人中心', url: '/mine' }];
  return (
    <AppBar position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            elevation={0}
    >
      <Toolbar>
        <Typography gutterBottom>
          实验室安全教育与考试系统
        </Typography>

        <Box sx={{
          flexGrow: 1,
          display: { xs: 'none', md: 'flex' },
          width: { sm: `calc(100% - 660px)` },
        }}>
          {pages.map((page) => (
            <Button
              key={page.url}
              color="secondary"
              // sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link href={page.url}>{page.name}</Link>
              {/*{page.name}*/}
            </Button>
          ))}
        </Box>
        <Button>fjwei</Button>
      </Toolbar>
      <Divider/>
    </AppBar>
  );
}

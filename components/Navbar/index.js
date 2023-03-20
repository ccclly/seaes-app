// components/Navbar.jsx
import {useState} from 'react';
import { useRouter } from 'next/router';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import styles from '@/styles/Navbar.module.css';


export default function Navbar() {
  const router = useRouter();
  const [value, setValue] = useState(router.pathname);
  console.log('nav刷新')
  return (
    <Box className={styles.btmBar}
       sx={{
         display: { xs: 'block', sm: 'none' },
       }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          router.replace(newValue);
        }}
      >
        <BottomNavigationAction label="主页" value={'/'} icon={<HomeIcon />} />
        <BottomNavigationAction label="学习" value={'/learn'} icon={<AutoStoriesIcon />} />
        <BottomNavigationAction label="考试" value={'/exam'} icon={<BorderColorIcon />} />
        <BottomNavigationAction label="我的" value={'/mine'} icon={<AccountBoxIcon />} />
      </BottomNavigation>
    </Box>
  );
}

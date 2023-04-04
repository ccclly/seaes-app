import {
  Avatar,
  Box, Button, Checkbox,
  Container,
  CssBaseline, FormControlLabel, Grid,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { useEffect } from 'react';
import UserLogin from '@/components/Login/UserLogin';


export default () => {
  let isLogin = {}
  useEffect(() => {
    isLogin = JSON.parse(localStorage.getItem('loginInfo'))
  }, [])
  return(
    <>
      {
        !isLogin?
          <div>mine</div>
          :<UserLogin/>
      }
    </>
  )
};

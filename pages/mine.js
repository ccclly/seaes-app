import {
  Avatar,
  Box, Button, Checkbox,
  Container,
  CssBaseline, FormControlLabel, Grid, Paper,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import UserLogin from '@/components/Login/UserLogin';


export default () => {
  const [isLogin, setIsLogin] = useState(null);
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('loginInfo'))
    setIsLogin(info)
  }, [])
  return(
    <>
      {
        isLogin?
          <Paper sx={{
            padding: 4,
            m: 5
          }} elevation={2}
          >

          </Paper>
          :<UserLogin setIsLogin={setIsLogin}/>
      }
    </>
  )
};

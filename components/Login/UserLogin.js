import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  createAsyncLocalStorage
} from 'next/dist/client/components/async-local-storage';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container, Grid, Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import request1 from '@/Util/request1';
import * as React from 'react';
import { useState } from 'react';



function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        实验室安全教育与考试系统
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function UserLogin({setIsLogin, setStatus}) {

  const [open, setOpen] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    request1.post('/user/login',{
      name: data.get('name'),
      password: data.get('password')
    }).then(value => {
      if (!value.data.id) {
        setOpen(true);
      }else {
        localStorage.setItem('loginInfo', JSON.stringify(value.data));
        setIsLogin(value.data);
        setStatus(1);
      }
    }).catch(err => {
      console.log('fjwaeifiw');
    })
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          onClose={()=>setOpen(false)}
        >
          <Alert onClose={()=>setOpen(false)} severity="error" sx={{ width: '100%' }}>
            登录失败
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            用户登录
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="账号"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/*<FormControlLabel*/}
            {/*  control={<Checkbox value="remember" color="primary" />}*/}
            {/*  label="Remember me"*/}
            {/*/>*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登录
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘记密码?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  )
}

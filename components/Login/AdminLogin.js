// import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  useTheme, useMediaQuery, TextField, InputAdornment, IconButton, Box, Checkbox,
} from '@mui/material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

// hooks
// import useResponsive from '../hooks/useResponsive';
// components
// import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// sections
// import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // boxShadow: theme.,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (event) => {
    console.log('click')
  }

  return (
    <>

      <StyledRoot>
        {/*<Logo*/}
        {/*  sx={{*/}
        {/*    position: 'fixed',*/}
        {/*    top: { xs: 16, sm: 24, md: 40 },*/}
        {/*    left: { xs: 16, sm: 24, md: 40 },*/}
        {/*  }}*/}
        {/*/>*/}

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            {/*<img src="/assets/illustrations/illustration_login.png" alt="login" />*/}
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>


            <Box>
              <Stack spacing={3}>
                <TextField name="email" label="Email address" />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {/*<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />*/}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <Checkbox name="remember" label="Remember me" />
                <Link variant="subtitle2" underline="hover">
                  Forgot password?
                </Link>
              </Stack>

              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Login
              </LoadingButton>
            </Box>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

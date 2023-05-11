import AdminLogin from '@/components/Login/AdminLogin';
import Dashboard from '@/components/DashBoard';
import { useEffect, useState } from 'react';
import request from '@/Util/request';
import { CircularProgress } from '@mui/material';

export default function () {
  const [token, setToken] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const tokenValue = localStorage.getItem('token');
    if (tokenValue)
      request.get('/user/test').then(value => {
        setState(1)
        if (value.data.id)
          setToken(tokenValue)
      });
    else setState(1);
  }, []);

  return(
    <>
      {
        state==null?<CircularProgress sx={{
            position: 'fix',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 200
          }}/>:(
        token?
          <Dashboard/>
          :
          <AdminLogin setToken={setToken} />)
      }
    </>
  );
}

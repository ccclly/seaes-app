import AdminLogin from '@/components/Login/AdminLogin';
import Dashboard from '@/components/DashBoard';
import { useEffect, useState } from 'react';
import request from '@/Util/request';

export default function () {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenValue = localStorage.getItem('token');
    if (tokenValue)
      // request.get('/user/test').then(value => {
      //   console.log(value.data);
        setToken(tokenValue)
      // });
  }, []);

  return(
    <>
      {
        token?
          <Dashboard/>
          :
          <AdminLogin setToken={setToken} />
      }
    </>
  );
}

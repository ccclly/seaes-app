import AdminLogin from '@/components/Login/AdminLogin';
import { useEffect } from 'react';

export default function () {
  let isAdminLogin = {}
  useEffect(() => {
    isAdminLogin = JSON.parse(localStorage.getItem('adminLoginInfo'))
  }, [isAdminLogin])

  return(
    <>
      {
        isAdminLogin?
          <AdminLogin/>:
          <div>dashboard</div>
      }
    </>
  );
}

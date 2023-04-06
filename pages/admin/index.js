import AdminLogin from '@/components/Login/AdminLogin';
import Dashboard from '@/components/DashBoard';
import { useEffect, useState } from 'react';

export default function () {
  const [adminLogin, setAdminLogin] = useState(false);
  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem('adminToken'))
    setAdminLogin(adminInfo)
  }, [adminLogin])

  return(
    <>
      {
        !!adminLogin?
          <Dashboard/>
          :
          <AdminLogin setAdminLogin={setAdminLogin}/>
      }
    </>
  );
}

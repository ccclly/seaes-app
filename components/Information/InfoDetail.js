import { Breadcrumbs, Container, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import request from '@/Util/request';
import { useRouter } from 'next/router';

export default function ({type}) {

  const [state, setState] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!!id) {
      const url = '/notice/' + id;
      request.get(url).then(value => {
        setState(value.data);
      });
    }

  }, [id]);

  return (<Container>
    <Paper sx={{
      padding: 4,
      mt: 5,
      mb: 5
    }} elevation={4}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          主页
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href={type==='notice'?'/notices':'/rules'}
          aria-current="page"
        >
          {type==='notice'?'通知公告':'规章制度'}
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          aria-current="page"
          href={''}
        >
          {state.title}
        </Link>
      </Breadcrumbs>
      <Typography textAlign={'center'} mt={2}>
        {state.title}
      </Typography>
        <div dangerouslySetInnerHTML={{ __html: state.description }}/>
    </Paper>
  </Container>)
}

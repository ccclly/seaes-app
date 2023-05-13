import { Box, Breadcrumbs, Container, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import request from '@/Util/request';
import { useRouter } from 'next/router';

export default function ({type,title, description}) {


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
        <span
          color="text.primary"
          aria-current="page"
        >
          {title}
        </span>
      </Breadcrumbs>
      <Typography textAlign={'center'} mt={2} variant={'h5'} sx={{
        fontFamily: 'var(--myfont-font)',
      }}>
        {title}
      </Typography>
      <Box sx={{
        font: 'Arial, sans-serif'
      }}>
        <div dangerouslySetInnerHTML={{ __html: description }}/>
      </Box>
    </Paper>
  </Container>)
}

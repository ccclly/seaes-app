import {
  Box,
  Breadcrumbs,
  Container,
  List,
  ListItem,
  Paper, Typography,
} from '@mui/material';
import Link from 'next/link';

import InfoList from '@/components/Information/InfoList';
import defaultUrl from '@/constant/url';

export default function ({data}){
  return (<InfoList type={'notices'} data={data}/>)
}


export async function getServerSideProps(content) {
  console.log(content)
  // Fetch data from external API
  const res = await fetch(defaultUrl+`/notice/list`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

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

  return (<InfoList type={'rules'} data={data}/>)
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(defaultUrl+`/rule/list`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

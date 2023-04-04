import {
  Breadcrumbs,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import defaultUrl from '@/constant/url';

export default function ({type, data}) {
  return (<Container>
    <Paper sx={{
      padding: 4,
      mt: 5
    }} elevation={4}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          主页
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href={type==='notices'?'/notices':'/rules'}
          aria-current="page"
        >
          {type==='notices'?'通知公告':'规章制度'}
        </Link>
      </Breadcrumbs>
      <List component="nav" aria-label="mailbox folders" sx={{paddingRight: 0}}>
        {data.reverse().map(value => (
          <ListItem divider button key={value.title}>
            {/*<ListItemText primary="Inbox" />*/}
            <Typography noWrap={true}>{value.title}</Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  </Container>)
}




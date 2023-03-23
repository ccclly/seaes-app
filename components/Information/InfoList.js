import {
  Breadcrumbs,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default function ({type}) {
  const notice = [
    '教育部办公厅关于进一步加强高校教学实验室安全检查工作的通知',
    '教育部要求高校自查实验室安全:出过事的重点关注',
    '爆炸带走三学生生命 高校实验室安全风险如何消弭？',
    '北京交通大学“12·26”事故调查报告公布'];

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
        {notice.map(value => (
          <ListItem divider button key={value}>
            {/*<ListItemText primary="Inbox" />*/}
            <Typography noWrap={true}>{value}</Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  </Container>)
}

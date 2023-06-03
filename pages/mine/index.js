import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent, CardMedia,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  LinearProgress,
  linearProgressClasses,
  Paper,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import UserLogin from '@/components/Login/UserLogin';
import request1 from '@/Util/request1';
import dayjs from 'dayjs';
import url from '@/constant/url';
import KeyIcon from '@mui/icons-material/Key';
import * as React from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default () => {
  const [isLogin, setIsLogin] = useState(null);
  const [status, setStatus] = useState(0);
  const [papers, setPapers] = useState([]);
  const [papersStatus, setPapersStatus] = useState(false);
  const [record, setRecord] = useState([]);
  const [recordStatus, setRecordStatus] = useState(false);
  const [enter, setEnter] = useState([]);
  const [enterStatus, setEnterStatus] = useState(false);



  useEffect(() => {
    const info = isLogin||JSON.parse(localStorage.getItem('loginInfo'));
    setStatus(1);
    setIsLogin(info);
    if (info) {
      request1.get('/paper/list').then(value => {
        setPapers(value.data.reverse());
        console.log(value.data);
        setPapersStatus(true)
      });
      request1.get('/recode-lesson/record_list').then(value => {
        setRecord(value.data);
        setRecordStatus(true)
      });
      request1.get('/enter-permit/list-user').then(value=>{
        console.log(value.data)
        setEnter(value.data)
        setEnterStatus(true)
      })
    }
  }, [isLogin]);
  return (
    <>
      {
        status === 0 ? <Box sx={{ width: '100%' }}>
            <LinearProgress/>
          </Box>
          :
          isLogin ?
            <Container>
              <Box sx={{
                fontFamily: 'var(--myfont-font)',
                mt: 2,
                mb: 1,
                fontSize: 25,
              }}>
                你好，用户{isLogin.name}
                <Button onClick={()=>{
                  localStorage.removeItem('loginInfo');
                  setIsLogin(null)
                }}
                        sx={{
                          ml: 2
                        }}
                >
                  退出登录
                </Button>
              </Box>
              <Grid container>
                <Grid xs={5} item>
                  <Paper
                    sx={{
                      width: '90%',
                      height: 595,
                      display: 'flex',
                      overflowY: 'scroll',
                      position: 'relative',
                      flexDirection: 'column',
                    }}
                    variant="outlined"
                  >
                    {
                      enterStatus ? (enter.length===0?<Box>无记录</Box>:(enter.map((value, index) => (
                        <Card key={index}
                              sx={{ maxWidth: 386, margin: '13px 15px', mt: 1, height:180, position: 'relative' }}
                              elevation={2}

                        >
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {value.enterPermit.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                              进入标准：
                            </Typography>
                            <Typography variant="body2">
                              <Box><Checkbox checked={value.examPass} /> <Link href={'/exam'}><Button size={'small'}>{value.exam.name}</Button></Link>正确率达到{value.enterPermit.examScore}%</Box>
                              <Box><Checkbox checked={value.coursePass} /><Link href={'/learn'}><Button size={'small'}>{value.course.name}</Button></Link>进度到达{value.enterPermit.courseScore}%</Box>
                            </Typography>
                            {
                              (value.examPass&&value.coursePass)&&
                              <Box sx={{
                                position: 'absolute',
                                right: 10,
                                top: 15,
                                color: 'green',
                                fontSize: 18
                              }}>
                                <DoneAllIcon sx={{
                                  position: 'relative',
                                  top: 7
                                }} color={'success'} />
                                您被允许进入该实验室
                              </Box>}
                          </CardContent>
                        </Card>
                      )))) : <Box sx={{ width: '100%' }}>
                        <LinearProgress/>
                      </Box>
                    }
                  </Paper>
                </Grid>
                <Grid xs={7} item>
                  <Paper
                    sx={{
                      width: '100%',
                      height: 240,
                      display: 'flex',
                      overflowX: 'scroll',
                      position: 'relative',
                    }}
                    variant="outlined"
                  >
                    {
                      papersStatus ? (papers.length === 0 ? <Box>无记录</Box>:(papers.map((value, index) => (
                        <Card key={index}
                              sx={{ minWidth: 245, margin: '13px 15px', }}
                              elevation={2}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary"
                                        gutterBottom>
                              {dayjs(value.createAt).format('YYYY-MM-DD HH:mm:ss')}
                            </Typography>
                            <Typography variant="h5" component="div" noWrap={true}>
                              {value.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                              {value.state ? '进行中' : '已结束'}
                            </Typography>
                            <Typography variant="body2">
                              {!value.state&&<>正确率：{value.userScore * 100}%</>}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {value.state?((value.examId===null)?<Link href={'/exam/test/5'}><Button
                                  size="small" sx={{mt:2.5}}>继续练习</Button></Link> :<Link href={'/exam/' + value.examId}><Button
                              size="small">继续考试</Button></Link>):
                              <Link href={'/mine/paper-record/' + value.id}>
                              <Button size="small">查看记录</Button>
                            </Link>}
                          </CardActions>
                        </Card>
                      )))) : <Box sx={{ width: '100%' }}>
                        <LinearProgress/>
                      </Box>
                    }
                  </Paper>
                  <Paper
                    sx={{
                      width: '100%',
                      height: 330,
                      display: 'flex',
                      overflowX: 'scroll',
                      position: 'relative',
                      mt: 3
                    }}
                    variant="outlined"
                  >
                    {
                      recordStatus ? (record.length === 0 ?<Box>无记录</Box>:(record.map((value, index) => (
                        <Card key={index}
                              sx={{ minWidth: 245, margin: '13px 15px' }}
                              elevation={2}>
                          <CardContent>
                            <CardMedia
                              image={url+'/'+value.course.imgName}
                              sx={{ height: 140 }}
                            />
                            <Typography variant="h5" component="div">
                              {value.course.name}
                            </Typography>
                            <Typography variant="body2">
                              完成进度：{value.process }%
                              <BorderLinearProgress variant="determinate" value={value.process} />
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Link href={'/learn/' + value.course.id}>
                              <Button size="small">查看课程</Button>
                            </Link>
                          </CardActions>
                        </Card>
                      )))) : <Box sx={{ width: '100%' }}>
                        <LinearProgress/>
                      </Box>
                    }
                  </Paper>
                </Grid>
              </Grid>

            </Container>
            : <UserLogin setIsLogin={setIsLogin} setStatus={setStatus}/>
      }
    </>
  );
};

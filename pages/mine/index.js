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
  const [record, setRecord] = useState([]);
  const [enter, setEnter] = useState([]);
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('loginInfo'));
    setStatus(1);
    setIsLogin(info);
    if (info) {
      request1.get('/paper/list').then(value => {
        setPapers(value.data.reverse());
      });
      request1.get('/recode-lesson/record_list').then(value => {
        setRecord(value.data);
      });
      request1.get('/enter-permit/list-user').then(value=>{
        console.log(value.data)
        setEnter(value.data)
      })
    }
  }, []);
  return (
    <>
      {
        status === 0 ? <Box sx={{ width: '100%' }}>
            <LinearProgress/>
          </Box>
          :
          isLogin ?
            <Container>
              <Typography variant="h4" gutterBottom sx={{
                fontFamily: 'var(--myfont-font)',
                mt: 2
              }}>
                你好，用户{isLogin.name}
              </Typography>
              <Grid container>
                <Grid xs={4} item>
                  <Paper
                    sx={{
                      width: '90%',
                      height: 615,
                      display: 'flex',
                      overflowY: 'scroll',
                      position: 'relative',
                      flexDirection: 'column',
                      pt: 4
                    }}
                    variant="outlined"
                  >
                    {
                      enter.length > 0 ? (enter.map((value, index) => (
                        <Card key={index}
                              sx={{ maxWidth: 326, margin: '13px 15px', mt: 1, height:180 }}
                              elevation={2}>
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {value.enterPermit.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                              进入标准：
                            </Typography>
                            <Typography variant="body2">
                              <Checkbox checked={value.examPass} /> <Link href={'/exam'}><Button size={'small'}>{value.exam.name}</Button></Link>正确率达到{value.enterPermit.examScore}%
                              <Checkbox checked={value.coursePass} /><Link href={'/learn'}><Button size={'small'}>{value.course.name}</Button></Link>进度到达{value.enterPermit.examScore}%
                            </Typography>
                          </CardContent>
                        </Card>
                      ))) : <Box sx={{ width: '100%' }}>
                        <LinearProgress/>
                      </Box>
                    }
                  </Paper>
                </Grid>
                <Grid xs={8} item>
                  <Paper
                    sx={{
                      width: '100%',
                      height: 250,
                      display: 'flex',
                      overflowX: 'scroll',
                      position: 'relative',
                    }}
                    variant="outlined"
                  >
                    {
                      papers.length > 0 ? (papers.map((value, index) => (
                        <Card key={index}
                              sx={{ minWidth: 245, margin: '13px 15px', mt: 5 }}
                              elevation={2}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary"
                                        gutterBottom>
                              {dayjs(value.createAt).format('YYYY-MM-DD HH:mm:ss')}
                              {/*{value.test?'练习':'考试'}*/}
                            </Typography>
                            <Typography variant="h5" component="div">
                              {value.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                              {value.status ? '进行中' : '已结束'}
                            </Typography>
                            <Typography variant="body2">
                              正确率：{value.userScore * 100}%
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Link href={'/mine/paper-record/' + value.id}>
                              <Button size="small">查看记录</Button>
                            </Link>
                          </CardActions>
                        </Card>
                      ))) : <Box sx={{ width: '100%' }}>
                        <LinearProgress/>
                      </Box>
                    }
                  </Paper>
                  <Paper
                    sx={{
                      width: '100%',
                      height: 340,
                      display: 'flex',
                      overflowX: 'scroll',
                      position: 'relative',
                      mt: 3
                    }}
                    variant="outlined"
                  >
                    {
                      record.length > 0 ? (record.map((value, index) => (
                        <Card key={index}
                              sx={{ minWidth: 245, margin: '13px 15px', mt: 5 }}
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
                      ))) : <Box sx={{ width: '100%' }}>
                        <LinearProgress/>
                      </Box>
                    }
                  </Paper>
                </Grid>
              </Grid>
              {/*<Typography sx={{*/}
              {/*  position: 'absolute',*/}
              {/*  left: 37,*/}
              {/*  top: 5,*/}
              {/*}} variant="h5" gutterBottom>*/}
              {/*  做题记录*/}
              {/*</Typography>*/}

              {/*<Typography sx={{*/}
              {/*  position: 'fixed',*/}
              {/*  left: 37,*/}
              {/*  top: 122,*/}
              {/*}} variant="h5" gutterBottom>*/}
              {/*  做题记录*/}
              {/*</Typography>*/}

            </Container>
            : <UserLogin setIsLogin={setIsLogin} setStatus={setStatus}/>
      }
    </>
  );
};

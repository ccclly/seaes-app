import { useEffect, useState } from 'react';
import {
  Button,
  Card, CardActionArea,
  CardActions, CardContent, Collapse,
  Container, FormControl,
  IconButton, InputLabel, List, ListItem, MenuItem, NativeSelect, Select,
  styled, Typography, Box, Paper, Grow
} from '@mui/material';
import StartIcon from '@mui/icons-material/Start';
import request1 from '@/Util/request1';
import Link from 'next/link';

export default function () {
  const [num, setNum] = useState('5');
  const [examList, setExamList] = useState([]);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('loginInfo'));
    console.log(info);
    if (info) {
      setLogin(true);
      request1.get('/exam/list').then(value => {
        setExamList(value.data);
      });
    }
  }, []);

  const handleChange = (event) => {
    setNum(event.target.value);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 5, flexDirection: 'column' }}>
      <Grow in>
      <Card elevation={5} sx={{ width: { xs: 400, md: 500, lg: 600 }, display: 'flex' }}>
        <CardActionArea disableSpacing disabled sx={{ height: 200, flex: 1 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{
              fontFamily: 'var(--myfont-font)',
              fontWeight: 20,
              ml: 1
            }}>
              题库自测
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing sx={{ flex: 2, ml: 5 }}>
          {!login ? <Box>请先去<Link href={'/mine'} style={{
            color: 'rgb(25,118,210)'
          }}>登录</Link></Box> :( <>
            <FormControl sx={{
              width: 150,
              mr: 3
            }}>
              <InputLabel>题目数量</InputLabel>
              <Select
                value={num}
                label="题目数量"
                onChange={handleChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
            <Link href={'/exam/test/' + num}>
              <Button variant={'contained'}>进入自测</Button>
            </Link>
          </>)
          }
        </CardActions>
      </Card>
      </Grow>
      <Grow in>
      <Card elevation={5} sx={{ width: { xs: 400, md: 500, lg: 600 }, display: 'flex', mt: 6 }}>
        <CardActions disableSpacing sx={{ height: 200, flex: 1 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{
            fontFamily: 'var(--myfont-font)',
            fontWeight: 20,
            ml: 3
          }}>
            考试列表
          </Typography>
        </CardActions>
        <CardActions disableSpacing sx={{ flex: 2 }}>
          {!login ? <Box>请先去<Link href={'/mine'} style={{
              color: 'rgb(25,118,210)'
            }}>登录</Link></Box>:
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                width: '100%'
              }}
            >
            <List >
              {examList.map((value, index) => (
                <ListItem key={index} sx={{
                  display: 'flex'
                }}>
                  <Typography sx={{
                    flex: 1,
                    fontFamily: 'var(--myfont-font)',

                  }}>
                    {value.name}
                  </Typography>
                  <Link href={'/exam/' + value.id}>
                    <Button variant={'contained'}>进入考试</Button>
                  </Link>
                </ListItem>
              ))}
            </List></Paper>}
        </CardActions>
      </Card>
      </Grow>
    </Container>
  );
}

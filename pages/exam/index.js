import {useEffect, useState} from 'react';
import {
  Button,
  Card, CardActionArea,
  CardActions, CardContent, Collapse,
  Container, FormControl,
  IconButton, InputLabel, List, ListItem, MenuItem, NativeSelect, Select,
  styled, Typography,Box
} from '@mui/material';
import StartIcon from '@mui/icons-material/Start';
import request1 from '@/Util/request1'
import Link from 'next/link';


export default function () {
  const [num, setNum] = useState('10');
  const [examList, setExamList] = useState([])
  const [login, setLogin] = useState(false)
  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('loginInfo'))
    console.log(info)
    if(info){
      setLogin(true)
      request1.get('/exam/list').then(value => {
        setExamList(value.data)
      })}
  }, [])

  const handleChange = (event) => {
    setNum(event.target.value);
  };

  return(
    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 5, flexDirection: 'column'}}>
      <Card elevation={5} sx={{ width: {xs: 400, md: 500, lg: 600}, display: 'flex'}}>
        <CardActionArea disableSpacing sx={{height: 200, flex: 1}}>
          <Link href={'/exam/test/' +num}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              题库自测
            </Typography>
          </CardContent>
          </Link>
        </CardActionArea>
        <CardActions disableSpacing sx={{flex: 1}} >
          <FormControl fullWidth color={'secondary'}>
            <InputLabel>题目数量</InputLabel>
            <Select
              value={num}
              label="题目数量"
              onChange={handleChange}
              sx={{
                '& label.Mui-focused': {
                  color: '#9c27b0',
                },
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </CardActions>
      </Card>
      <Card elevation={5} sx={{ width: {xs: 400, md: 500, lg: 600}, display: 'flex', mt:6}}>
        <CardActions disableSpacing sx={{height: 200, flex: 1}}>
          考试列表
        </CardActions>
        <CardActions disableSpacing sx={{flex: 1}} >
          {!login?<Box>请先去登录</Box>:
          <List>
            {examList.map((value, index) => (
              <ListItem key={index}>
                {value.name}
                <Link href={'/exam/' + value.id}>
                  <Button color={'secondary'}>进入考试</Button>
                </Link>
              </ListItem>
            ))}
          </List>}
        </CardActions>
      </Card>
    </Container>
  )
}

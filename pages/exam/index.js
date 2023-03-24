import {useState} from 'react';
import {
  Button,
  Card, CardActionArea,
  CardActions, CardContent, Collapse,
  Container, FormControl,
  IconButton, InputLabel, List, ListItem, MenuItem, NativeSelect, Select,
  styled, Typography,
} from '@mui/material';
import StartIcon from '@mui/icons-material/Start';


export default function () {
  const [num, setNum] = useState('10');
  const examList = [{
    name: '化学实验室考试',
    sTime: '2023/1/1 19:00',
    eTime: '2023/1/1 20:00',
    delay: '30'
  }]

  const handleChange = (event) => {
    setNum(event.target.value);
  };

  return(
    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 5, flexDirection: 'column'}}>
      <Card elevation={5} sx={{ width: {xs: 400, md: 500, lg: 600}, display: 'flex'}}>
        <CardActionArea disableSpacing sx={{height: 200, flex: 1}}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              题库自测
            </Typography>
            <Typography variant="body2" color="text.secondary">
              题库内包含500+道题，帮助你巩固安全知识
            </Typography>
          </CardContent>
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
          <List>
            {examList.map((value, index) => (
              <ListItem key={index}>
                {value.name}
                进入时间：{value.sTime}-{value.eTime}
                考试时长：{value.delay}
                <Button color={'secondary'}>进入考试</Button>
              </ListItem>
            ))}
          </List>
        </CardActions>
      </Card>
    </Container>
  )
}

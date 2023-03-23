import styles from '@/styles/Home.module.css';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia, Paper,
  Typography,
} from '@mui/material';

export default () => {
  const dataList = [{img: '/image/01.jpg', name: '化学课程', dec: '《生物实验室安全》是涉及生物学研究相关专业的实验室安全知识。本课程通过大量视频资料和案例分析，系统地介绍了生物实验室的安全隐患、安全防范措施以及事故发生时的应急处理措施，旨在提高实验人员的安全防范意识和应急处理能力，有效防范安全事故发生、降低安全事故危害。课程内容主要包括实验室基础安全知识、生物安全、微生物实验安全防控、分子生物学安全防控、化学品安全、废弃物安全等。\n'}]
  return (
    <div>
      {dataList.map(value => (
        <Paper key={value.name} elevation={3} sx={{ width: 400, height: 300 }}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={value.img}
                alt="Paella dish"
              />
              <Typography gutterBottom variant="h5" component="div">
                {value.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {value.dec}
              </Typography>
            </CardActionArea>
          </Card>
        </Paper>
      ))}
    </div>
  );
};

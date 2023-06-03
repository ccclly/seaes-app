import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia, Container, Grid, Grow, Paper,
  Typography,
} from '@mui/material';
import defaultUrl from '@/constant/url';
import { useEffect, useState } from 'react';
import request from '@/Util/request';
import Link from 'next/link';


export default () => {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    request.get('/course/list').then(value => {
      setDataList(value.data);
    });
  }, []);

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Grid container spacing={2}
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left' }}>

        {dataList.map((value, index) => (
          <Grid item key={index}>
            <Grow in timeout={300+60*index}>
              <Card key={value.name} elevation={3}
                    sx={{ width: { xs: 225, sm: 250, md: 260 }, height: 230 }}>
                <Link href={'/learn/' +value.id}>
                <CardActionArea sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <CardMedia
                    component="img"
                    image={defaultUrl + '/' + value.imgName}
                    alt="图片"
                    sx={{
                      height: '154px'
                    }}
                  />
                  <Typography gutterBottom mt={1} variant="h6" component="div">
                    {value.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary"
                              noWrap={true}
                              flex={1}
                              width={'100%'}
                  >
                    {value.description}
                  </Typography>
                </CardActionArea>
                </Link>
              </Card>
            </Grow>
          </Grid>
        ))}

      </Grid>
    </Container>
  );

};

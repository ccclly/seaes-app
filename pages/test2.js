import { useState } from 'react';
import { Button, Container, Grid, Paper } from '@mui/material';

let chunks = [];
let mediaRecorder = null;
export default function () {
  const [url, setUrl] = useState('');
  const startRecoding = async () => {
    let stream = null;
    setUrl('');
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
    } catch (err) {
      console.log('err');
    }
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = ev => chunks.push(ev.data);
    mediaRecorder.onstop = () => {
      console.log('记录停止');
      const blob = new Blob(chunks, { type: 'video/mp4' });
      setUrl(window.URL.createObjectURL(blob));
    };
    mediaRecorder.start();
  };
  const stopRecoding = () => {
    mediaRecorder.stop();
  };
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button onClick={startRecoding}>
            点击录制
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={stopRecoding}>
            点击停止
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button>
            下载
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <video src={url} width={'100%'} height={'100%'}
                   controls={!!url ? true : false}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

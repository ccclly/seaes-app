import { CardMedia, Container, LinearProgress, Skeleton } from '@mui/material';
import MyPlayer from '@/Util/MyPlayer';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import request1 from '@/Util/request1';
export default function (){

  const [state, setState] = useState(false);
  const [time, setTime] = useState(0);
  const [delay, setDelay] = useState(0);
  const [running, setRunning] = useState(false);
  const [finish, setFinish] = useState(false)
  const [recordId, setRecordId] = useState(null)
  
  const intervalRef = useRef(null);

  const router = useRouter();
  const { path, lessonId, id } = router.query;
  useEffect(() => {
    if (!!path) {
      setState(true)
    }
  }, [path]);
  useEffect(() => {
    if ((time / (delay * 0.8 / 2) * 100) >= 100) {
      setFinish(true)
      clearInterval(intervalRef.current);
      const info = JSON.parse(localStorage.getItem('loginInfo'))
      if(info){
        request1.post('/recode-lesson/save', {
          lessonId: lessonId,
          courseId: id,
          userId: info.id,
          process: 100
        }).then(value => {
          console.log(value.data)
        })
      }
    }
  }, [time, intervalRef.current]);

  function handleStart() {
    if (!running && !finish ) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) =>{ 
          return( prevTime + 1)
        });
      }, 1000);
    }
  }

  function handleStop() {
    if (!finish && running) {
      setRunning(false);
      clearInterval(intervalRef.current);
    }
  }

  return(
    <Container>
      {state?<><MyPlayer
        // option={{
        //   videoSrc: 'http://localhost:8080/' + path,
        //   width: '100%',
        //   // height: 420,
        // }}
        url={'http://localhost:8080/' + path}
        controls={true}
        // onProgress={ev => {
          
        // }}
        onDuration={ev => setDelay(ev)}
        onPlay={() => {
          handleStart()
        }}
        onPause={()=>{
          handleStop()
        }}
      />
        <h1>{time / (delay * 0.8 / 2) * 100}--{time}=={finish+'dd'}</h1>
      <LinearProgress color={finish?'success':'info'} variant="determinate" value={finish?100:time/(delay*0.8/2)*100} />
      </>
      :
        <Skeleton variant="rectangular" width={410} height={260} />}
    </Container>
  )
}

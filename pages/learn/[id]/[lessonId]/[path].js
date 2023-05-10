import {
  CardMedia,
  Container, Grid,
  LinearProgress, List, ListItem, ListItemButton,
  Skeleton,
  styled, Typography,
} from '@mui/material';
import MyPlayer from '@/Util/MyPlayer';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import request1 from '@/Util/request1';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Link from 'next/link';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }}/>}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function () {
  const [state, setState] = useState(false);
  const [time, setTime] = useState(0);
  const [delay, setDelay] = useState(0);
  const [running, setRunning] = useState(false);
  const [finish, setFinish] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [rate, setRate] = useState(1);
  const [list, setList] = useState(null);
  const [name, setName] = useState('');

  const intervalRef = useRef(null);

  const router = useRouter();
  const { path, lessonId, id } = router.query;
  useEffect(() => {
    if (!!path) {
      setState(true);
      request1.post('/recode-lesson/r-l', {
        courseId: id,
        lessonId: lessonId,
      }).then(value => {
        console.log(value.data)
        if (value.data == 100) {
          setFinish(true);
        }else {
          setFinish(false);
          setTime(0)
          setDelay(0);
          setRunning(false)
        }
        clearInterval(intervalRef.current);
      });
      const url = '/course/' + id;
      request1.get(url).then(value => {
        setList(value.data);
      });
      request1.get('/lesson/' + lessonId).then(value => {
        setName(value.data.name)
      });
    }
  }, [path]);
  useEffect(() => {
    if ((time / (delay * 0.8 / rate) * 100) >= 100) {
      setFinish(true);
      clearInterval(intervalRef.current);
      const info = JSON.parse(localStorage.getItem('loginInfo'));
      if (info) {
        request1.post('/recode-lesson/save', {
          lessonId: lessonId,
          courseId: id,
          userId: info.id,
          process: 100,
        }).then(value => {
          console.log(value.data);
        });
      }
    }
  }, [time, intervalRef.current]);

  function handleStart () {
    if (!running && !finish) {
      console.log(rate);
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          return (prevTime + 1);
        });
      }, 1000);
    }
  }

  function handleStop () {
    if (!finish && running) {
      setRunning(false);
      clearInterval(intervalRef.current);
    }
  }

  return (
    <Container sx={{
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {state ? <>
          <Typography variant={'h4'}>
            {name}
          </Typography>
          <MyPlayer
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
            handleStart();
          }}
          onPlaybackRateChange={(speed) => setRate(speed)}
          onPause={() => {
            handleStop();
          }}
        />
          <LinearProgress color={finish ? 'success' : 'info'} sx={{
            width: 640,
            height: 10,
          }} variant="determinate"
                          value={finish ? 100 : time / (delay * 0.8 / rate) *
                            100}/>
          <Grid item sx={{ mt: 3, width: 640 }} xs={12}>
            {(list)&&list.chapterList.map((value, index) => (
              <Accordion key={index} sx={{ width: '100%' }}>
                <AccordionSummary aria-controls="panel1d-content"
                                  id="panel1d-header">
                  <Typography>{value.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List sx={{}} disablePadding>
                    {list.lessonList.map((value1, index) => (
                      value.id == value1.chapterId &&
                      <ListItem key={index} disablePadding divider>
                        <Link href={'/learn/' + id + '/' + value1.id + '/' +
                          value1.vedioName}>
                          <ListItemButton>
                            {value1.name}
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

            ))}
          </Grid>
        </>
        :
        <Skeleton variant="rectangular" width={410} height={260}/>}
    </Container>
  );
}

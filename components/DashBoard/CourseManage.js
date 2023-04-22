import { useState, forwardRef } from 'react';
import {
  Box,
  Button, CardMedia, Grid, Input, ListItem, Modal, Paper,
  Step,
  StepLabel,
  Stepper, styled,
  TextField, Typography,
} from '@mui/material';
import request from '@/Util/request';
import url from '@/constant/url';
import PhotoIcon from '@mui/icons-material/Photo';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Step1 ({ step1, setStep1 }) {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      margin: '20px 200px',
    }}

    >
      <TextField
        label={'课程名称'}
        sx={{
          mb: 2
        }}
        value={step1.input1}
        onChange={event => setStep1(
          (val) => ({ ...val, input1: event.target.value }))}
      />
      <TextField
        label={'课程介绍'}
        multiline
        maxRows={4}
        sx={{
          mb: 2
        }}
        value={step1.input2}
        onChange={event => setStep1(
          val => ({ ...val, input2: event.target.value }))}
      />
      <FileUpload op={1} setStep1={setStep1}/>
      {!step1.input3 ? <Paper elevation={0} sx={{width:300, height: 200, }}><PhotoIcon/></Paper>: <Box
      >
        <img src={url + '/' + step1.input3} alt={'png'} width={300} height={200}/>
      </Box>}
    </Box>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
function Step2 ({chapter, setChapter, lesson, setLesson}) {

  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [chapterId, setChapterId] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (type==='chapter')
      setChapter(val => {
        return [...val, {name: data.get('name'), orderNum: val.length}]
      })
    else {
      let orderNum = 0
      lesson.forEach(val => {
        if (val.chapterId === chapterId) orderNum++;
      })
      setLesson(val => ([
        ...val,
        {
          name: data.get('name'),
          orderNum: orderNum,
          chapterId: chapterId,
        }]));
    }
    setOpen(false)
  }

  const createLesson = index => {
    setType('lesson')
    setChapterId(index)
    setOpen(true)
    // setLesson(val=>([...val, {name}]))
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={style}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            创建新{type==='chapter'? '章节':'小节'}
          </Typography>
          <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%'
            }}
          >
            <TextField
              label={'名称'}
              fullWidth
              name={'name'}
              size={'small'}
            />
            <Button fullWidth variant={'contained'} type={'submit'}>提交</Button>
          </Box>
        </Box>
      </Modal>
      <Button sx={{mb: 1}} variant={'contained'} onClick={()=> {setType('chapter');setOpen(true);}}>新建章节</Button>
      <Button onClick={()=>{console.log(JSON.stringify(chapter), JSON.stringify(lesson))}}>查看</Button>
      {chapter.length>0&&<Grid sx={{ width: '100%' }}>
        {chapter.map((val, index) => {
          return (<Paper key={val.name} sx={{mb: 1}}>
            <Grid aria-controls="panel1d-content"
                              id="panel1d-header">
              <Typography ml={3} pt={2}>第{index+1}章 {val.name}</Typography>
            </Grid>
            <Grid>
              <Grid container>
                <Grid item xs={2} display={'flex'} alignItems={'center'} justifyContent={'center'} height={'68px'}>
                  <Button variant={'contained'} onClick={()=>createLesson(index)}>创建小节</Button>
                </Grid>
                <Grid item xs={10}>
                  <List>
                    {lesson.map((val1, index1) => {
                      if(val1.chapterId === index)
                        return (<>
                        <ListItem key={val1.name} divider sx={{ display: 'flex' }}>
                          <Typography sx={{ flex: 1 }}>
                            {index+1+'.' +(index1+1)+'  '+val1.name}
                          </Typography>
                          {
                            !!val1.vedioName?
                              '视频文件已上传至服务器':
                            <FileUpload op={2} op2={(data) => {
                              setLesson(val3 => {
                                return val3.map((val4, index) => {
                                  if (index === index1) val4.vedioName = data;
                                  return val4;
                                });
                              });
                            }}/>
                          }
                        </ListItem>
                      </>);
                    })}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Paper>);
        })}
      </Grid>}
    </>
  );
}

function Step3 () {
  return (
    <>
      step3
    </>
  );
}

function Steps ({ setCreate }) {
  const steps = ['步骤 1', '步骤 2', '步骤 3'];
  const [activeStep, setActiveStep] = useState(0);
  const [step1, setStep1] = useState({
    input1: '',
    input2: '',
    input3: ''
  });
  const [chapter, setChapter] = useState([]);
  const [lesson, setLesson] = useState([]);

  const fn = () => {
    if (activeStep === 0) {
      return <Step1 step1={step1} setStep1={setStep1}/>;
    } else if (activeStep === 1) {
      return <Step2 chapter={chapter} setChapter={setChapter} lesson={lesson} setLesson={setLesson}/>;
    } else if (activeStep === 2) {
      return <Step3/>;
    }
  };

  const handleNext = () => {
    if (activeStep === 2) {
      setActiveStep(0);
      setCreate(false);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Grid display={'flex'} justifyContent={'space-between'}>
        <Button variant={'contained'} onClick={handleBack}
                sx={{
                  height: 40,
                  width: 80,
                }}
                disabled={activeStep === 0}>上一步</Button>
        <Stepper sx={{
          flex: 1,
        }} activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (index === activeStep) {
              labelProps.active = true;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Button
          sx={{
            height: 40,
            width: 80,
          }}
          variant={'contained'} onClick={handleNext}>{activeStep !== 2
          ? '下一步'
          : '完成'}</Button>
      </Grid>
      {fn()}
    </>
  );
}

const FileUpload = ({setStep1, op, op2}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // if (event.target.files[0]) {
    //   handleUpload();
    // }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    request.post('/course/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100);
        console.log(percentage);
        setProgress(percentage);
      },
    }).then(response => {
      setOpen(true)
      console.log(response.data);
      if (op == 1)
        setStep1(val=>({...val, input3: response.data}))
      else if (op ==2)
        op2(response.data)
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <Box
      // sx={{
      //   mb: 2
      // }}
    >
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
        <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
          文件上传成功
        </Alert>
      </Snackbar>
      <input type="file" name={'file'} onChange={handleFileChange}/>
      <Button variant={'contained'} onClick={handleUpload}>上传</Button>
      {/*<Button*/}
      {/*  variant="contained"*/}
      {/*  component="label"*/}
      {/*  onClick={handleFileChange}*/}
      {/*>*/}
      {/*  上传文件*/}
      {/*  <input*/}
      {/*    type="file"*/}
      {/*    hidden*/}
      {/*  />*/}
      {/*</Button>*/}
      {progress > 0 && <p>Progress: {progress}%</p>}
    </Box>);
};

export default function () {

  const [create, setCreate] = useState(false);

  const createCourse = () => {
    setCreate(true);
  };

  return (
    <>
      {/*<Button*/}
      {/*  variant="contained"*/}
      {/*  component="label"*/}
      {/*>*/}
      {/*  上传文件*/}
      {/*  <input*/}
      {/*    type="file"*/}
      {/*    hidden*/}
      {/*  />*/}
      {/*</Button>*/}
      {/*<FileUpload/>*/}
      {!create &&
        <Button variant={'contained'} onClick={createCourse}>创建课程</Button>}
      {create && <Steps setCreate={setCreate}/>}
    </>
  );
}

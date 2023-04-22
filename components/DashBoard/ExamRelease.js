import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/zh-cn';


import { useState } from 'react';
import { TimeField, zhCN } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};


export default function () {

  const [open, setOpen] = useState(false);
  const [time, setTime] = useState([]);
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  }
  console.log(time)

  return (
    <>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            创建考试
          </Typography>
          <Box
            component={'form'}
            onSubmit={handleCreate}
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label={'考试名称'}
              id={'name'}
              name="name"
              size={'small'}
              sx={{ width: 400 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'zh-cn'}>
              {/*<SingleInputDateTimeRangeField*/}
              {/*  label="进入考试时间"*/}
              {/*  onChange={(newValue) => setTime(newValue)}*/}
              {/*  sx={{width: 400}}*/}
              {/*/>*/}
            </LocalizationProvider>
            <TextField
              label={'考试时长(单位分钟)'}
              name={'duration'}
              size={'small'}
              sx={{width: 400}}
              type={'number'}
            />
          </Box>
        </Box>
      </Modal>
      <Button
        onClick={event => {
          setOpen(true)
        }}
      >
        创建考试
      </Button>
    </>
  )
};

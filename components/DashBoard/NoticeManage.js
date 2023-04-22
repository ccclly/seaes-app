import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import React, { useCallback, useMemo } from 'react';
import RichText from '../RichText';
import request from '@/Util/request';


export default () => {

  const [state, setState] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const createNotice = () => {
    setType('notice');
    setOpen(true);
  };
  const createRule = () => {
    setType('rule');
    setOpen(true);
  };

  const handleChange = (content) => {
    setState(content);
  };

  function handleCreate (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const url = type === 'notice' ? '/notice/save' : '/rule/save';

    request.post(url, {
      title: data.get('name'),
      description: state,
    }).then(value => {
      console.log(value.data);
      setOpen(false)
    });
  }

  return (
    <>


      <Button variant={'contained'} onClick={createNotice}>
        发布通知公告
      </Button>
      <Button variant={'contained'} onClick={createRule}>
        发布规章制度
      </Button>
      {open && <Box >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          创建新{type === 'notice' ? '通知消息' : '规章制度'}
        </Typography>
        <Box
          component={'form'}
          onSubmit={handleCreate}
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flex: 1,
          }}
        >
          <TextField
            label={'标题名称'}
            id={'name'}
            name="name"
            size={'small'}
            sx={{ width: '100%' }}
          />
          <RichText defaultValue={''} lang={'zh_cn'} onChange={handleChange}/>
          <Button variant={'contained'} type={'submit'}>确定发布</Button>
        </Box>
      </Box>}
    </>
  );
};

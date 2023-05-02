import { Box, Button, Grid, List, ListItem, Modal, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import React, { useCallback, useMemo } from 'react';
import RichText from '../RichText';
import request from '@/Util/request';

export default () => {

  const [state, setState] = useState('');
  const [update, setUpdate] = useState('')
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [notice, setNotice] = useState([]);
  const [rule, setRule] = useState([]);
  useEffect(() => {
    request.get('/notice/list').then(value => setNotice(value.data));
    request.get('/rule/list').then(value => setRule(value.data));
    return () => {
    };
  }, []);

  const createNotice = () => {
    setUpdate('')
    setType('notice');
    setOpen(true);
  };
  const createRule = () => {
    setUpdate('')
    setType('rule');
    setOpen(true);
  };

  const handleChange = (content) => {
    setState(content);
  };

  function handleCreate (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let url =null;
    if (type === 'notice'){
      if (update == '') {
        url = '/notice/save';
      } else {
        url =  '/notice/update'
      }
    }else {
      if (update == '') {
        url = '/rule/save';
      } else {
        url =  '/rule/update'
      }
    }
    request.post(url, {
      title: data.get('name'),
      description: state,
      id: update
    }).then(value => {
      if (type === 'notice') {
        setNotice(value.data)
      }else {
        setRule(value.data);
      }
      setOpen(false);
    });
  }

  return (
    <>


      <Grid container spacing={2}>
        <Grid xs={6} item>
          <Paper elevation={2}  sx={{
            height: 300
          }}>
            <Typography>
              通知公告列表
            </Typography>
            <List>
              {notice.map(value => (
                <Box display={'flex'}>
                  <ListItem button onClick={ev => {
                    setType('notice')
                    setTitle(value.title)
                    setState(value.description)
                    setOpen(true)
                    setUpdate(value.id)
                  }}>
                    <Typography noWrap={true} sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOrientation: 'ellipsis',
                      width: 440
                    }}>
                      {value.title}
                    </Typography>
                  </ListItem>
                  <Button>删除</Button>
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid xs={6} item>
          <Paper elevation={2} sx={{
            height: 300
          }}>
            <Typography>
              规章制度列表
            </Typography>
            <List>
              {rule.map(value => (
                <Box display={'flex'}>
                  <ListItem button onClick={ev => {
                    setType('rule')
                    setTitle(value.title)
                    setState(value.description)
                    setOpen(true)
                    setUpdate(value.id)
                  }}>
                    <Typography noWrap={true} sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOrientation: 'ellipsis',
                      width: 440
                    }}>
                      {value.title}
                    </Typography>
                  </ListItem>
                  <Button>删除</Button>
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Button variant={'contained'} onClick={createNotice}>
        发布通知公告
      </Button>
      <Button variant={'contained'} onClick={createRule}>
        发布规章制度
      </Button>
      <Button onClick={()=>setOpen(false)}>取消</Button>
      {open && <Box>
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
            defaultValue={title}
          />
          <RichText defaultValue={state} lang={'zh_cn'} onChange={handleChange}/>
          <Button variant={'contained'} type={'submit'}>确定发布</Button>
        </Box>
      </Box>}
    </>
  );
};

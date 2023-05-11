import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import React, { useCallback, useMemo } from 'react';
import RichText from '../RichText';
import request from '@/Util/request';
import { DataGrid, GridToolbarContainer, zhCN } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function EditToolbar (props) {
  const { createNotice, handleDelete } = props;

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon/>} onClick={createNotice}>
        新建内容
      </Button>
      <Button color={'error'} startIcon={<DeleteOutlineIcon/>} onClick={handleDelete}>
        删除内容
      </Button>
    </GridToolbarContainer>
  );
}


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
    setState('');
    setTitle('');
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
          <Box sx={{ height: 300, width: '100%', m: 0 }}>
            <DataGrid
              rows={notice}
              columns={[
                { field: 'id', headerName: 'ID', width: 60 },
                {
                  field: 'title',
                  headerName: '标题',
                  width: 420,
                }
              ]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              checkboxSelection={true}
              pageSizeOptions={[10]}
              localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
              slots={{
                toolbar: EditToolbar,
              }}
              onCellDoubleClick={params => {
                setType('notice')
                setTitle(params.row.title)
                setState(params.row.description)
                setOpen(true)
                setUpdate(params.row.id)
              }}
              slotProps={{
                toolbar: {createNotice},
              }}
            />
          </Box>
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
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {/*<Button variant={'contained'} onClick={createNotice}>*/}
      {/*  发布通知公告*/}
      {/*</Button>*/}
      {/*<Button variant={'contained'} onClick={createRule}>*/}
      {/*  发布规章制度*/}
      {/*</Button>*/}
      </ButtonGroup>
      {open&&<Button color={'error'} variant={'contained'} onClick={() => setOpen(false)}>取消</Button>}
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

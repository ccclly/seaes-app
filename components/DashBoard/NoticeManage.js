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
        新建通知
      </Button>
      <Button color={'error'} startIcon={<DeleteOutlineIcon/>} onClick={handleDelete}>
        删除通知
      </Button>
    </GridToolbarContainer>
  );
}
function EditToolbar1 (props) {
  const { createRule, handleDelete1 } = props;

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon/>} onClick={createRule}>
        新建制度
      </Button>
      <Button color={'error'} startIcon={<DeleteOutlineIcon/>} onClick={handleDelete1}>
        删除制度
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
  const [select, setSelect] = useState([]);
  const [select1, setSelect1] = useState([]);
  useEffect(() => {
    request.get('/notice/list').then(value => setNotice(value.data));
    request.get('/rule/list').then(value => setRule(value.data));
    return () => {
    };
  }, []);

  const createNotice = () => {
    setUpdate('');
    setType('notice');
    setState('');
    setTitle('');
    setOpen(true);
  };
  const createRule = () => {
    setUpdate('')
    setType('rule');
    setState('')
    setTitle('');
    setOpen(true);
  };

  const handleDelete = () => {
    select.forEach(value => {
      request.post('/notice/delete/' + value).then(value1 => {
        setNotice(value1.data);
      })
    })
  }

  const handleDelete1 = () => {
    select1.forEach(value => {
      request.post('/rule/delete/' + value).then(value1 => {
        setNotice(value1.data);
      })
    })
  }

  const handleChange = (content) => {
    setState(content);
  };

  function handleCreate (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let url =null;
    if (type === 'notice'){
      url = '/notice/save';
    }else {
      url = '/rule/save';
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
              onRowSelectionModelChange={(par, a) => {
                setSelect(par)
              }}
              onCellDoubleClick={params => {
                setType('notice')
                setTitle(params.row.title)
                setState(params.row.description)
                setUpdate(params.row.id)
                setOpen(true)
              }}
              slotProps={{
                toolbar: {createNotice, handleDelete},
              }}
            />
          </Box>
        </Grid>
        <Grid xs={6} item>
          <Box sx={{ height: 300, width: '100%', m: 0 }}>
            <DataGrid
              rows={rule}
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
              onRowSelectionModelChange={(par, a) => {
                setSelect1(par)
              }}
              checkboxSelection={true}
              pageSizeOptions={[10]}
              localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
              slots={{
                toolbar: EditToolbar1,
              }}
              onCellDoubleClick={params => {
                setType('rule')
                setTitle(params.row.title)
                setState(params.row.description)
                setUpdate(params.row.id)
                setOpen(true)
              }}
              slotProps={{
                toolbar: {createRule, handleDelete1},
              }}
            />
          </Box>
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
          创建/更新{type === 'notice' ? '通知消息' : '规章制度'}
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
          <RichText height="100%" defaultValue={state} lang={'zh_cn'} onChange={handleChange}/>
          <Button variant={'contained'} type={'submit'}>确定发布</Button>
        </Box>
      </Box>}
    </>
  );
};

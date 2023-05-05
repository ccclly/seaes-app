import { DataGrid, GridToolbarContainer, zhCN } from '@mui/x-data-grid';
import {
  Box,
  Button, FormControlLabel,
  Modal, Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileUpload from '@/components/FileUpload';
import request from '@/Util/request';
import dayjs from 'dayjs';

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

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'title',
    headerName: '题目名称',
    width: 440,
  },
  {
    field: 'createAt',
    headerName: '创建时间',
    width: 220,
    valueGetter: (param) => {
      return dayjs(param.row.createAt).format('YYYY/MM/DD  HH:mm:ss');
    },
  }
];

function EditToolbar (props) {
  const { createQuBank, handleDelete } = props;

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon/>} onClick={createQuBank}>
        新建题库
      </Button>
      <Button color={'error'} startIcon={<DeleteOutlineIcon/>} onClick={handleDelete}>
        删除题库
      </Button>
    </GridToolbarContainer>
  );
}


export default ()=>{
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    request.get('/repository/list').then(value => {
      setRows(value.data)
    })
  }, []);


  function handleCreate (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      title: data.get('name'),
      id: id
    };
    request.post('/repository/save', body).then(value => {
      setRows(value.data)
      setOpen(false)
    })
  }

  const createQuBank = () => {
    setTitle('');
    setOpen(true)
  }
  const handleDelete = () => {
    selected.forEach(value => {
      request.post('/repository/delete', {
        id: value
      }).then(value1 => setRows(value1.data))
    })
  }

  return(
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            创建新题库
          </Typography>
          <Box
            component={'form'}
            onSubmit={handleCreate}
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <TextField
              label={'题库名称'}
              id={'name'}
              name="name"
              size={'small'}
              sx={{ width: 300 }}
              defaultValue={title}
            />
            {/*{fn()}*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                width: 300,
              }}
            >
              提交
            </Button>
          </Box>
        </Box>

      </Modal>
      <Box sx={{ height: 550, width: '100%', m: 0 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode={'row'}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection={true}
          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          slots={{
            toolbar: EditToolbar,
          }}
          onCellDoubleClick={params => {
            setTitle(params.row.title)
            setId(params.row.id)
            setOpen(true)
          }}
          onRowSelectionModelChange={(par, a) => {
            setSelected(par)
          }}
          slotProps={{
            toolbar: { createQuBank, handleDelete },
          }}
        />
      </Box>
    </>
  )
}

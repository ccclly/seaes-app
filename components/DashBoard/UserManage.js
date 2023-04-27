import { DataGrid, GridToolbarContainer, zhCN } from '@mui/x-data-grid';
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Check, Save } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import request from '@/Util/request';
import AddIcon from '@mui/icons-material/Add';


const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'name',
    headerName: '用户名',
    width: 120,
  },
  {
    field: 'user_type',
    headerName: '用户类型',
    valueGetter: (param) => {
      if (param.row.userType == 0) {
        return '普通用户';
      } else if (param.row.userType == 1) {
        return '管理员'
      }
    },
    width: 80
  },
  {
    field: 'grade',
    headerName: '年级',
    width: 100,
    editable: true,
  },
  {
    field: 'college',
    headerName: '学院',
    width: 210,
    editable: true,
  },
  {
    field: 'major',
    headerName: '班级',
    sortable: false,
    width: 160,
  },
  {
    field: 'num',
    headerName: '刷题数量',
    width: 150
  },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: (params) => (
      <Box onClick={event => {
        console.log(params)
      }}>
        <Button variant={'contained'} startIcon={<Save/>}>保存</Button>
      </Box>
    ),
  },
];


const rows = [
  {id: 1, username: '111', grade: 2016, college: '信息科学与工程学院', major: '软件工程', num: 123},
  {id: 2, username: '112', grade: 2016, college: '信息科学与工程学院', major: '软件工程', num: 124},
  {id: 3, username: '113', grade: 2016, college: '信息科学与工程学院', major: '软件工程', num: 125},
  {id: 4, username: '114', grade: 2016, college: '材料科学与工程学院', major: '高分子材料与工程', num: 126},
  {id: 5, username: '115', grade: 2016, college: '材料科学与工程学院', major: '高分子材料与工程', num: 123},
  {id: 6, username: '115', grade: 2016, college: '材料科学与工程学院', major: '高分子材料与工程', num: 123},
  {id: 7, username: '115', grade: 2016, college: '材料科学与工程学院', major: '高分子材料与工程', num: 123},
  {id: 8, username: '115', grade: 2016, college: '材料科学与工程学院', major: '高分子材料与工程', num: 123},
  {id: 9, username: '115', grade: 2016, college: '材料科学与工程学院', major: '高分子材料与工程', num: 123},
  {id: 10, username: '115', grade: 2016, college: '材料科学与工程学院', major: '高分子材料与工程', num: 123},
];


function EditToolbar(props) {
  // const { setRows, setRowModesModel, rows } = props;
  const { createUser } = props;
  //
  // const handleClick = () => {
  //   const id = rows.length + 1;
  //   setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    // setRowModesModel((oldModel) => ({
    //   ...oldModel,
    //   [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    // }));
  // };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={createUser}>
        新建用户
      </Button>
    </GridToolbarContainer>
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


export default function (){
  const [open, setOpen] = useState(false);
  const [collegeValue, setCollegeValue] = useState('');
  const [userType, setUserType] = useState('');
  const [rows, setRows] = useState([]);
  let handleEditCellChange = (e) => {
    console.log(e)
  };
  useEffect(() => {
    request.post('/user/list').then(value => {
      setRows(value.data)
    })
  }, []);


  const createUser = (e) => {
    setOpen(true)
  }
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('name'))
    console.log(data.get('password'))
    console.log(data.get('grade'))
    console.log(collegeValue);
    console.log(userType);
    let typeN = 0
    if (userType === '教师') {
      typeN = 1;
    }else if (userType === '管理员') {
      typeN = 2;
    }
    request.post('/user/save', {
      name: data.get('name'),
      password: data.get('password'),
      grade: data.get('grade'),
      college: collegeValue,
      major: data.get('major'),
      userType: typeN
    }).then(value => {
      setRows(value.data)
    });
    setCollegeValue('');
    setUserType('')
    setOpen(false);
  }
  return(
    <>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            创建新用户
          </Typography>
          <Box
            component={'form'}
            onSubmit={handleCreate}
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%'
            }}
          >
            <TextField
              label={'用户名'}
              id={'name'}
              name="name"
              size={'small'}
              sx={{ width: 300 }}
            />
            <TextField
              label={'密码'}
              id={'password'}
              name={'password'}
              size={'small'}
              sx={{ width: 300 }}
            />
            <TextField
              label={'年级'}
              id="grade"
              type={'number'}
              name={'grade'}
              sx={{ width: 300 }}
              size={'small'}
            />
            <Autocomplete
              freeSolo
              disablePortal
              id="college"
              name={'college'}
              options={[{label: '信息科学与工程学院'}, {label: '材料科学与工程学院'}]}
              sx={{ width: 300 }}
              inputValue={collegeValue}
              onInputChange={(event, newInputValue) => {
                setCollegeValue(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="学院" />}
              size={'small'}
            />
            <TextField
              label={'班级'}
              id="major"
              name={'major'}
              sx={{ width: 300 }}
              size={'small'}
            />
            <Autocomplete
              disablePortal
              id="user_type"
              options={[{label: '普通用户'}, {label: '教师'}, {label: '管理员'}]}
              inputValue={userType}
              onInputChange={(event, newInputValue) => {
                setUserType(newInputValue);
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="用户类型" />}
              size={'small'}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // sx={{ mt: 3, mb: 2 }}
              sx={{
                width: 300
              }}
            >
              创建
            </Button>
          </Box>
        </Box>
      </Modal>
      {/*<Button variant={'contained'} onClick={createUser}>添加新用户</Button>*/}
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          onCellEditStop={params => {
            console.log(params)
          }}
          onCellEditCommit={params => {
            console.log(params)
          }}
          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          slots={{
            toolbar: EditToolbar
          }}
          slotProps={{
            toolbar: { createUser}
          }}
        />
      </Box>
    </>
  )
}

import { DataGrid, GridToolbarContainer, GridToolbarExport, zhCN } from '@mui/x-data-grid';
import {
  Autocomplete,
  Box,
  Button, FormControl, FormControlLabel, Input, InputLabel, MenuItem,
  Modal, Radio, RadioGroup, Select,
  TextField,
  Typography,
} from '@mui/material';
import { Check, Save } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import request from '@/Util/request';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const rowColumns = [
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
    width: 100
  },
  {
    field: 'grade',
    headerName: '年级',
    width: 100,
  },
  {
    field: 'college',
    headerName: '学院',
    width: 210,
  },
  {
    field: 'major',
    headerName: '班级',
    sortable: false,
    width: 160,
  },
];




function EditToolbar(props) {
  // const { setRows, setRowModesModel, rows } = props;
  const { createUser, handleDelete } = props;
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
      <Button color={'error'} startIcon={<DeleteOutlineIcon />} onClick={handleDelete}>
        删除用户
      </Button>
      <GridToolbarExport />
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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [major, setMajor] = useState('');
  const [rows, setRows] = useState([]);
  const [id, setId] = useState('');
  const [selected, setSelected] = useState([]);
  const [columns, setColumns] = useState(rowColumns);

  useEffect(() => {
    // request.post('/user/list').then(value => {
    //   console.log(value.data);
    //   setRows(value.data)
    // })
    request.post('/user/list_and_enter_permit').then(value => {
      const nRows = value.data.map(value1=>{
        let item = { ...value1 }
        value1.enterDTOList.forEach(value2 => {item[value2.enterPermit.name] = (value2.examPass&&value2.coursePass)?'通过':'未通过'})
        return item
      })
      setRows(nRows)
    })
    request.get('/enter-permit/list').then(value => {
      const ncolumns = [...columns];
      value.data.forEach(value1=>{
        ncolumns.push({
          field: value1.name,
          headerName: value1.name,
          width: 150,
        },)
      })
      console.log(ncolumns);
      setColumns(ncolumns)
    })
  }, []);


  const createUser = (e) => {
    setName('')
    setPassword('')
    setGrade('')
    setMajor('')
    setCollegeValue('')
    setId('');
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
    request.post('/user/save', {
      name: data.get('name'),
      password: data.get('password'),
      grade: data.get('grade'),
      college: collegeValue,
      major: data.get('major'),
      userType: userType,
      id: id
    }).then(value => {
      const nRows = value.data.map(value1=>{
        let item = { ...value1 }
        value1.enterDTOList.forEach(value2 => {item[value2.enterPermit.name] = (value2.examPass&&value2.coursePass)?'通过':'未通过'})
        return item
      })
      setRows(nRows)
    });
    setCollegeValue('');
    setUserType('')
    setOpen(false);
  }
  const handleDelete = () => {
    selected.forEach(value => {
      request.post('/user/delete', {
        id: value
      }).then(value1 => setRows(value1.data))
    })
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
              defaultValue={name}
            />
            <TextField
              label={'密码'}
              id={'password'}
              name={'password'}
              size={'small'}
              sx={{ width: 300 }}
              defaultValue={password}
            />
            <TextField
              label={'年级'}
              id="grade"
              type={'number'}
              name={'grade'}
              sx={{ width: 300 }}
              size={'small'}
              defaultValue={grade}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">学院</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={collegeValue}
                label="学院"
                onChange={ev => setCollegeValue(ev.target.value)}
                size={'small'}
                sx={{width: 300}}
              >
                <MenuItem value={'信息科学与工程学院'}>信息科学与工程学院</MenuItem>
                <MenuItem value={'材料科学与工程学院'}>材料科学与工程学院</MenuItem>
                <MenuItem value={'环境科学与工程学院'}>环境科学与工程学院</MenuItem>
                <MenuItem value={'化学与生物工程学院'}>化学与生物工程学院</MenuItem>
                <MenuItem value={'土木与建筑工程学院'}>土木与建筑工程学院</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={'班级'}
              id="major"
              name={'major'}
              sx={{ width: 300 }}
              size={'small'}
              defaultValue={major}
            />
            <RadioGroup
              value={userType}
              onChange={event => {
                setUserType(event.target.value)
              }}
            >
              <FormControlLabel value="0" control={<Radio />} label="普通用户" />
              <FormControlLabel value="1" control={<Radio />} label="管理员" />
            </RadioGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // sx={{ mt: 3, mb: 2 }}
              sx={{
                width: 300
              }}
            >
              提交
            </Button>
          </Box>
        </Box>
      </Modal>
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
          checkboxSelection={true}
          pageSizeOptions={[10]}
          onCellDoubleClick={params => {
            setName(params.row.name)
            setPassword(params.row.password)
            setCollegeValue(params.row.college)
            setMajor(params.row.major)
            setUserType(params.row.userType)
            setGrade(params.row.grade)
            setId(params.row.id)
            setOpen(true)
          }}
          onRowSelectionModelChange={(par, a) => {
            console.log(par)
            setSelected(par)
          }}
          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          slots={{
            toolbar: EditToolbar
          }}
          slotProps={{
            toolbar: { createUser, handleDelete}
          }}
         />
      </Box>
    </>
  )
}

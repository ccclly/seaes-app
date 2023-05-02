import {
  DataGrid,
  GridToolbar,
  zhCN,
  GridRowModes,
  GridToolbarContainer, GridActionsCellItem,
} from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  Box,
  Button, FormControlLabel, Grid,
  Modal, Radio, RadioGroup,
  TextField,
  Typography, Checkbox, ToggleButtonGroup, ToggleButton, FormLabel, FormGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import request from '@/Util/request';
import { error } from 'next/dist/build/output/log';

const rowFn = (
  id, name, type, choiceA, A, choiceB, B, choiceC, C, choiceD, D, accuracy,
  analysis, author) => ({
  id: id,
  name: name,
  type: type === 0 ? '单选题' : (type === 1 ? '多选题' : '判断题'),
  choiceA: choiceA,
  choiceB: choiceB,
  choiceC: choiceC,
  choiceD: choiceD,
  A: A,
  B: B,
  C: C,
  D: D,
  accuracy: accuracy,
  analysis: analysis,
  author: author,
});

const initRows = [
  rowFn(1, '使用ABC类干粉灭火器可以扑灭以下哪几类火灾？', 1, '含碳固体火灾', true, '可燃液体火灾', true,
    '可燃气体火灾', true, '金属火灾', true, 80.11, '略'),
  // rowFn(2, '使用ABC类干粉灭火器可以扑灭以下哪几类火灾？', 1, '含碳固体火灾', false, '可燃液体火灾', false, '可燃气体火灾', false, '金属火灾', false, 80.11, '略')
];

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

function EditToolbar (props) {
  const { setRows, setRowModesModel, rows } = props;
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('0');

  const handleClick = () => {
    setOpen(true);
    // const id = rows.length + 1;
    // setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    // setRowModesModel((oldModel) => ({
    //   ...oldModel,
    //   [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    // }));
  };

  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('name'))
    console.log(data.get('choiceA'))
    console.log(data.get('choiceB'))
    console.log(data.get('choiceC'))
    console.log(data.get('choiceD'))
    console.log(data.get('A'))
    console.log(data.get('B'))
    console.log(data.get('C'))
    console.log(data.get('D'))
    console.log(data.get('true'))
    console.log(data.get('false'))
    console.log(data.get('analysis'))
    const body = {
      name: data.get('name'),
      type: Number(type),
      choiceA: type == 2 ? '正确' : data.get('choiceA'),
      choiceB: type == 2 ?'错误' : data.get('choiceB'),
      choiceC: data.get('choiceC'),
      choiceD: data.get('choiceD'),
      choiceAIsTrue: type == 2 ? !!data.get('true') : !!data.get('A'),
      choiceBIsTrue: type == 2 ? !!data.get('false') : !!data.get('B'),
      choiceCIsTrue: !!data.get('C'),
      choiceDIsTrue: !!data.get('D'),
      analysisDesc: data.get('analysis')
    }
    request.post('/problem/save', body).then(value => {
      setRows(value.data);
      setOpen(false);
    })
  };

  const choices = () => (<><TextField
    label={'选项A'}
    name={'choiceA'}
    size={'small'}
    sx={{ width: 300 }}
  />
    <TextField
      label={'选项B'}
      name={'choiceB'}
      size={'small'}
      sx={{ width: 300 }}
    />
    <TextField
      label={'选项C'}
      name={'choiceC'}
      size={'small'}
      sx={{ width: 300 }}
    />
    <TextField
      label={'选项D'}
      name={'choiceD'}
      size={'small'}
      sx={{ width: 300 }}
    /></>);

  const fn = () => {
    if (type == 0) {
      return (
        <>
          {choices()}
          <FormLabel id="demo-radio-buttons-group-label">正确答案：</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="choices"
            row
          >
            <FormControlLabel value="A" name={'A'} control={<Radio/>} label="A"/>
            <FormControlLabel value="B" name={'B'} control={<Radio/>} label="B"/>
            <FormControlLabel value="C" name={'C'} control={<Radio/>} label="C"/>
            <FormControlLabel value="D" name={'D'} control={<Radio/>} label="D"/>
          </RadioGroup>
        </>
      );
    } else if (type == 1) {
      return (
        <>
          {choices()}
          <FormLabel id="demo-radio-buttons-group-label">正确答案：</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox name="A"/>
              }
              label="A"
            />
            <FormControlLabel
              control={
                <Checkbox name="B"/>
              }
              label="B"
            />
            <FormControlLabel
              control={
                <Checkbox name="C"/>
              }
              label="C"
            />
            <FormControlLabel
              control={
                <Checkbox name="D"/>
              }
              label='D'
            />
          </FormGroup>
        </>
      );
    }else if (type == 2) {
      return (<>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="judge"
          row
        >
          <FormControlLabel value="true" name={'true'} control={<Radio/>} label="正确"/>
          <FormControlLabel value="false" name={'false'} control={<Radio/>} label="错误"/>
        </RadioGroup>
      </>)
    }
  };

  return (
    <Box>
      <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
        新建题目
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            创建新题目
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
              label={'题目名称'}
              id={'name'}
              name="name"
              size={'small'}
              sx={{ width: 300 }}
            />
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              row
              value={type}
              onChange={(event, value) => {
                setType(value);
              }}
            >
              <FormControlLabel value="0" control={<Radio/>} label="单选题"/>
              <FormControlLabel value="1" control={<Radio/>} label="多选题"/>
              <FormControlLabel value="2" control={<Radio/>} label="判断题"/>
            </RadioGroup>
            {fn()}
            <TextField
              label={'解析'}
              id={'analysis'}
              name={'analysis'}
              size={'small'}
              sx={{ width: 300 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // sx={{ mt: 3, mb: 2 }}
              sx={{
                width: 300,
              }}
            >
              创建
            </Button>
          </Box>
        </Box>

      </Modal>
    </Box>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
};

export default function () {
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  useEffect(() => {
    request.get('/problem/list').then(value => {
      setRows(value.data);
    })
  }, []);

  const [rowModesModel, setRowModesModel] = useState({});
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'name',
      headerName: '题目名称',
      width: 220,
      editable: true,
    },
    {
      field: 'type',
      headerName: '类型',
      valueGetter: (param) => {
        if (param.row.type == 0) {
          return '单选题';
        } else if (param.row.type == 1) {
          return '多选题'
        } else if (param.row.type == 2) {
          return '判断题'
        }
      },
      width: 90,
    },
    {
      field: 'choiceA',
      headerName: '选项A',
      editable: true,
      width: 150,
    },
    {
      field: 'choiceAIsTrue',
      headerName: '正确',
      type: 'boolean',
      editable: true,
      width: 40,
    },
    {
      field: 'choiceB',
      headerName: '选项B',
      editable: true,
      width: 150,
    },
    {
      field: 'choiceBIsTrue',
      headerName: '正确',
      type: 'boolean',
      editable: true,
      width: 40,
    },
    {
      field: 'choiceC',
      headerName: '选项C',
      editable: true,
      width: 150,
    },
    {
      field: 'choiceCIsTrue',
      headerName: '正确',
      editable: true,
      type: 'boolean',
      width: 40,
    },
    {
      field: 'choiceD',
      headerName: '选项D',
      editable: true,
      width: 150,
    },
    {
      field: 'choiceDIsTrue',
      headerName: '正确',
      type: 'boolean',
      editable: true,
      width: 40,
    },
    {
      field: 'accuracy',
      headerName: '正确率',
      width: 80,
    },
    {
      field: 'analysisDesc',
      headerName: '解析',
      width: 150,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '操作',
      width: 100,
      cellClassName: 'actions',
      renderCell: (params) =>{
        const handleDelete = () => {
          const data = {...params.row}
          request.post('/problem/delete', data).then(value => {
            // setRows(value.data);
            console.log(value)
            if (value.data.status === 500) {
              console.log('删除失败')
            }
          }).catch(error => {
            console.log(error)
          })
        }
        return(<Button onClick={handleDelete} startIcon={<DeleteIcon color={'error'}/>} color={'error'}>删除</Button>)
      },
    },
  ];




  return (
    <>
      <Box sx={{ height: 550, width: '100%', m: 0 }}>
        <EditToolbar setRowModesModel={setRowModesModel} setRows={setRows} rows={rows}/>
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
          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          // slots={{
          //   toolbar: EditToolbar,
          // }}
          onRowEditStop={params => {
            const data = {...params.row}
            request.post('/problem/update', data).then(value => {
              console.log(value.data)
            })
          }}
          // slotProps={{
          //   toolbar: { setRows, setRowModesModel, rows },
          // }}
        />
      </Box>
    </>
  );
}

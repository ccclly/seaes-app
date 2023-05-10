import { DataGrid, GridToolbarContainer, zhCN } from '@mui/x-data-grid';
import {
  Box,
  Button, FormControl,
  InputLabel, MenuItem,
  Modal, Select,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import request from '@/Util/request';

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
    field: 'name',
    headerName: '准入名称',
    width: 240,
  },
  {
    field: 'examId',
    headerName: '考试名称',
    width: 200,
    valueGetter: (param) => {
      return param.row.name
    },
  },
  {
    field: 'examScore',
    headerName: '通过分数',
    width: 140,
  },
  {
    field: 'courseId',
    headerName: '课程名称',
    width: 200,
    valueGetter: (param) => {
      return param.row.name
    },
  },
  {
    field: 'courseScore',
    headerName: '通过分数',
    width: 140,
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
  const { create, handleDelete } = props;

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon/>} onClick={create}>
        新建准入
      </Button>
      <Button color={'error'} startIcon={<DeleteOutlineIcon/>} onClick={handleDelete}>
        删除准入
      </Button>
    </GridToolbarContainer>
  );
}

export default function () {
  const [rows, setRows] = useState([]);
  const [exam, setExam] = useState([]);
  const [course, setCourse] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState('');
  const [examId, setExamId] = useState(null);
  const [examScore, setExamScore] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [courseScore, setCourseScore] = useState(null);

  useEffect(() => {
    request.get('/enter-permit/list').then(value => {
      console.log(value.data)
      setRows(value.data)
    })
    request.get('/exam/list').then(value => {
      setExam(value.data)
    })
    request.get('/course/list').then(value => {
      setCourse(value.data)
    })
  }, []);


  function handleCreate (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get('name'),
      examId: examId,
      examScore: examScore,
      courseId: courseId,
      courseScore: courseScore,
      id: id
    };
    request.post('/enter-permit/save', body).then(value => {
      setRows(value.data)
      setOpen(false)
    })
  }

  const create = () => {
    setTitle('');
    setExamId(null);
    setExamScore(null);
    setCourseId(null);
    setCourseScore(null)
    setId(null)
    setOpen(true)
  }
  const handleDelete = () => {
    selected.forEach(value => {
      request.post('/enter-permit/delete/'+ value).then(value1 => setRows(value1.data))
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
            创建/更新准入
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
              label={'准入实验室名称'}
              id={'name'}
              name="name"
              size={'small'}
              sx={{ width: 300 }}
              defaultValue={title}
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label">选择考试</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={examId}
                label={'选择考试'}
                onChange={event => setExamId(event.target.value)}
                size={'small'}
                name={'repositoryId'}
              >
                {exam.map(value => (
                  <MenuItem key={value.id}
                            value={value.id}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={'通过正确率'}
              id={'score'}
              name="score"
              size={'small'}
              sx={{ width: 300 }}
              defaultValue={examScore}
              onChange={ev => setExamScore(ev.target.value)}
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label">选择课程</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courseId}
                label={'选择课程'}
                onChange={event => setCourseId(event.target.value)}
                size={'small'}
                name={'repositoryId'}
              >
                {course.map(value => (
                  <MenuItem key={value.id}
                            value={value.id}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={'通过进度'}
              id={'courseScore'}
              name="courseScore"
              size={'small'}
              sx={{ width: 300 }}
              defaultValue={courseScore}
              onChange={ev => setCourseScore(ev.target.value)}
            />
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
            console.log(exam)
            setTitle(params.row.name)
            setExamId(params.row.examId);
            setExamScore(params.row.examScore);
            setCourseId(params.row.courseId);
            setCourseScore(params.row.courseScore)
            setId(params.row.id)
            setOpen(true)
          }}
          onRowSelectionModelChange={(par, a) => {
            setSelected(par)
          }}
          slotProps={{
            toolbar: { create, handleDelete },
          }}
        />
      </Box>
    </>
  )
}

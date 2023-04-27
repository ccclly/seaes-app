import { Box, Button, List, ListItem, Modal, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/zh-cn';


import { useEffect, useState } from 'react';
// import {TimeField, zhCN} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import request from "@/Util/request";
import { Save } from "@mui/icons-material";
import { DataGrid, zhCN, GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const columns1 = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'name',
    headerName: '用户名',
    width: 120,
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
    width: 180,
    editable: true,
  },
  {
    field: 'major',
    headerName: '班级',
    sortable: false,
    width: 160,
  },
  {
    field: 'score',
    headerName: '分数',
    sortable: false,
    width: 100,
  },

];

const columns2 = [
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
]

export default function () {

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [id, setId] = useState(0);
  const [list, setList] = useState([])
  const [user, setUser] = useState([])
  const [problem, setProblem] = useState([])
  const [selectionModel, setSelectionModel] = useState(() =>
    user.filter((r) => r.selected == 1).map((r) => r.id),
  );
  const [selectionPModel, setSelectionPModel] = useState(() =>
    problem.filter((r) => r.selected == 1).map((r) => r.id),
  );
  const [selectedRows, setSelectedRows] = useState(null);

  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    request.post('/exam/save', {
      name: data.get('name')
    }).then(value => {
      setList(value.data)
    })
    setOpen(false)
  }
  const selectUser = (event) => {
    event.preventDefault();

  }
  const selectProblem = (event) => {
    event.preventDefault();

  }
  useEffect(() => {
    request.get('/exam/list').then(value => {
      setList(value.data)
    })

  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
            <Button type={"submit"} variant={"contained"}>创建</Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={open1} onClose={() => setOpen1(false)}>
        <Box sx={{ ...style, height: 500, width: '100%', maxWidth:900 }}>
          <DataGrid
            columns={columns1}
            rows={user}
            localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={(e) => {
              console.log(e)
              setSelectionModel(e);
              const selectedIDs = new Set(e);
              const selectedRows = user.filter((r) => selectedIDs.has(r.id));
              setSelectedRows(selectedIDs);
              console.log(selectedRows)
            }}
            sx={{
              width: 800
            }}
          />
          <Button onClick={ev => {
            const data = user.map(val => {
              if(selectedRows.has(val.id)){
                val.selected = 1
              }else{
                val.selected = 0
              }
              return val
            })
            // console.log(data)
            request.post('/user-exam/update/' + id, data).then(value => {
              console.log(value.data)
              setOpen1(false)
            })
          }}>确定</Button>
        </Box>
      </Modal>
      <Modal open={open2} onClose={() => setOpen2(false)}>
        <Box sx={{ ...style, height: 500, width: '100%', maxWidth: 900 }}>
          <DataGrid
            columns={columns2}
            rows={problem}
            localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
            checkboxSelection
            selectionModel={selectionPModel}
            onSelectionModelChange={(e) => {
              setSelectionPModel(e);
              const selectedIDs = new Set(e);
              const selectedRows = problem.filter((r) => selectedIDs.has(r.id));
              setSelectedRows(selectedIDs);
              console.log(selectedRows)
            }}
            sx={{
              width: 800
            }}
          />
          <Button onClick={ev => {
            const data = problem.map(val => {
              if (selectedRows.has(val.id)) {
                val.selected = 1
              } else {
                val.selected = 0
              }
              return val
            })
            console.log(data)
            request.post('/exam-problem/update/'+id, data).then(value => {
              console.log(value.data)
              setOpen2(false)
            })
          }}>确定</Button>
        </Box>
      </Modal>
      <Button
        onClick={event => {
          setOpen(true)
        }}
      >
        创建考试
      </Button>
      <List>
        {list.map((val, index) => (
          <ListItem key={index}>
            {val.name}
            <Button onClick={ev => {
              setOpen1(true)
              setId(val.id)
              request.get('/user/list_exam/' + val.id).then(value => {
                const t = value.data.map((val1) => {
                  if (val1.selected == 0)
                    val1.isSelected = false;
                  else val1.isSelected = true;
                  return val1
                }
                );
                setSelectionModel(() =>
                  value.data.filter((r) => r.selected == 1).map((r) => r.id))
                setUser(t)
                // console.log(value.data)
              })
            }}>选择用户</Button>
            <Button onClick={ev => {
              setOpen2(true)
              setId(val.id)
              request.get('/problem/list_exam/'+val.id).then(value => {
                const t = value.data.map(val1 => {
                  if (val1.selected == 0)
                    val1.isSelected = false;
                  else val1.isSelected = true;
                  return val1
                }
                )
                setSelectionPModel(() =>
                  value.data.filter((r) => r.selected == 1).map((r) => r.id))
                setProblem(t)
              })
            }}>选择题目</Button>
          </ListItem>
        ))}
      </List>
    </>
  )
};

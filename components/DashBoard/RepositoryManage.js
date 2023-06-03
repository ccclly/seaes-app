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
  Button,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Checkbox,
  ToggleButtonGroup,
  ToggleButton,
  FormLabel,
  FormGroup,
  Select, MenuItem, InputLabel, FormControl, List, ListItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import request from '@/Util/request';
import { error } from 'next/dist/build/output/log';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileUpload from '@/components/FileUpload';
import { Add } from '@mui/icons-material';

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
  const { createQuestion, handleDelete } = props;

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon/>} onClick={createQuestion}>
        新建题目
      </Button>
      <Button color={'error'} startIcon={<DeleteOutlineIcon/>} onClick={handleDelete}>
        删除题目
      </Button>
    </GridToolbarContainer>
  );
}

// function EditToolbar (props) {
//   const { setRows, setRowModesModel, rows } = props;
//   const [open, setOpen] = useState(false);
//   const [type, setType] = useState('0');
//
//   const handleClick = () => {
//     setOpen(true);
//     // const id = rows.length + 1;
//     // setRows((oldRows) => [...oldRows, { id, isNew: true }]);
//     // setRowModesModel((oldModel) => ({
//     //   ...oldModel,
//     //   [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//     // }));
//   };
//
//   const handleCreate = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log(data.get('name'))
//     console.log(data.get('choiceA'))
//     console.log(data.get('choiceB'))
//     console.log(data.get('choiceC'))
//     console.log(data.get('choiceD'))
//     console.log(data.get('A'))
//     console.log(data.get('B'))
//     console.log(data.get('C'))
//     console.log(data.get('D'))
//     console.log(data.get('true'))
//     console.log(data.get('false'))
//     console.log(data.get('analysis'))
//     const body = {
//       name: data.get('name'),
//       type: Number(type),
//       choiceA: type == 2 ? '正确' : data.get('choiceA'),
//       choiceB: type == 2 ?'错误' : data.get('choiceB'),
//       choiceC: data.get('choiceC'),
//       choiceD: data.get('choiceD'),
//       choiceAIsTrue: type == 2 ? !!data.get('true') : !!data.get('A'),
//       choiceBIsTrue: type == 2 ? !!data.get('false') : !!data.get('B'),
//       choiceCIsTrue: !!data.get('C'),
//       choiceDIsTrue: !!data.get('D'),
//       analysisDesc: data.get('analysis')
//     }
//     request.post('/problem/save', body).then(value => {
//       setRows(value.data);
//       setOpen(false);
//     })
//   };
//
//   const choices = () => (<><TextField
//     label={'选项A'}
//     name={'choiceA'}
//     size={'small'}
//     sx={{ width: 300 }}
//   />
//     <TextField
//       label={'选项B'}
//       name={'choiceB'}
//       size={'small'}
//       sx={{ width: 300 }}
//     />
//     <TextField
//       label={'选项C'}
//       name={'choiceC'}
//       size={'small'}
//       sx={{ width: 300 }}
//     />
//     <TextField
//       label={'选项D'}
//       name={'choiceD'}
//       size={'small'}
//       sx={{ width: 300 }}
//     /></>);
//
//   const fn = () => {
//     if (type == 0) {
//       return (
//         <>
//           {choices()}
//           <FormLabel id="demo-radio-buttons-group-label">正确答案：</FormLabel>
//           <RadioGroup
//             aria-labelledby="demo-radio-buttons-group-label"
//             name="choices"
//             row
//           >
//             <FormControlLabel value="A" name={'A'} control={<Radio/>} label="A"/>
//             <FormControlLabel value="B" name={'B'} control={<Radio/>} label="B"/>
//             <FormControlLabel value="C" name={'C'} control={<Radio/>} label="C"/>
//             <FormControlLabel value="D" name={'D'} control={<Radio/>} label="D"/>
//           </RadioGroup>
//         </>
//       );
//     } else if (type == 1) {
//       return (
//         <>
//           {choices()}
//           <FormLabel id="demo-radio-buttons-group-label">正确答案：</FormLabel>
//           <FormGroup row>
//             <FormControlLabel
//               control={
//                 <Checkbox name="A"/>
//               }
//               label="A"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox name="B"/>
//               }
//               label="B"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox name="C"/>
//               }
//               label="C"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox name="D"/>
//               }
//               label='D'
//             />
//           </FormGroup>
//         </>
//       );
//     }else if (type == 2) {
//       return (<>
//         <RadioGroup
//           aria-labelledby="demo-radio-buttons-group-label"
//           name="judge"
//           row
//         >
//           <FormControlLabel value="true" name={'true'} control={<Radio/>} label="正确"/>
//           <FormControlLabel value="false" name={'false'} control={<Radio/>} label="错误"/>
//         </RadioGroup>
//       </>)
//     }
//   };
//
//   return (
//     <Box>

//     </Box>
//   );
// }
//
// EditToolbar.propTypes = {
//   setRowModesModel: PropTypes.func.isRequired,
//   setRows: PropTypes.func.isRequired,
//   rows: PropTypes.array.isRequired,
// };

export default function () {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [type, setType] = useState('0');
  const [name, setName] = useState(null);
  const [repository, setRepository] = useState([]);
  const [repositoryId, setRepositoryId] = useState('');
  const [id, setId] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [fileName, setFileName] = useState(null);
  const [ansList, setAnsList] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    request.get('/question/list').then(value => {
      setRows(value.data);
    });
    request.get('/repository/list').then(value => {
      setRepository(value.data);
    });
  }, []);

  const createQuestion = (e) => {
    setName('');
    setType('');
    setRepositoryId('');
    setAnalysis('');
    setFileName('');
    setId(null);
    setOpen(true);
  };

  const handleDelete = () => {
    selected.forEach(value => {
      request.post('/question/delete/' + value).then(value1 => setRows(value1.data))
    })
  }

  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('name'));
    console.log(data.get('analysis'));
    const body = {
      name: data.get('name'),
      imgName: fileName,
      type: Number(type),
      analysisDesc: data.get('analysis'),
      repositoryId: repositoryId,
      id: id,
    };
    console.log(body);
    request.post('/question/save', body).then(value => {
      setRows(value.data);
      setOpen(false);
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'name',
      headerName: '题目名称',
      width: 620,
    },
    {
      field: 'type',
      headerName: '类型',
      valueGetter: (param) => {
        if (param.row.type == 0) {
          return '单选题';
        } else if (param.row.type == 1) {
          return '多选题';
        } else if (param.row.type == 2) {
          return '判断题';
        }
      },
      width: 90,
    },
    {
      field: 'repositoryId',
      headerName: '归属题库',
      valueGetter: (param => {
        let v = null;
        repository.forEach(value => {
          if (value.id === param.row.repositoryId) v = value.title;
        });
        return v;
      }),
      width: 200,
    },
    {
      field: 'actions',
      headerName: '添加选项',
      type: 'actions',
      renderCell: (params) => {
        const handleAdd = () => {
          request.get('/question-answer/list/' + params.row.id).then(value => {
            setAnsList(value.data);
            setId(params.row.id);
            setOpen1(true);
          });

        };
        return <Button variant={'contained'} onClick={handleAdd}>添加</Button>;
      },
    },
    {
      field: 'analysisDesc',
      headerName: '解析',
      width: 300,
    },
  ];

  return (
    <>
      <Modal open={open1} onClose={() => setOpen1(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            添加选项
          </Typography>
          <Button startIcon={<Add/>} onClick={event => {
            setAnsList(prevState => [...prevState, { name: '', isRight: false}]);
          }} variant={'contained'} size={'small'}>添加</Button>
          <List>
            {ansList.map((value, index) => {
              return (
                <ListItem key={index}>
                  <TextField
                    defaultValue={value.name}
                    label={'答案内容'}
                    size={'small'}
                    onChange={event => {
                      setAnsList(prevState => {
                        const n = [...prevState];
                        n[index].name = event.target.value;
                        return n;
                      });
                    }}
                  />
                  <FormControlLabel control={<Checkbox defaultChecked={value.isRight}/>}
                                    label="是否答案"
                                    onChange={(event, checked) => {
                                      setAnsList(prevState => {
                                        const n = [...prevState];
                                        n[index].isRight = checked;
                                        return n;
                                      });
                                    }}
                  />
                  {/*<FileUpload />*/}
                  <Button variant={'contained'} startIcon={<DeleteIcon/>}
                          onClick={event => {
                            setAnsList(prevState => {
                              const n = [...prevState]
                              return n.filter((value1, index1) => {
                                if (index != index1){
                                  return true
                                }else {
                                  if (value1.id)
                                    request.post('/question-answer/delete/' + value1.id).then(value2 => {
                                      console.log(value2.data)
                                    })
                                  return false
                                }
                              })
                            })
                          }}
                          color={'error'}
                  >删除</Button>
                </ListItem>
              );
            })}
          </List>
          <Button sx={{
            position: 'absolute',
            bottom: '20px',
          }} variant={'contained'} onClick={event => {
            setAnsList(prevState => {
              const n = [...prevState];
              return n.map(value => {
                value.questionId = id;
                return value;
              });
            });
            console.log(ansList);
            request.post('/question-answer/save', ansList).then(value => {
              console.log(value.data)
            })
            setOpen1(false)
          }}>提交</Button>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            创建/更新题目
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
              maxRows={3}
              defaultValue={name}
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
            <FormControl>
              <InputLabel id="demo-simple-select-label">归属题库</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={repositoryId}
                label={'归属题库'}
                onChange={event => setRepositoryId(event.target.value)}
                size={'small'}
                name={'repositoryId'}
              >
                {repository.map(value => (
                  <MenuItem key={value.id}
                            value={value.id}>{value.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={'解析'}
              id={'analysis'}
              name={'analysis'}
              size={'small'}
              sx={{ width: 300 }}
              defaultValue={analysis}
              onChange={event => setAnalysis(event.target.value)}
            />
            <FileUpload setName={setFileName} name={fileName}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // sx={{ mt: 3, mb: 2 }}
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

          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          checkboxSelection={true}
          slots={{
            toolbar: EditToolbar,
          }}
          onCellDoubleClick={params => {
            console.log(params.row);
            setName(params.row.name);
            setAnalysis(params.row.analysisDesc);
            setRepositoryId(params.row.repositoryId);
            setId(params.row.id);
            setType(params.row.type);
            setOpen(true);
          }}
          onRowSelectionModelChange={(par, a) => {
            setSelected(par)
          }}
          slotProps={{
            toolbar: { createQuestion, handleDelete },
          }}
        />
      </Box>
    </>
  );
}

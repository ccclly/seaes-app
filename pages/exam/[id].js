import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import {
  Box,
  Checkbox,
  checkboxClasses,
  Container,
  FormControl,
  Sheet, Typography,
  Button, Card, CircularProgress, LinearProgress,
} from '@mui/joy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { FormGroup } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRouter } from 'next/router';
import request1 from '@/Util/request1';
import Link from 'next/link';
import ExamCountdown from '@/components/ExamCountDown';

const SCQuestions = ({ state, setState, index, data, finish, fillAns }) => {
  let defaultV = null
  data.paperQAS.forEach(value => {
    if (value.checked) {defaultV = value.answerId}
  })
  return (<>
    <RadioGroup
      // defaultValue="Individual"
      // value={state[index]}
      onChange={event => {
        console.log(event.target.value)
        fillAns(data.id, [event.target.value])
        // !finish&&setState(new Map(state).set(index, event.target.value));
      }
      }
      defaultValue={defaultV}
    >
      <List
        sx={{
          minWidth: 240,
          '--List-gap': '0.5rem',
          '--ListItem-paddingY': '1rem',
          '--ListItem-radius': '8px',
          '--ListItemDecorator-size': '32px',
        }}
      >
        <Typography>
          {index + 1 + '. ' + data.desc}
        </Typography>
        {data.choice.map((item, index) => !!item && (
          <ListItem
            variant="outlined"
            key={item.id}
            sx={{ boxShadow: '', bgcolor: 'background.body' }}
          >
            <Typography sx={{
              fontFamily: 'var(--myfont-font)',
            }}>
              {['A.', 'B.', 'C.', 'D.'][index]}
            </Typography>
            <Radio
              overlay
              value={item.id}
              label={item.name}
              disabled={finish}

              sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: (theme) => {
                    let obj = {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500]
                    }
                    if (checked&&!finish) return obj;
                    else if ((checked&&finish&&data.choiceIsTrue[index])||(!checked&&finish&&data.choiceIsTrue[index])){
                      obj.borderColor = '#357a38';
                      return obj;
                    }else if (checked&&finish&&!data.choiceIsTrue[index]){
                      obj.borderColor ='#aa2e25';
                      return obj;
                    }
                    // return ({
                    //   borderColor: (finish && data.choiceIsTrue[index]) && '#357a38',
                    //   ...((checked) && {
                    //     inset: -1,
                    //     border: '2px solid',
                    //     borderColor: (finish && !data.choiceIsTrue[index]) ? '#aa2e25' : theme.vars.palette.primary[500],
                    //   }),
                    // });
                  },
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
    </RadioGroup>
    {
      finish&&<Box>
        <Typography>
          正确答案：{data.choiceIsTrue[0]&&'A'} {data.choiceIsTrue[1]&&'B'} {data.choiceIsTrue[2]&&'C'} {data.choiceIsTrue[3]&&'D'}
        </Typography>
        <Typography>
          解析： {data.analysisDesc}
        </Typography>
      </Box>
    }
  </>);
};
const MCQuestions = ({ state, setState, index: p_index, data, finish, fillAns }) => {
  const [group, setGroup] = useState(new Set());

  return (<>
    <FormGroup
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        '& > div': {
          p: 2,
          boxShadow: 'sm',
          borderRadius: 'xs',
          display: 'flex',
        },
      }}
    >
      <Typography>
        {p_index + 1 + '. ' + data.desc}
      </Typography>
      {data.choice.map((value, index) => (
        <Sheet key={index} variant="outlined"
               sx={{ bgcolor: 'background.body' }}>
          <Typography sx={{
            mr:1,
            lineHeight: 1.1,
            fontFamily: 'var(--myfont-font)',
          }}>{['A.', 'B.', 'C.', 'D.'][index]}</Typography>
          <Checkbox
            label={value.name}
            overlay
            disabled={finish}
            // Force the outline to appear in the demo. Usually, you don't need this in your project.
            slotProps={{
              // action: { className: checkboxClasses.focusVisible }
              action: ({ checked }) => ({
                sx: (theme) => {
                  let obj = {
                    inset: -1,
                    border: '2px solid',
                    borderColor: theme.vars.palette.primary[500]
                  }
                  if (checked&&!finish) return obj;
                  else if ((checked&&finish&&data.choiceIsTrue[index])||(!checked&&finish&&data.choiceIsTrue[index])){
                    obj.borderColor = '#357a38';
                    return obj;
                  }else if (checked&&finish&&!data.choiceIsTrue[index]){
                    obj.borderColor ='#aa2e25';
                    return obj;
                  }
                },
              }),
            }}
            checked={group[index]}
            defaultChecked={data.paperQAS[index].checked}
            onChange={event => {
              if (!finish) {
                setGroup(prevState => {
                  let n = new Set(prevState);
                  if (prevState.has(data.choice[index].id))
                    n.delete(data.choice[index].id)
                  else
                    n.add(data.choice[index].id);
                  fillAns(data.id, [...n])
                  return n;
                })
                // setGroup(new Map(group).set(index, event.target.checked));
                // setState(new Map(state).set(p_index,
                //   new Map(group).set(index, event.target.checked)));
              }
            }}
          />
        </Sheet>

      ))}
    </FormGroup>
  </>);
};
const TOFQuestions = ({ state, setState, index, data, finish, fillAns }) => {

  let defaultV = null
  data.paperQAS.forEach(value => {
    if (value.checked) {defaultV = value.answerId}
  })
  return (
    <RadioGroup aria-label="Your plan" name="people"
                onChange={event => {
                  // !finish&&setState(
                  //   new Map(state).set(index, (event.target.value === '正确' ? 'A' : 'B')));
                  fillAns(data.id, [event.target.value])
                }}
                disabled={finish}
                defaultValue={defaultV}
    >
      <List
        sx={{
          minWidth: 240,
          '--List-gap': '0.5rem',
          '--ListItem-paddingY': '1rem',
          '--ListItem-radius': '8px',
          '--ListItemDecorator-size': '32px',
        }}
      >
        <Typography>
          {index + 1 + '. ' + data.desc}
        </Typography>
        {data.choice.map((item, index) => (
          <ListItem
            variant="outlined"
            key={item.name}
            sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}
          >
            <Radio
              overlay
              value={item.id}
              disabled={finish}

              label={item.name}
              sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: (theme) => {
                    let obj = {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500]
                    }
                    if (checked&&!finish) return obj;
                    else if ((checked&&finish&&data.choiceIsTrue[index])||(!checked&&finish&&data.choiceIsTrue[index])){
                      obj.borderColor = '#357a38';
                      return obj;
                    }else if (checked&&finish&&!data.choiceIsTrue[index]){
                      obj.borderColor ='#aa2e25';
                      return obj;
                    }
                  },
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
    </RadioGroup>
  );
};

export default function () {
  const router = useRouter();
  const { id } = router.query;
  const [finish, setFinish] = useState(false);
  const [qList, setQList] = useState([]);
  const [paperId, setPaperId] = useState(0);
  const [paper, setPaper] = useState(null);
  const [score, setScore] = useState(null);
  const [exam, setExam] = useState(null);

  const fillAns = (quId, ansId) => {
    request1.post('/paper/fill-answer', {
      paperId: paperId,
      questionId: quId,
      ansIds: ansId
    }).then(value => console.log(value.data))
  }

  useEffect(() => {
    if (!!id) {
      const url = '/paper/create';
      const info = JSON.parse(localStorage.getItem('loginInfo'))
      request1.post(url, {
        userId: info.id,
        examId: id
      }).then(value => {
        console.log(value.data);
        setPaperId(value.data.paper.id)
        setExam(value.data.exam)
        setPaper(value.data.paper)
        console.log(value.data.paper)
        console.log(value.data.paper.createAt)
        const data = value.data.quList.map((val, index) => {
          const t = {};
          t.desc = val.name;
          const s = value.data.paperQAs[index].map(val => val.answerId)
          t.choice = value.data.quansList[index].sort((a,b)=>{
            return s.indexOf(a.id) - s.indexOf(b.id)
          })
          // t.choice = value.data.quansList[index];
          t.paperQAS = value.data.paperQAs[index]
          t.choiceIsTrue =[
            value.data.paperQAs[index][0].isRight,
            value.data.paperQAs[index][1].isRight,
            value.data.paperQAs[index][2]?.isRight,
            value.data.paperQAs[index][3]?.isRight,
          ];
          t.analysisDesc = val.analysisDesc
          t.type = val.type;
          t.id = val.id;
          return t;
        });
        console.log(data);
        setQList(data);
      });
    }

  }, [id]);


  const [state, setState] = useState(new Map());
  useEffect(() => {
    return () => {

    };
  }, [state]);

  const handleSubmit = (ev) => {
    setFinish(true);
    request1('/paper/submit/' + paperId).then(value => {
      console.log(value.data)
      setScore(value.data)
    })
    // const data = qList.map((value, index) => {
    //   let obj = {
    //     choiceAIsTrue: false,
    //     choiceBIsTrue: false,
    //     choiceCIsTrue: false,
    //     choiceDIsTrue: false,
    //   };
    //   if (typeof state.get(index) == 'string') {
    //     switch (state.get(index)) {
    //       case 'A':
    //         obj.choiceAIsTrue = true;
    //         break;
    //       case 'B':
    //         obj.choiceBIsTrue = true;
    //         break;
    //       case 'C':
    //         obj.choiceCIsTrue = true;
    //         break;
    //       case 'D':
    //         obj.choiceDIsTrue = true;
    //         break;
    //     }
    //   } else {
    //     const m = state.get(index);
    //     if (m.get(0)) obj.choiceAIsTrue = true;
    //     if (m.get(1)) obj.choiceBIsTrue = true;
    //     if (m.get(2)) obj.choiceCIsTrue = true;
    //     if (m.get(3)) obj.choiceDIsTrue = true;
    //   }
    //   obj.examId = id;
    //   obj.problemId = value.id;
    //   return obj;
    // });
    // console.log(data);
    // request1.post('/user-exam-option/save', data).then(value => {
    //   console.log(value.data);
    //   setFinish(true);
    // });

  };

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <Container>
          <Box
            sx={{
              '.css-1bb01ub-JoyRadio-root.Joy-disabled, .css-1xxdwh2-JoyCheckbox-root.Joy-disabled, ': { color: '#25252d' },
              '.css-1wtx7bg-JoyRadio-root.Joy-disabled': { color: '#25252d' },
              '.css-1axruhw-JoyCheckbox-root.Joy-disabled': { color: '#25252d' },
              '.css-dzmv7r-JoyRadio-radio.Joy-disabled': { color: '#3990FF' },
              mt: 3,
            }}
          >
            {exam&&(<><Typography
              sx={{
                fontFamily: 'var(--myfont-font)',
                fontSize: 25
              }}
            >
              {exam.name}
            </Typography>
              <Typography>
                题目数量：{exam.count}
              </Typography>
              <Typography>
                考试时长：{exam.totalTime}
              </Typography>
              <Typography>
                {console.log(paper.createAt)}
                {paper!=null&&<ExamCountdown rstartTime={paper.createAt}
                                examDuration={exam.totalTime}/>}
              </Typography>
            </>)
            }
            {qList.length <= 0 && <CircularProgress sx={{
              position: 'fix',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 200,
            }}/>}
            {qList.map((value, index) => {
              if (value.type == 0) {
                return <SCQuestions finish={finish} key={index} index={index}
                                    state={state}
                                    setState={setState} data={qList[index]}
                                    fillAns={fillAns}/>;
              } else if (value.type == 1) {
                return <MCQuestions finish={finish} key={index} index={index}
                                    state={state}
                                    setState={setState} fillAns={fillAns}
                                    data={qList[index]}/>;
              } else {
                return <TOFQuestions finish={finish} key={index} index={index}
                                     state={state} setState={setState}
                                     data={qList[index]} fillAns={fillAns}/>;
              }
            })}
            {(qList.length > 0 && !finish) && <Button sx={{
              width: '100%',
              mt: 3,
              mb: 3,
            }} onClick={handleSubmit}>提交</Button>}
            {finish && (
              <Card variant="outlined" sx={{
                maxWidth: 400,
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
                <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>
                  您的正确率为：
                </Typography>
                <Typography level="h1" color={'primary'}>{score *
                  100}%</Typography>
              </Card>
            )}
            {finish &&
              <Link href={'/exam'}>
                <Button
                  sx={{
                    width: '100%',
                    mt: 3,
                    mb: 3,
                  }}
                >
                  返回
                </Button>
              </Link>}
          </Box>
        </Container>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}

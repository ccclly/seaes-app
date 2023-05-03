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
  Button
} from '@mui/joy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { FormGroup } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRouter } from 'next/router';
import request1 from '@/Util/request1';

const SCQuestions = ({ state, setState, index, data, finish }) => {
  return (<>
    <RadioGroup
      // defaultValue="Individual"
      // value={state[index]}
      onChange={event => {
        !finish&&setState(new Map(state).set(index, event.target.value));
      }
      }
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
            key={item.name}
            sx={{ boxShadow: '', bgcolor: 'background.body' }}
          >
            <ListItemDecorator>
              {['A', 'B', 'C', 'D'][index]}
            </ListItemDecorator>
            <Radio
              overlay
              value={item.name}
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
const MCQuestions = ({ state, setState, index: p_index, data, finish }) => {
  const [group, setGroup] = useState(new Map());

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
          {['A', 'B', 'C', 'D '][index]}
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
            onChange={event => {
              if (!finish) {
                setGroup(new Map(group).set(index, event.target.checked));
                setState(new Map(state).set(p_index,
                  new Map(group).set(index, event.target.checked)));
              }
            }}
          />
        </Sheet>

      ))}
    </FormGroup>
  </>);
};
const TOFQuestions = ({ state, setState, index, data, finish }) => {

  return (
    <RadioGroup aria-label="Your plan" name="people"
                onChange={event => {
                  !finish&&setState(
                    new Map(state).set(index, (event.target.value === '正确' ? 'A' : 'B')));
                }}
                disabled={finish}
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
            <ListItemDecorator>

              {[
                <CheckCircleOutlineIcon/>,
                <HighlightOffIcon/>][index]}
            </ListItemDecorator>
            <Radio
              overlay
              value={item.name}
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
  useEffect(() => {
    if (!!id) {
      const url = '/paper/create';
      const info = JSON.parse(localStorage.getItem('loginInfo'))
      request1.post(url, {
        userId: info.id,
        examId: id
      }).then(value => {
        console.log(value.data);
        const data = value.data.quList.map((val, index) => {
          const t = {};
          t.desc = val.name;
          t.choice = value.data.quansList[index];
          t.choiceIsTrue =[
            val.choiceAIsTrue,
            val.choiceBIsTrue,
            val.choiceCIsTrue,
            val.choiceDIsTrue,
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
  // const qList = [
  //   {
  //     type: 0,
  //     desc: '当打开房门闻到燃气气味时，首先应迅速（   ），以防止引起火灾。',
  //     choice: ['打开燃气灶具查找漏气部位', '打开门窗通风 ', '拨打119向消防队报警'],
  //   },
  //   {
  //     type: 0,
  //     desc: '当打开房门闻到燃气气味时，首先应迅速（   ），以防止引起火灾。',
  //     choice: ['打开燃气灶具查找漏气部位', '打开门窗通风 ', '拨打119向消防队报警'],
  //   },
  //   {
  //     type: 1,
  //     desc: '下列说法有错的有：',
  //     choice: ['保险丝越粗越好 ', '在人多的地方放鞭炮 ', '自家的液化气残液可以自己倒掉', '蚊香应尽量远离可燃物体'],
  //   },
  //   {
  //     type: 1,
  //     desc: '高层建筑火灾的特点有哪些？',
  //     choice: [
  //       '火势蔓延快，途径多。高层建筑内电梯井，各种管道井比较多，发生火灾能很快形成“烟囱效应”，造成火灾扩大蔓延',
  //       '人员疏散困难，伤亡严重。由于高层建筑比较高，火灾时，人员要安全撤离建筑物，需要较长的时间，再加上火灾时，人员极度恐慌，造成疏散困难。据国外报道，高层建筑一次火灾死亡上百人的事故时有发生',
  //       '火灾扑救困难。由于高层建筑比较高，发生火灾后，消防车很难达到，只能靠内部的消防设施扑救。目前消防云梯只能在50米左右，而高层建筑有的竟达200多米，火灾扑救相当困难',
  //       '易燃合成材料多，燃烧猛烈。为了减轻结构自重，方便建筑'],
  //   },
  //   {
  //     type: 2,
  //     desc: '高速离心机的转头不能超过其额定转速使用。：',
  //     choice: [],
  //   },
  //   {
  //     type: 2,
  //     desc: '高速离心机的转头不能超过其额定转速使用。：',
  //     choice: [],
  //   },
  // ];

  const [state, setState] = useState(new Map());
  useEffect(() => {
    return () => {

    };
  }, [state]);

  const handleSubmit = (ev) => {
    const data = qList.map((value, index) => {
      let obj = {
        choiceAIsTrue: false,
        choiceBIsTrue: false,
        choiceCIsTrue: false,
        choiceDIsTrue: false,
      };
      if (typeof state.get(index) == 'string') {
        switch (state.get(index)) {
          case 'A':
            obj.choiceAIsTrue = true;
            break;
          case 'B':
            obj.choiceBIsTrue = true;
            break;
          case 'C':
            obj.choiceCIsTrue = true;
            break;
          case 'D':
            obj.choiceDIsTrue = true;
            break;
        }
      } else {
        const m = state.get(index);
        if (m.get(0)) obj.choiceAIsTrue = true;
        if (m.get(1)) obj.choiceBIsTrue = true;
        if (m.get(2)) obj.choiceCIsTrue = true;
        if (m.get(3)) obj.choiceDIsTrue = true;
      }
      obj.examId = id;
      obj.problemId = value.id;
      return obj;
    });
    console.log(data);
    request1.post('/user-exam-option/save', data).then(value => {
      console.log(value.data);
      setFinish(true);
    });
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
            }}
          >
            {qList.map((value, index) => {
              if (value.type == 0) {
                return <SCQuestions finish={finish} key={index} index={index} state={state}
                                    setState={setState} data={qList[index]}/>;
              } else if (value.type == 1) {
                return <MCQuestions finish={finish} key={index} index={index} state={state}
                                    setState={setState}
                                    data={qList[index]}/>;
              } else {
                return <TOFQuestions finish={finish} key={index} index={index} state={state} setState={setState}
                                     data={qList[index]}/>;
              }
            })}
            {qList.length > 0 && <Button sx={{
              width: '100%',
              mt: 3,
              mb: 3
            }} onClick={handleSubmit}>提交</Button>}
          </Box>
        </Container>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}

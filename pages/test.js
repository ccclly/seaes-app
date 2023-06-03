
import { useRouter  } from 'next/router';
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
} from '@mui/joy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { FormGroup } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SCQuestions = ({ state, setState, index, data }) => {
  return (<>
    <RadioGroup
      // defaultValue="Individual"
      // value={state[index]}
      onChange={event => {
        setState(new Map(state).set(index, event.target.value));
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
          {data.desc}
        </Typography>
        {data.choice.map((item, index) => (
          <ListItem
            variant="outlined"
            key={item}
            sx={{ boxShadow: '', bgcolor: 'background.body' }}
          >
            <ListItemDecorator>
              {['A', 'B', 'C', 'D'][index]}
            </ListItemDecorator>
            <Radio
              overlay
              value={['A', 'B', 'C', 'D'][index]}
              label={item}
              sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
    </RadioGroup>
  </>);
};
const MCQuestions = ({ state, setState, index: p_index, data }) => {
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
        {data.desc}
      </Typography>
      {data.choice.map((value, index) => (
        <Sheet key={index} variant="outlined"
               sx={{ bgcolor: 'background.body' }}>
          <Checkbox
            label={value}
            overlay
            // Force the outline to appear in the demo. Usually, you don't need this in your project.
            slotProps={{
              // action: { className: checkboxClasses.focusVisible }
              action: ({ checked }) => ({
                sx: (theme) => ({
                  ...(checked && {
                    inset: -1,
                    border: '2px solid',
                    borderColor: theme.vars.palette.primary[500],
                  }),
                }),
              }),
            }}
            checked={group[index]}
            onChange={event => {
              setGroup(new Map(group).set(index, event.target.checked));
              setState(new Map(state).set(p_index,
                new Map(group).set(index, event.target.checked)));
            }}
          />
        </Sheet>

      ))}
    </FormGroup>
  </>);
};
const TOFQuestions = ({ state, setState, index, data }) => {

  return (
    <RadioGroup aria-label="Your plan" name="people"
                onChange={event => {
                  setState(
                    new Map(state).set(index, (event.target.value === '正确')));
                }}
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
          {data.desc}
        </Typography>
        {['正确', '错误'].map((item, index) => (
          <ListItem
            variant="outlined"
            key={item}
            sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}
          >
            <ListItemDecorator>
              {[
                <CheckCircleOutlineIcon/>,
                <HighlightOffIcon/>][index]}
            </ListItemDecorator>
            <Radio
              overlay
              value={item}
              label={item}
              sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                    }),
                  }),
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

  useEffect(() => {
    const exitingFunction = () => {
      console.log("exiting...");
    };

    router.events.on("routeChangeStart", exitingFunction);

    return () => {
      console.log("unmounting component...");
      router.events.off("routeChangeStart", exitingFunction);
    };
  }, []);
  const qList = [
    {
      type: 0,
      desc: '当打开房门闻到燃气气味时，首先应迅速（   ），以防止引起火灾。',
      choice: ['打开燃气灶具查找漏气部位', '打开门窗通风 ', '拨打119向消防队报警'],
    },
    {
      type: 0,
      desc: '当打开房门闻到燃气气味时，首先应迅速（   ），以防止引起火灾。',
      choice: ['打开燃气灶具查找漏气部位', '打开门窗通风 ', '拨打119向消防队报警'],
    },
    {
      type: 1,
      desc: '下列说法有错的有：',
      choice: ['保险丝越粗越好 ', '在人多的地方放鞭炮 ', '自家的液化气残液可以自己倒掉', '蚊香应尽量远离可燃物体'],
    },
    {
      type: 1,
      desc: '高层建筑火灾的特点有哪些？',
      choice: [
        '火势蔓延快，途径多。高层建筑内电梯井，各种管道井比较多，发生火灾能很快形成“烟囱效应”，造成火灾扩大蔓延',
        '人员疏散困难，伤亡严重。由于高层建筑比较高，火灾时，人员要安全撤离建筑物，需要较长的时间，再加上火灾时，人员极度恐慌，造成疏散困难。据国外报道，高层建筑一次火灾死亡上百人的事故时有发生',
        '火灾扑救困难。由于高层建筑比较高，发生火灾后，消防车很难达到，只能靠内部的消防设施扑救。目前消防云梯只能在50米左右，而高层建筑有的竟达200多米，火灾扑救相当困难',
        '易燃合成材料多，燃烧猛烈。为了减轻结构自重，方便建筑'],
    },
    {
      type: 2,
      desc: '高速离心机的转头不能超过其额定转速使用。：',
      choice: [],
    },
    {
      type: 2,
      desc: '高速离心机的转头不能超过其额定转速使用。：',
      choice: [],
    },
  ];

  const [state, setState] = useState(new Map());
  useEffect(() => {
    console.log(state)
    return () => {

    };
  }, [state]);

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <Container>
          <Box sx={{
            userSelect: 'none'
          }}>
            {qList.map((value, index) => {
              if (value.type == 0) {
                return <SCQuestions key={index} index={index} state={state}
                                    setState={setState} data={qList[index]}/>;
              }else if (value.type == 1) {
                return <MCQuestions key={index} index={index} state={state}
                                    setState={setState}
                                    data={qList[index]}/>;
              } else {
                return <TOFQuestions key={index} index={index} state={state} setState={setState}
                                     data={qList[index]}/>
              }
            })}
          </Box>
        </Container>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}

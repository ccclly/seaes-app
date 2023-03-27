import {
  Box,
  Container,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
} from '@mui/material';

export default function () {
  //1为单选，2为多选，3为判断，
  const testList = [
    {
      id: 1,
      name: '使用ABC类干粉灭火器可以扑灭以下哪几类火灾？',
      type: 1,
      optList: [
        '含碳固体火灾',
        '可燃液体火灾',
        '可燃气体火灾',
        '金属火灾',
      ],
      ansList: [
        1, 2, 3, 4,
      ],
    },
    {
      id: 2,
      name: '使用ABC类干粉灭火器可以扑灭以下哪几类火灾？',
      type: 1,
      optList: [
        '含碳固体火灾',
        '可燃液体火灾',
        '可燃气体火灾',
        '金属火灾',
      ],
      ansList: [
        1, 2, 3, 4,
      ],
    },
    {
      id: 2,
      name: '使用ABC类干粉灭火器可以扑灭以下哪几类火灾？',
      type: 1,
      optList: [
        '含碳固体火灾',
        '可燃液体火灾',
        '可燃气体火灾',
        '金属火灾',
      ],
      ansList: [
        1, 2, 3, 4,
      ],
    },
    // {
    //   id: 2,
    //   name: '当打开房门闻到燃气气味时，首先应迅速（   ），以防止引起火灾。',
    //   type: 0,
    //   optList: [
    //     '打开燃气灶具查找漏气部位',
    //     '打开门窗通风',
    //     '拨打119向消防队报警',
    //   ],
    //   ansList: [
    //     1
    //   ],
    // },
    // {
    //   id: 2,
    //   name: '当打开房门闻到燃气气味时，首先应迅速（   ），以防止引起火灾。',
    //   type: 0,
    //   optList: [
    //     '打开燃气灶具查找漏气部位',
    //     '打开门窗通风',
    //     '拨打119向消防队报警',
    //   ],
    //   ansList: [
    //     1
    //   ],
    // },
    // {
    //   id: 2,
    //   name: '当打开房门闻到燃气气味时，首先应迅速（   ），以防止引起火灾。',
    //   type: 0,
    //   optList: [
    //     '打开燃气灶具查找漏气部位',
    //     '打开门窗通风',
    //     '拨打119向消防队报警',
    //   ],
    //   ansList: [
    //     1
    //   ],
    // },
    // {
    //   id: 3,
    //   name: '高速离心机的转头不能超过其额定转速使用。',
    //   type: 3,
    //   optList: [
    //   ],
    //   ansList: [
    //     1
    //   ],
    // },
    // {
    //   id: 3,
    //   name: '高速离心机的转头不能超过其额定转速使用。',
    //   type: 3,
    //   optList: [
    //   ],
    //   ansList: [
    //     1
    //   ],
    // },
    // {
    //   id: 3,
    //   name: '高速离心机的转头不能超过其额定转速使用。',
    //   type: 3,
    //   optList: [
    //   ],
    //   ansList: [
    //     1
    //   ],
    // },
  ];
  return (
    <Container>
      <Paper sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: {md: 600},
        margin: '0 auto'
      }}>
        {testList.map((value, index) => (
          <Box key={index}>
            {index + 1 + '. '}{value.name}
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              {value.optList.map((value1, index) => (
                <FormControlLabel key={index} value={index} control={<Radio />} label={value1} />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </Paper>
    </Container>);
}

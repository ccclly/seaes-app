import {
  Breadcrumbs,
  Card,
  CardMedia,
  Container,
  Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  styled,
  Typography,
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Link from 'next/link';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }}/>}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function () {
  const name = '生物化学实验室安全',
    dec = '《生物实验室安全》是涉及生物学研究相关专业的实验室安全知识。本课程通过大量视频资料和案例分析，系统地介绍了生物实验室的安全隐患、安全防范措施以及事故发生时的应急处理措施，旨在提高实验人员的安全防范意识和应急处理能力，有效防范安全事故发生、降低安全事故危害。课程内容主要包括实验室基础安全知识、生物安全、微生物实验安全防控、分子生物学安全防控、化学品安全、废弃物安全等。\n';
  const curse = [
      {
        name: '绪论',
        list: [
          { name: '高校实验室概述', id: '1', degree: 12 },
          { name: '高校安全知识', id: '2', degree: 12 },
          { name: '高线安全隐患来袭', id: '3', degree: 12 },
        ],
      },{
        name: '用电安全',
        list: [
          { name: '高校实验室概述', id: '1', degree: 12 },
          { name: '高校安全知识', id: '2', degree: 12 },
          { name: '高线安全隐患来袭', id: '3', degree: 12 },
        ],
      },{
        name: '消防安全',
        list: [
          { name: '高校实验室概述', id: '1', degree: 12 },
          { name: '高校安全知识', id: '2', degree: 12 },
          { name: '高线安全隐患来袭', id: '3', degree: 12 },
        ],
      },
    ];
  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ padding: '20px 10px' }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{mb: 2}}>
          <Link underline="hover" color="inherit" href="/">
            主页
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href={'/learn'}
            aria-current="page"
          >
            安全课程
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href={''}
            aria-current="page"
          >
            {name}
          </Link>
        </Breadcrumbs>

        <Grid container>
          <Grid item xs={6} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <CardMedia
              component="img"
              image={'/image/01.jpg'}
              alt="Paella dish"
              sx={{
                width: 300,
                height: 240,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary"
                        noWrap={false} sx={{
              lineClamp: 2,
              boxOrient: 2,
              textOverflow: 'ellipsis',
            }}>
              {dec}
            </Typography>
          </Grid>
          <Grid item sx={{mt:3}} xs={12}>

          {curse.map((value, index) => (
            <Accordion key={index} sx={{width:'100%'}}>
              <AccordionSummary aria-controls="panel1d-content"
                                id="panel1d-header">
                <Typography>{value.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List sx={{}} disablePadding>
                  {value.list.map((value1, index) => (
                    <ListItem key={index} disablePadding divider>
                      <ListItemButton>
                        {value1.name}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

          ))}
          </Grid>

        </Grid>
      </Card>
    </Container>
  );
}

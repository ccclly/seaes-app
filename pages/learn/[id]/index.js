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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import request1 from '@/Util/request1';
import url from '@/constant/url';


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

  const [state, setState] = useState({
    chapterList: [],
    lessonList: []
  });
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!!id) {
      const url = '/course/' + id;
      request1.get(url).then(value => {
        setState(value.data);
      });
    }

  }, [id]);

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
            {state.name}
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
              image={url+'/'+state.imgName}
              alt="Paella dish"
              sx={{
                width: 450,
                height: 240,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="div">
              {state.name}
            </Typography>
            <Typography variant="body2" color="text.secondary"
                        noWrap={false} sx={{
              lineClamp: 2,
              boxOrient: 2,
              textOverflow: 'ellipsis',
            }}>
              {state.description}
            </Typography>
          </Grid>
          <Grid item sx={{mt:3}} xs={12}>

            {state.chapterList.map((value, index) => (
              <Accordion key={index} sx={{width:'100%'}}>
                <AccordionSummary aria-controls="panel1d-content"
                                  id="panel1d-header">
                  <Typography>{value.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List sx={{}} disablePadding>
                    {state.lessonList.map((value1, index) => (
                      value.id == value1.chapterId &&
                      <ListItem key={index} disablePadding divider>
                          <Link href={'/learn/' + id+'/'+value1.id +'/'+ value1.vedioName}>
                          <ListItemButton>
                            {value1.name}
                          </ListItemButton>
                        </Link>
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

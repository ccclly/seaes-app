import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import {
  Box, Button, Card, CardContent, CardMedia, Divider,
  Drawer, Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Grade } from '@mui/icons-material';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home () {
  const notice = [
    '教育部办公厅关于进一步加强高校教学实验室安全检查工作的通知',
    '教育部要求高校自查实验室安全:出过事的重点关注',
    '爆炸带走三学生生命 高校实验室安全风险如何消弭？',
    '北京交通大学“12·26”事故调查报告公布'];
  const ruler = ['教育部办公厅关于进一步加强高校教学实验室安全检查工作的通知'];
  const course = []

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <Typography>
          实验室安全准入教育
        </Typography>
        <Typography gutterBottom>
          实验室是科研机构相关人员从事科研工作的主要场所,也是重大科研成果的诞生地。实验室安全是推进科研活动不断正常向前开展的基本保证。实验室安全准入教育是加强实验室规范教育的系统工程，面向教师、学生进行实验安全、操作规范和专业能力教育与考核，考核合格、具备相应实验知识、能力、素质的人员获得准入资格才可以进入实验室管理、教学与学习、研究。围绕“安全意识树立、安全知识掌握、安全技能运用”的教育目标，建立科学完善的实验室安全课程及考核体系，使实验室达到一种安全、稳定、和谐的可持续状态。
        </Typography>
        <Grid container spacing={0}>
          <Grid xs={6} item>
            <Box>
              <Box>
                <span >
                  通知公告
                </span>
                <Button color={'secondary'}><Link href={'/notices'}>更多</Link></Button>
              </Box>
              <List component="nav" aria-label="mailbox folders" sx={{paddingRight: 5}}>
                {notice.map(value => (
                  <ListItem divider button key={value}>
                    {/*<ListItemText primary="Inbox" />*/}
                    <Typography noWrap={true}>{value}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid xs={6} item>
            <Box>
              <Typography gutterBottom>
                规章制度
              </Typography>
              <List component="nav" aria-label="mailbox folders" sx={{paddingRight: 5}}>
                {notice.map(value => (
                  <ListItem divider button key={value}>
                    {/*<ListItemText primary="Inbox" />*/}
                    <Typography noWrap={true}>{value}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Box>
            安全课程
          </Box>
          <Grid container columns={5} sx={{height: 280}} spacing={1}>
            <Grid xs={1} item>
              <Card>
                <CardMedia
                  component="img"
                  image="/image/01.jpg"
                  alt="Paella dish"

                />
                {/*<CardContent>*/}
                  <Typography gutterBottom component="div">
                    生物实验室
                  </Typography>
                {/*</CardContent>*/}
              </Card>
            </Grid>
            <Grid xs={1} item>
              <Grid container rowSpacing={1}>
              <Grid item>
                <Card>
                  <CardMedia
                    component="img"
                    image="/image/02.jpg"
                    alt="Paella dish"
                  />
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardMedia
                    component="img"
                    image="/image/03.jpg"
                    alt="Paella dish"
                  />
                </Card>
              </Grid>
              </Grid>
            </Grid>
            <Grid xs={1} item>
              <Grid container rowSpacing={1}>
                <Grid item>
                  <Card>
                    <CardMedia
                      component="img"
                      image="/image/04.jpg"
                      alt="Paella dish"
                    />
                  </Card>
                </Grid>
                <Grid item>
                  <Card>
                    <CardMedia
                      component="img"
                      image="/image/05.jpg"
                      alt="Paella dish"
                    />
                  </Card>
                </Grid>

              </Grid>
            </Grid>
            <Grid xs={2} item>
              <Card>
                <CardMedia
                  component="img"
                  image="/image/06.jpg"
                  alt="Paella dish"
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        {/*<Box className={styles.NAndR}>*/}
        {/*</Box>*/}
        {/*<div className={styles.description}>*/}
        {/*  <p>*/}
        {/*    Get started by editing&nbsp;*/}
        {/*    <code className={styles.code}>pages/index.js</code>*/}
        {/*  </p>*/}
        {/*  <div>*/}
        {/*    <a*/}
        {/*      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
        {/*      target="_blank"*/}
        {/*      rel="noopener noreferrer"*/}
        {/*    >*/}
        {/*      By{' '}*/}
        {/*      <Image*/}
        {/*        src="/vercel.svg"*/}
        {/*        alt="Vercel Logo"*/}
        {/*        className={styles.vercelLogo}*/}
        {/*        width={100}*/}
        {/*        height={24}*/}
        {/*        priority*/}
        {/*      />*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className={styles.center}>*/}
        {/*  <Image*/}
        {/*    className={styles.logo}*/}
        {/*    src="/next.svg"*/}
        {/*    alt="Next.js Logo"*/}
        {/*    width={180}*/}
        {/*    height={37}*/}
        {/*    priority*/}
        {/*  />*/}
        {/*  <div className={styles.thirteen}>*/}
        {/*    <Image*/}
        {/*      src="/thirteen.svg"*/}
        {/*      alt="13"*/}
        {/*      width={40}*/}
        {/*      height={31}*/}
        {/*      priority*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className={styles.grid}>*/}
        {/*  <a*/}
        {/*    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
        {/*    className={styles.card}*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    <h2 className={inter.className}>*/}
        {/*      Docs <span>-&gt;</span>*/}
        {/*    </h2>*/}
        {/*    <p className={inter.className}>*/}
        {/*      Find in-depth information about Next.js features and&nbsp;API.*/}
        {/*    </p>*/}
        {/*  </a>*/}

        {/*  <a*/}
        {/*    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
        {/*    className={styles.card}*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    <h2 className={inter.className}>*/}
        {/*      Learn <span>-&gt;</span>*/}
        {/*    </h2>*/}
        {/*    <p className={inter.className}>*/}
        {/*      Learn about Next.js in an interactive course with&nbsp;quizzes!*/}
        {/*    </p>*/}
        {/*  </a>*/}

        {/*  <a*/}
        {/*    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
        {/*    className={styles.card}*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    <h2 className={inter.className}>*/}
        {/*      Templates <span>-&gt;</span>*/}
        {/*    </h2>*/}
        {/*    <p className={inter.className}>*/}
        {/*      Discover and deploy boilerplate example Next.js&nbsp;projects.*/}
        {/*    </p>*/}
        {/*  </a>*/}

        {/*  <a*/}
        {/*    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
        {/*    className={styles.card}*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    <h2 className={inter.className}>*/}
        {/*      Deploy <span>-&gt;</span>*/}
        {/*    </h2>*/}
        {/*    <p className={inter.className}>*/}
        {/*      Instantly deploy your Next.js site to a shareable URL*/}
        {/*      with&nbsp;Vercel.*/}
        {/*    </p>*/}
        {/*  </a>*/}
        {/*</div>*/}
      </main>
    </>
  );
}

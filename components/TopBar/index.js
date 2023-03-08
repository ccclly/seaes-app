import Link from 'next/link';
import { Button, Typography } from '@mui/material';

import styles from '@/styles/Topbar.module.css';
import Grid2 from '@mui/material/Unstable_Grid2';

export default function () {
  return (
    <Grid2 container spacing={2}>

      <Grid2 xs={4}>
        <Typography variant="h6" gutterBottom>
          实验室安全教育与考试系统
        </Typography>
      </Grid2>

      <Grid2 xs={6}>
        <Button>
          <Link href="/">Home</Link>
        </Button>
        <Button>
          <Link href="/learn">learn</Link>
        </Button>
        <Button>
          <Link href="/exam">exam</Link>
        </Button>
        <Button>
          <Link href="/mine">mine</Link>
        </Button>
      </Grid2>
      <Grid2 xs={2}>
        <Button>登陆</Button>
      </Grid2>
    </Grid2>
  )
}

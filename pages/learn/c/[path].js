import { CardMedia, Container } from '@mui/material';
import MyPlayer from '@/Util/MyPlayer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import request from '@/Util/request';
export default function (){

  const [state, setState] = useState(false);

  const router = useRouter();
  const { path } = router.query;
  useEffect(() => {
    if (!!path) {
      setState(true)
      // request.get(url).then(value => {
      //   setState(value.data);
      // });
    }

  }, [path]);

  return(
    <Container>
      {state&&<MyPlayer
        // option={{
        //   videoSrc: 'http://localhost:8080/' + path,
        //   width: '100%',
        //   // height: 420,
        // }}
        url={'http://localhost:8080/' + path}
        controls={true}
      />}

    </Container>
  )
}

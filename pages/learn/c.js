import { CardMedia, Container } from '@mui/material';
import MyPlayer from '@/Util/MyPlayer';
export default function (){
  return(
    <Container>
      <MyPlayer
        option={{
          videoSrc:"http://localhost:8080/image/sd.mp4",
          width: 750,
          height: 420,
        }}
      />

    </Container>
  )
}

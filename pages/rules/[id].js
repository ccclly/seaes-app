import InfoDetail from '@/components/Information/InfoDetail';
import { useRouter } from 'next/router';

export default function (){
  const router = useRouter();
  const id = router.query.id;
  return(<InfoDetail type={'rule'} id={id}/> )
}

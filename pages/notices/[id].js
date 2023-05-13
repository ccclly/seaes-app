import InfoDetail from '@/components/Information/InfoDetail';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import request from '@/Util/request';

export default function () {
  const [state, setState] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!!id) {
      const url = '/notice/' + id;
      request.get(url).then(value => {
        setState(value.data);
      });
    }

  }, [id]);
  return(<InfoDetail type={'notice'} title={state.title} description={state.description}/> )
}

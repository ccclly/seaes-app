import InfoDetail from '@/components/Information/InfoDetail';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import request from '@/Util/request';

export default function () {
  // const router = useRouter();
  // const { getId } = router.query;
  // const [state, setState] = useState({});
  // useEffect(() => {
  //   if (!!getId) {
  //     const url = '/notice/' + getId;
  //     request.get(url).then(value => {
  //       setState(value.data);
  //     });
  //   }
  //
  // }, [getId]);
  // return (
  //   <>
  //     {state.title}
  //     <div dangerouslySetInnerHTML={{ __html: state.description }}/>
  //   </>
  // )
  return(<InfoDetail type={'notices'}/> )
}

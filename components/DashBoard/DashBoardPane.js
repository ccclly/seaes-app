import request from '@/Util/request';
import { Button } from '@mui/material';
import { useEffect } from 'react';

export default function () {
  let token = null
  useEffect(()=>{
    token = JSON.parse(localStorage.getItem('token'));
    console.log(token)
  })

  return (
    <>
      dash
      <Button onClick={event => {
        request.get('/user/test',{
        }).then(value => {
            console.log(value.data);
          });
      }}>发送</Button>
      <Button onClick={event=>{
        request.post('/user/list').then(value => {
          console.log(value.data)
        })
      }}>发送2</Button>
      <img
        src="http://localhost:8080/c7c409d5-4b81-426b-9533-6da0c7d20fcb01.jpg"
        alt="img"/>
    </>
  )
};

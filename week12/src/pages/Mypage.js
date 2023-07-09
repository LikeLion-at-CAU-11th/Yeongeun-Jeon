import React, { useEffect, useState } from 'react'
import { getMyPage } from '../apis/mypage';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const router = useNavigate();
  useEffect(()=>{
    //mypage 정보 불러오기
    getMyPage()
      .then((res)=>{
        // console.log(res);
        setData(res);
        setLoading(false);
      }).catch((error)=>{
        if(error.response.status === 401){
          //토큰 만료됐을 때
          //데이터 삭제
          localStorage.removeItem('access');
          localStorage.removeItem('refreshToken');
          //처음 창으로 이동
          router('/');
        }
      })
  }, []);
  if(loading)return <div>로딩중...</div>;
  return (
    <div>
      <div>{data?.name}</div>
      <div>{data?.age}</div>
    </div>
  )
}

export default Mypage
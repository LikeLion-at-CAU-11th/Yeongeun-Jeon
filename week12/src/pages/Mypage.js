import React, { useEffect, useState } from 'react'
import { getMyPage } from '../apis/mypage';

const Mypage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    //mypage 정보 불러오기
    getMyPage().then((res)=>{
      // console.log(res);
      setData(res);
      setLoading(false);
    });
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
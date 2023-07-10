import React, { useState } from 'react'
import { Input, Inputs, Title, Wrapper } from '../components/Common'
import { useForm } from '../hooks/useForm';
import { styled } from 'styled-components';
import { signUp } from '../apis/signUp';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [id, onChangeID] = useForm();
  const [pw, onChangePw] = useForm();
  const [name, onChangeName] = useForm();
  const [age, onChangeAge] = useForm();
  const [wrong, setWrong] = useState(0);
  const router = useNavigate();
  const onClick = async ()=>{
    try{
      //길이 1 이상 아닌 값들 저장
      const invalidLength = [];
      if(id.length <1){
        invalidLength.push("아이디");
      }
      if(pw.length<1){
        invalidLength.push("비밀번호");
      }
      if(name.length<1){
        invalidLength.push("이름");
      }
      if(age.length<1){
        invalidLength.push("나이");
      }
      if(invalidLength.length>0){
        alert(`${invalidLength.join(", ")}를 입력하지 않았습니다. 다시 입력해주세요.`);
        setWrong(1);
      }

      if(wrong === 1){
        onChangeID({target:{ value: ''}});
        onChangePw({target:{ value: ''}});
        onChangeName({target:{ value: ''}});
        onChangeAge({target:{ value: ''}});
        router('/signup');
      }
      else{
        //api 처리
        await signUp(id, pw, name, age);
        router('/');
      }
    }catch(error){
      onChangeID({target:{ value: ''}});
      onChangePw({target:{ value: ''}});
      onChangeName({target:{ value: ''}});
      onChangeAge({target:{ value: ''}});

    }    
  };
  return (
    <Wrapper>
      <Title>회원가입</Title>
      <Inputs>
        <Input placeholder="아이디" value={id} onChange={onChangeID}/>
        <Input placeholder="비밀번호" type = "password" value={pw} onChange={onChangePw}/>
        <Input placeholder="이름" value={name} onChange={onChangeName}/>
        <Input placeholder="나이" value={age} onChange={onChangeAge}/>
      </Inputs>
      <Button onClick={onClick}>Sign up</Button>
    </Wrapper>
  )
}

export default Signup
const Button=styled.button`
  background-color: black;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  margin-top: 20px;
`
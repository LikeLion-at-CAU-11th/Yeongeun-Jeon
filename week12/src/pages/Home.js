import React, { useState } from 'react'
import { Input, Inputs, Title, Wrapper, Form } from '../components/Common';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { login } from '../apis/login';

const Home = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const router = useNavigate();
    const onChangeId = (e)=>{
        setId(e.target.value);
    }
    const onChangePw = (e)=>{
        setPw(e.target.value);
    }
    const onClick = async()=>{
        //로그인 api
        const result = await login(id, pw);
        console.log(result);
        const {accessToken, refreshToken} = result;
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        router('/mypage');
    };
    return (
        <Wrapper>
            <Title>로그인하기</Title>
            <Form>
                <Inputs>
                    <Input placeholder="아이디" value={id} onChange={onChangeId}/>
                    <Input placeholder="비밀번호" type="password" value={pw} onChange={onChangePw}/>
                </Inputs>
                <Button onClick={onClick}>Login</Button>
            </Form>
            <CustomLink to='/signup'>회원가입하기</CustomLink>
        </Wrapper>);
}

export default Home

const Button = styled.button`
    background-color: black;
    color: white;
    padding: 20px;
    border-radius: 10px;
`;
const CustomLink = styled(Link)`
    margin-top: 20px;
    color: black;
    text-decoration: none;
    &:visited{
        color: black;
        text-decoration: none;

    }
`
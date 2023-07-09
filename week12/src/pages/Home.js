import React, { useState } from 'react'
import { Input, Inputs, Title, Wrapper, Form } from '../components/Common';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Home = () => {
    return (
        <Wrapper>
            <Title>로그인하기</Title>
            <Form>
                <Inputs>
                    <Input placeholder="아이디" />
                    <Input placeholder="비밀번호" type="password"/>
                </Inputs>
                <Button>Login</Button>
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
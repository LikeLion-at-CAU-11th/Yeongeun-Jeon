import React, { useContext } from 'react'
import { Button, Title } from '../components/layout/common'
import { ThemeContext } from '../context/context'
import { userNameAtom, emailAtom, isSubmittedAtom } from '../recoil/atoms';
import { useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const MyPage = () => {
    const mode = useContext(ThemeContext);
    const resetName = useResetRecoilState(userNameAtom);
    const resetEmail = useResetRecoilState(emailAtom);
    const reset = useResetRecoilState(isSubmittedAtom);
    const navigate = useNavigate();
    const handleDelete = ()=>{
        reset();
        resetEmail();
        resetName();
        navigate('/');
        
    }
  return (
    <>
    <Title>welcome</Title>
    <Button mode={mode.button} onClick={handleDelete}>리셋</Button>
    </>
  )
}

export default MyPage;

const Wrapper = styled.div`
display: flex;


`
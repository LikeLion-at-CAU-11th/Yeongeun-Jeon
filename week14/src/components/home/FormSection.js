import React, { useContext } from 'react';
import { Button } from '../layout/common';
import { ThemeContext } from '../../context/context';
import Form from './Form';
import { useNavigate } from 'react-router-dom';
import { isSubmittedAtom } from '../../recoil/atoms';
import { useSetRecoilState } from 'recoil';

const FormSection = () => {
    const mode = useContext(ThemeContext);
    const navigate = useNavigate();

    const isSubmitted = useSetRecoilState(isSubmittedAtom);

    const handleClick = () => {
        isSubmitted(true);
        navigate('/mypage');
    }   

  return (
    <>
    <Form type='text' inputType='이름'/>
    <Form type='email' inputType='이메일'/>
    <Button mode={mode.button} onClick={handleClick}>제출</Button>
    </>
  )
}

export default FormSection;
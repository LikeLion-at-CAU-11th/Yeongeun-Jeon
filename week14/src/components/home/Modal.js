import React, { useContext, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { dateAtom, emailAtom, userNameAtom } from '../../recoil/atoms';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import {ThemeContext} from "../../context/context"

const Modal = ({isOpen, closeModal, isSubmitted}) => {
    const name = useRecoilValue(userNameAtom);
    const email = useRecoilValue(emailAtom);
    const birth = useRecoilValue(dateAtom);

    const navigate = useNavigate();

    // const context = useContext(ThemeContext);
    // const [mode, setMode] = useState(context.blueTheme);
    const mode = useContext(ThemeContext);

    const goToMyPage = ()=>{
        navigate('/mypage');
        isSubmitted(true);
    }

    return (
        <div style = {{display: isOpen ? "block" : "none"}}>
        <Overlay>
        <ModalWrap mode={mode.sub}>
            <Contents>
                <PreText>
                {`이름 : ${name} \n이메일 : ${email} \n생년월일 : ${birth}가 맞습니까?`}
                </PreText>
            <Button onClick={closeModal} mode={mode.main}>NO</Button>
            <Button onClick={goToMyPage} mode={mode.main}>YES</Button>
            </Contents>
        </ModalWrap>
        </Overlay>        
        </div>
    )
    
}

export default Modal

const PreText = styled.pre`
font-size:20px;
font-weight:bold;
color: white;
`

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 600px;
  height: fit-content;
  border-radius: 15px;
//   background-color: #fff;
  background-color: ${props=>props.mode};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Button = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  
   font-size: 25px;
   font-weight: bold;
   padding: 10px 20px;
   border: none;
//    background-color: #ababab;
//    background-color: white;
   border-radius: 10px;
   color: white;
   font-style: italic;
   font-weight: 200;
   cursor: pointer;
   &:hover {
    //  background-color: #898989;
    // background-color: ${props=>props.mode}
    // color: ${props=>props.mode}
    // color: white;
    background-color: white;
    color: ${props=>props.mode}
}
`;

const Contents = styled.div`
  margin: 50px 30px;
  h1 {
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 60px;
  }
  img {
    margin-top: 60px;
    width: 300px;
  }
`;
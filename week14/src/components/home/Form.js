import React from 'react'
import {useRecoilState, useResetRecoilState} from 'recoil';

import {userNameAtom, emailAtom, dateAtom} from '../../recoil/atoms.js'

const Form = ({type, inputType}) => {
    const [userName, setUserName] = useRecoilState(userNameAtom);
    const [email, setEmail] = useRecoilState(emailAtom);
    const [birth, setBirth] = useRecoilState(dateAtom);

    const onChange = (e)=>{
        const data = e.target.value;

        if(inputType === '이름'){
            setUserName(data);
        }
        else if(inputType === '이메일'){
            setEmail(data);
        }
        else{
          setBirth(data);
        }
    }

    


  return (
    <>
    <div>{inputType}</div>
    <input type={type} onChange={onChange}/>
    </>
  )
}

export default Form
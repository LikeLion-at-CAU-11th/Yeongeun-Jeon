import React from 'react'
import {useRecoilState, useResetRecoilState} from 'recoil';

import {userNameAtom, emailAtom} from '../../recoil/atoms.js'

const Form = ({type, inputType}) => {
    const [userName, setUserName] = useRecoilState(userNameAtom);
    const [email, setEmail] = useRecoilState(emailAtom);

    const onChange = (e)=>{
        const data = e.target.value;

        if(inputType === '이름'){
            setUserName(data);
        }
        else{
            setEmail(data);
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
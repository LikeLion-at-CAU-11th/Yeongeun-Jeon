import { useState } from "react";

export const useForm = ()=>{
    //ex. id & setId & onChange를 여기 안에 다 넣음
    const [value, setValue] = useState('');
    const onChange=(e)=>{
        setValue(e.target.value);
    };
    return [value, onChange];
};
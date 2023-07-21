import axios from "axios";
import { getNewRefreshToken } from "./refresh";
import { useNavigate } from "react-router-dom";

export const getAuthAxios = (token)=>{
    // const router = useNavigate();
    const authAxios = axios.create({
        baseURL: 'http://front.cau-likelion.org',
        headers: {
            Authorization: token, 
        },
    });
    authAxios.interceptors.response.use(
        (res)=> res,
        async(error)=>{
            if(error.response.status === 401){
                //토큰 만료된 경우
                const {accessToken,refreshToken} = await getNewRefreshToken();
                error.config.headers.Authorization = accessToken;
                localStorage.setItem('access', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                return (await axios.get(error.config.url, error.config)).data;
            }
        }
    );
        return authAxios;
}
import axios from "axios"

export const getMyPage = async () => {
    const access = localStorage.getItem('access')
    const result = axios.get('http://front.cau-likelion.org/mypage/', {
        headers:{
            Authorization: access,
        },
    });
    return (await result).data;
}
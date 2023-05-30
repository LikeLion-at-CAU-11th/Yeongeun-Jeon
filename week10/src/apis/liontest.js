import axios from "axios";

export const baseUrl = `https://jf60xmj7q3.execute-api.ap-northeast-2.amazonaws.com/api`;

export const getTestQuestions = () => {
    const url = `${baseUrl}/liontest/question`
    return axios.get(url);
}
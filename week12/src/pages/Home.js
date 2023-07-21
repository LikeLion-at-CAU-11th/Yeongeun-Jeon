import { Input, Inputs, Title, Wrapper, Form } from '../components/Common';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { login } from '../apis/login';
import { useForm } from '../hooks/useForm';

const Home = () => {
    const [id, onChangeID] = useForm('');
    const [pw, onChangePw] = useForm('');
    const router = useNavigate();
    const onClick = async()=>{
        try{
            //로그인 api
            const result = await login(id, pw);
            console.log(result);
            const {accessToken, refreshToken} = result;
            localStorage.setItem('access', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            router('/mypage'); 
        }catch(error){
            //길이 1 이상 아닌 값들 저장
            const invalidLength = [];
            if(id.length <1){
                invalidLength.push("아이디");
            }
            if(pw.length<1){
                invalidLength.push("비밀번호");
            }
            if(invalidLength.length>0){
                alert(`${invalidLength.join(", ")}를 입력하지 않았습니다. 다시 입력해주세요.`);
            }

            if(error.response.status === 500){
                // input 칸 초기화
                onChangeID({target:{ value: ''}});
                onChangePw({ target: { value: '' }});
                alert("아이디 또는 비밀번호가 올바르지 않습니다. 다시 입력해주세요");
            }
        }
        
    };
    return (
        <Wrapper>
            <Title>로그인하기</Title>
            <Form>
                <Inputs>
                    <Input placeholder="아이디" value={id} onChange={onChangeID}/>
                    <Input placeholder="비밀번호" type="password" value={pw} onChange={onChangePw}/>
                </Inputs>
                <Button onClick={onClick}>Login</Button>
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
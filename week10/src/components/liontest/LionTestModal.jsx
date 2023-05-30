import React, {useEffect, useState, useMemo} from "react";
import {useBeforeunload} from "react-beforeunload";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {baseUrl, getTestQuestions} from "../../apis/liontest";
import TestDataSection from "../liontest/TestDataSection"
import axios from "axios";

const LionTestModal = () => {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResultClicked, setShowResultClicked] = useState(false);
  const [resultButtonVisible, setResultButtonVisible] = useState(true);
  const [result, setResult] = useState(0);
  const [resultData, setResultData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await getTestQuestions();
        const questions = response.data.data;
        setQuestionList(questions);
        // console.log(questions);
      }catch(error){
        console.log(error);
      }
    };
    fetchData();
  }, [selectedAnswers]);

  const handleStartButton = () => {
    setButtonVisible(false);
    console.log("clicked");
    setTestStarted(true);
    navigate(`?q=${currentQuestionIdx}`);
  }

  const handleNextQuestion = () =>{
    console.log("현재 : "+ currentQuestionIdx);
    setCurrentQuestionIdx(idx => idx + 1);
    navigate(`?q=${currentQuestionIdx+1}`);
  }

  

  const handleAnswerSelected = (answerId) => {
    console.log("답은 : " + answerId);
    // setSelectedAnswers((prevAnswers) => [...prevAnswers, answerId]);
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers, answerId];
      console.log(updatedAnswers);
      return updatedAnswers;
    });
  }

  const transformData = selectedAnswers.map((answer, index)=>({
    id: index,
    answer: answer,
  }))


  const postData = useMemo(()=>({
    answer: transformData,
  }), [transformData])

  const showResult = () =>{
    console.log("성공");
    setShowResultClicked(true);
    setResultButtonVisible(false);

  }


  useEffect(()=>{
    if(!result && showResultClicked){
      const postRequest = async () =>{
        try{
          const response = await axios.post(`${baseUrl}/liontest/result`, postData);
          console.log(response.data);
          setResult(response.data.data.result);
          setResultData(response.data.data.incorrect);
        }catch(error){
          console.log(error);
        }
      };
      postRequest();
    }
    
  }, [postData, showResultClicked]);

  // useEffect(()=>{
  //   const handleBeforeUnload = (event)=>{
  //     event.preventDefault();
  //     //경고메시지
  //     event.returnValue="새로고침을 하면 테스트를 다시 시작해야 합니다";
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () =>{
  //     window.removeEventListnener("beforeUnload", handleBeforeUnload);
  //   }
  // }, []);
  useBeforeunload((event)=>event.preventDefault());

  return (
    <Dom>
      <Title>🦁 멋사인 테스트 🦁</Title>
      <ContentBox>
        {buttonVisible && 
        (
          <Button onClick = {handleStartButton}>
          시작하기
          </Button>
        )}

        {testStarted &&
        currentQuestionIdx<9 &&
        <TestDataSection 
          testData = {questionList[currentQuestionIdx]} onNextQuestion = {handleNextQuestion}
          onAnswerSelected={handleAnswerSelected}          
          />
        }
        
        {currentQuestionIdx === 9 &&
        resultButtonVisible &&
        <Button onClick={showResult}>결과보기</Button>

        }

        {!resultButtonVisible &&
          <>
          <Result>점수 {result}/9</Result>
          틀린문제
          <> </>
          {resultData.map((item)=>(
            <>
            <Wrong>{item.title}</Wrong>
            <Answer>정답 : {item.answer}</Answer>
            </>
          ))

          }
          </>

// {resultData.map((item) => (
//   <div key={item.id}>{item.answer}</div>
// ))}          
        }
        
      </ContentBox>
      
    </Dom>
  );
};

export default LionTestModal;

const Title = styled.div`
  font-size: 40px;
  color: #535353;
  font-weight: 700;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90%;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  font-size: 25px;
  color: gray;
  background-color: beige;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
`;

const Dom = styled.div`
  gap: 30px;
  background-color: #ffd9b6;
  width: 90vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  min-height: 600px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px lightgray;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: black;
  font-weight: 500;
  padding-bottom: 20px;
`;

const Wrong = styled.div`
  font-size: 20px;
  color: black;
  font-weight: 400;
  padding-top: 10px;
`

const Answer = styled.div`
  font-size: 15px;
  color: black;
  font-weight: 400;
`
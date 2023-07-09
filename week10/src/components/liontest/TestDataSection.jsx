import React, {useState} from 'react';
import styled from "styled-components"


const TestDataSection = ({testData, onNextQuestion, onAnswerSelected}) => {
    const [selectedAnswerID, setSelectedAnswerID] = useState(null);

    // console.log(testData);

    const handleButtonClicked = (answerId) => {
      console.log(answerId);
      setSelectedAnswerID(answerId);
      
    }

    const handleNextButton = () => {
      console.log("최종선택 : " + selectedAnswerID);
      onAnswerSelected(selectedAnswerID);
      onNextQuestion();
      setSelectedAnswerID(null);
    }

    

    return (
        <div>
            <ContentBox>
            <Title>{testData.title}</Title>
                {testData.answerList.map((answer)=>(
                    <Button
                        key={answer.aid}
                        onClick = {()=>{ handleButtonClicked(answer.aid); }}
                        style = {{backgroundColor : selectedAnswerID === answer.aid? "orange" : ""}}
                    
                    >{answer.content}</Button>
                ))
                }
                <NextButton onClick = {handleNextButton}>다음</NextButton>
            </ContentBox>
               
        </div>
            
                
    );
};

export default TestDataSection;

const Title = styled.div`
  font-size: 20px;
  color: #535353;
  font-weight: 700;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items : center;
  height: 90%;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  font-size: 25px;
  color: gray;
  background-color: beige;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  margin : 10px;
`;

const NextButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 50px;
  font-size: 25px;
  color: gray;
  background-color: #FFA500;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  margin : 10px;
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
import React, { useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate, useLocation} from "react-router-dom";
import FilterButton from "./FilterButton";
import UserDataSection from "./UserDataSection";
import PageButton from "./PageButton";
import { getUserPerGender, getUserPerPage } from "../../apis/lioninfo";
import { getUserPerStack } from "../../apis/lioninfo";

const LionInfoModal = () => {
  const [clickedButton, setClickedButton] = useState(false);
  const [clickedSortKey, setClickedSortKey] = useState(false);
  const [userData, setUserData] = useState([]);
  const [sort, setSort] = useState(0); // sort가 0이면 페이지 번호 띄우게
  const navigate = useNavigate();
  const location = useLocation();
  let response;

  const [categories, setCategories] = useState([
    {
      type: "page",
      title: "All",
      clicked: false,
    },
    {
      type: "gender",
      title: "male",
      clicked: false,
    },
    {
      type: "gender",
      title: "female",
      clicked: false,
    },
    {
      type: "stack",
      title: "frontend",
      clicked: false,
    },
    {
      type: "stack",
      title: "backend",
      clicked: false,
    },
    {
      type: "stack",
      title: "design",
      clicked: false,
    },
    {
      type: "stack",
      title: "pm",
      clicked: false,
    },
  ]);

  const pageNumbers = [1, 2, 3, 4, 5, 6, 7];

  // 페이지별 데이터 각각 받아와, PageButton 컴포넌트 클릭 시 알맞는 데이터 렌더링
    const handleClick = async (number) => {
      console.log(`Clicked : ${number}`);
      const response = await getUserPerPage(number);
      const list = response.data.data;
      console.log(list);
      setUserData(list);
      setClickedButton(number);
      
      console.log(clickedButton);
      console.log(number);

      navigate(`?type=page&title=${number}`);
    }

    const handleButtonClick = async (newType, newTitle) => {
      navigate(`?type=${newType}&title=${newTitle}`)      
    }

    useEffect(()=>{
      const fetchLionInfo = async () =>{
        try{
          const searchParams = new URLSearchParams(location.search);
          const type = searchParams.get('type');
          const title = searchParams.get('title');

          if(type === "page"){
            response = await getUserPerPage(1);
          }
          else if(type === "gender"){
            response = await getUserPerGender(title);
          }
          else if(type === "stack"){
            response = await getUserPerStack(title);
          }
          const list = response.data.data;
          setUserData(list);
          
          setCategories(
            categories.map((category)=>
              category.title === title ? {...category, clicked: true} : {...category, clicked: false}
            )
          )

        }catch(error){
          console.log("Failed to fetch lion info: ", error);
        }
      }
      fetchLionInfo();
      

    }, [location.search]);




  return (
    <Dom>
      <Title>🦁 LikeLion 11th 🦁</Title>
      <ButtonDom>
        {categories.map((c, i) => (
          <FilterButton
            title={c.title}
            type={c.type}
            setUserData={setUserData}
            isClicked={i === clickedSortKey}
            handleButtonClick={handleButtonClick}
            onClick = {() => {
              setClickedSortKey(i);
              console.log(i);
              setSort(i);
            }}
          />
        ))}
      </ButtonDom>
      <UserDataSection userData={userData} />
      
      
      {categories.map((c, i)=>{
        if(i === 0 && !console.log("i는 : "+ i)){
          return (
           <PaginationDom>
            {!sort && 
            pageNumbers.map((number)=>(
              <PageButton number = {number} onClick={() => handleClick(number)}  isClicked={number === clickedButton}/>
            )

            )}

           </PaginationDom> 
          );
        }
        return null;
      })

      }     
    </Dom>
  );
};

export default LionInfoModal;

const Title = styled.div`
  font-size: 40px;
  color: #535353;
  font-weight: 700;
`;

const ButtonDom = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Dom = styled.div`
  gap: 30px;
  background-color: #ffd9b6;
  width: 90vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-radius: 20px;
  box-shadow: 5px 5px 5px lightgray;
`;

const PaginationDom = styled.div`
  display: flex;
  gap: 20px;
  flex-direction : row;
  font-size: 25px;
  cursor: pointer;
  display: flex;
  gap : 10px;
`;
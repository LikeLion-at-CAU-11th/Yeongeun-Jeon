import React, { useState } from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import UserDataSection from "./UserDataSection";
import PageButton from "./PageButton";
import { getUserPerPage } from "../../apis/lioninfo";



const LionInfoModal = () => {
  const [clickedButton, setClickedButton] = useState(false);
  const [clickedSortKey, setClickedSortKey] = useState(false);
  const [userData, setUserData] = useState([]);
  const [sort, setSort] = useState(0); // sort가 0이면 페이지 번호 띄우게

  const category = [
    {
      type: "page",
      title: "All",
    },
    {
      type: "gender",
      title: "male",
    },
    {
      type: "gender",
      title: "female",
    },
    {
      type: "stack",
      title: "frontend",
    },
    {
      type: "stack",
      title: "backend",
    },
    {
      type: "stack",
      title: "design",
    },
    {
      type: "stack",
      title: "pm",
    },
  ];

  const pageNumbers = [1, 2, 3, 4, 5, 6, 7];

  // const numbersExist = (key) =>{
  //   if(key === 0)var numberExist = 1;
  // }


  // // 전체 리스트 받아와 클라이언트단에서 슬라이싱
  // const slicing = async() =>{
  //   const response = await getUserPerPage(0);
  //   const list = response.data.data;
  //   const userList = list.map(( _, index)=>{
  //     if(index % 4 === 0){
  //       return list.slice(index, index+4);
  //     }
  //     return null;
  //   }).filter(Boolean);
  //   console.log(userList);
  //   return userList;
  // }



  // const handleClick = async (number) => {
  //   console.log(`Clicked : ${number}`);
  //   const userDatas = await slicing();
  //   const slicingUserData = userDatas[number - 1];
  //   console.log(slicingUserData);
  //   setUserData(slicingUserData);
  // }

  // 페이지별 데이터 각각 받아와, PageButton 컴포넌트 클릭 시 알맞는 데이터 렌더링
    const handleClick = async (number) => {
      console.log(`Clicked : ${number}`);
      const response = await getUserPerPage(number);
      const list = response.data.data;
      setUserData(list);
      setClickedButton(number);
      
      console.log(clickedButton);
      console.log(number);
      
    }
    // useEffect(()=>{
    //   if(number)
    // }, [sort]);
  
  return (
    <Dom>
      <Title>🦁 LikeLion 11th 🦁</Title>
      <ButtonDom>
        {category.map((c, i) => (
          <FilterButton
            key={i}
            title={c.title}
            type={c.type}
            setUserData={setUserData}
            isClicked={i === clickedSortKey}
            onClick = {() => {
              setClickedSortKey(i);
              console.log(i);
              // if(i === 0){
              //   setNumberVisible(true);
              // }
              // else {
              //   setNumberVisible(false);
              // }
              // console.log("numberVislble : " + numberVisible);
              setSort(i);
            }}
          />
        ))}
      </ButtonDom>
      <UserDataSection userData={userData} />
      
      
      
      {/* 페이지 번호 띄우기 */}
      {/* {category.map((c)=> (c.title === "All") ) && (
        // console.log("키 : "+ c.type);

        <PaginationDom>

        {pageNumbers.map((number)=>(
          <PageButton number = {number} onClick={() => handleClick(number)}  isClicked={number === clickedButton}/>        
        )       
        )}

      </PaginationDom>
      )} */}

      {category.map((c, i)=>{
        if(i === 0 && !console.log("i는 : "+ i)){
          // console.log(i);
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
  
// const PageNum = styled.div`
//   color: ${(props) => (props.clicked ? "black" : "gray")};
//   font-size: 25px;
//   cursor: pointer;
//   display: flex;
//   gap : 10px;
// `;
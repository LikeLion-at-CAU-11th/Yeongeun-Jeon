import React from "react";
import styled from "styled-components";

const FilterButton = ({title, type, setUserData, isClicked, handleButtonClick, onClick}) => {
  const handleClick = async () => {
    setUserData(setUserData);
    onClick();
    handleButtonClick(type, title);
  };

  return <Button onClick={handleClick} style = {{backgroundColor : isClicked ? "orange" : ""}}>{title}</Button>;
};

export default FilterButton;

const Button = styled.div`
  flex-basis: 13%;
  height: 70px;
  background-color: beige;
  color: gray;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
`;
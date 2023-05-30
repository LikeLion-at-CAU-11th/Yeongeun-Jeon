import React from 'react';

const PageButton = ({number, onClick, isClicked}) => {
    const handleClick = () => {
        onClick(number);
    };

    return (
        <div onClick={handleClick} style={{color: isClicked ? "black" : "gray"}}>{`${number}`}</div>
    );
};

export default PageButton;
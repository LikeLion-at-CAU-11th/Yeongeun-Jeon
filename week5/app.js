// 1. js 파일에서 접근해야하는 html dom 요소들 선언하기
const myHandText = document.getElementById('my-hand-text');
const myHandIcon = document.getElementById('my-hand-icon');

const computerText = document.getElementById('computer-hand-text');
const computerIcon = document.getElementById('computer-hand-icon');

const result = document.getElementById('display-result');

const rockBtn = document.getElementById('rock')
const scissorsBtn = document.getElementById('scissors')
const paperBtn = document.getElementById('paper')

const myscore = document.getElementById('my-score');
const comscore = document.getElementById('computer-score');

const resetBtn = document.getElementById('reset-button');

//2. 선언한 dom 요소에 클릭이벤트 주기
rockBtn.addEventListener('click', displayMyChoice);
scissorsBtn.addEventListener('click', displayMyChoice);
paperBtn.addEventListener('click', displayMyChoice);
resetBtn.addEventListener('click', reset);

//3. 함수가 실행될 때, 이벤트가 발생한 dom 객체에 접근하기(e.target)
function displayMyChoice(e){
    let clickedBtn = e.currentTarget.id;
    let clickedIcon = e.target;

    //4)-1 innerHTML 실습할 때 typeof 사용해서 객체 타입 보여주기
    // console.log(clickedBtn);
    // console.log(clickedIcon);

    //4. innerHTML, innerText 실습
    myHandText.innerText = clickedBtn;
    myHandIcon.className = clickedIcon.className;


    startGame(clickedBtn);  
}

function getComChoice(){
    //배열의 [0]에는 text, [1]에는 className
    const randomValue = {
        0: ["rock", "fa-regular fa-hand-back-fist"],
        1: ["scissors", "fa-regular fa-hand-scissors fa-rotate-90"],
        2: ["paper", "fa-regular fa-hand"],
    };

    const randomIndex=Math.floor(Math.random()*3);

    return randomValue[randomIndex];
}

function displayComChoice(result){
    computerText.innerText = result[0];
    computerIcon.className = result[1];

    console.log(computerIcon.className);

}


function startGame(myChoice) {
    let resultArr = getComChoice();
    let comChoiceText = resultArr[0];
    //자료형 바꾸기
    myscore.innerText = Number(myscore.innerText);
    comscore.innerText = Number(comscore.innerText);

    switch (myChoice[0]+comChoiceText[0][0]){
        case "rs":
        case 'sp':
        case 'pr':
            result.innerText='win';
            break;
        
        case "rr":
        case 'ss':
        case 'pp':
            result.innerText='tie';
            break;
        
        case "rp":
        case "sr":
        case "ps":
            result.innerText='lose';
            break;
    }
    changeScore();
    displayComChoice(resultArr);

}

function changeScore(){
    if (result.innerText == 'win'){
        myscore.innerText++;
    }
    else if (result.innerText == 'lose'){
        comscore.innerText++;
    }
}

function reset(){
    myscore.innerText = 0;
    comscore.innerText = 0;

    computerText.innerText = "";
    computerIcon.className = "";
    myHandIcon.className = "";
    myHandText.innerText = "";
}
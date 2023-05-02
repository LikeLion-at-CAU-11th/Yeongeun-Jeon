import Car from './DOM/Car.js';
import CarList from './DOM/CarList.js';
import ResultView from './DOM/ResultView.js';

const carNamesInput = document.getElementById("car-names-input");
const carNamesButton = document.getElementById("car-names-submit");
const numberInput = document.getElementById("racing-count-input");
const numberButton = document.getElementById("racing-count-submit");

let carList = new CarList();
carNamesButton.addEventListener('click', (e)=>{
    e.preventDefault();
    try{
        //리셋하기
        carList.resetList();

        //차 배열 만들기
        //trim해서 공백 제거
        const cars = carNamesInput.value.split(',').map(carName=>carName.trim());
        

        //오류 있는지 확인
        cars.forEach((car)=>{
            if(car.length === 0)throw "inputNameError";
            if(car.length> 5)throw "inputNameLengthError";
        })
        

        if(carNamesInput.value.includes(',')){    
            cars.forEach((car)=>{
                if(car){
                    let newCar = new Car(car);//입력받은 car 클래스 만들기
                    carList.addCar(newCar);
                    console.log(newCar);
                }
            });
        }
        else{//차 개수가 하나일 때
            let newCar = new Car(carNamesInput.value);
            carList.addCar(newCar);
        }
    }
    catch(error){
        if(error === "inputNameError"){
            alert("자동차 이름을 입력해주세요");
        }
        else if(error ==="inputNameLengthError"){
            alert("자동차의 이름을 5자 이내로 입력해주세요");
        }
    }
});


numberButton.addEventListener('click', (e)=>{
    console.log('clickSuccess');
    e.preventDefault();

    try{
        //초기화
        const result = document.getElementById("result");
        const gameWinner = document.getElementById("racing-winners");
        result.innerText = '📄 실행 결과';
        gameWinner.innerText = '(우승자)';
        ////차 관련 초기화
        carList.resetContent();

        //오류 처리
        if(numberInput.value.length === 0)throw "inputCountNullError";
        if(carList.cars.length===0)throw "inputCarNameError"

        const repeatNum = parseInt(numberInput.value);
        for(let i = 0;i<repeatNum;i++){
            for(let j = 0;j<carList.cars.length;j++){
                const randomNumber = Math.floor(Math.random()*10);
                if(randomNumber>=4){//4 이상이면 전진
                    carList.cars[j].go++;
                }
                carList.cars[j].arr.push(carList.cars[j].go);
                //console.log(carList.cars[j].name + ": " + carList.cars[j].go);
                //console.log(carList.cars[j].name + ": "+ carList.cars[j].arr[0]+ " "+carList.cars[j].arr[1]);
            }
        }
        

        let resultView = new ResultView(carList, repeatNum);

        console.log("최종결과");
        for(let i = 0;i<carList.cars.length;i++){
            console.log(carList.cars[i].name + ': ');
            for(let j = 0;j<carList.cars[i].arr.length;j++){
                console.log(carList.cars[i].arr[j]+' ');
            }
        }
        console.log("winner : ");
        for(let i = 0;i<carList.winners.length;i++){
            console.log(carList.winners[i]);
        }

    }
    catch(error){
        if(error === "inputCountNullError"){
            alert("시도할 횟수를 입력해주세요");
        }
        else if(error === "inputCarNameError"){
            alert("자동차 이름을 입력해주세요");
        }
    }    
})
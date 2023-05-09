class ResultView{
    constructor(carList, cnt){
        const result = document.getElementById("result");
        const gameWinner = document.getElementById("racing-winners");
        for(let i = 0;i<cnt;i++){
            const newBr = document.createElement('br');
            result.appendChild(newBr);
            console.log("viewStart");
            let j = 0;
            carList.cars.forEach((car)=>{
                let dashes = '';
                console.log(car.name + ": "+ car.arr[i]);
                for(let j = 0;j<car.arr[i];j++){
                    dashes +='-';
                }
                const newDiv = document.createElement('div');
                newDiv.innerText = `${car.name}: ${dashes}`;
                result.appendChild(newDiv);
            })


        }
        const winnerArr = carList.getWinner();

        for(let i = 0;i<winnerArr.length - 1;i++){
            gameWinner.innerText += carList.cars[winnerArr[i]].name + ', ';
        }
        gameWinner.innerText+=carList.cars[winnerArr[winnerArr.length-1]].name;
    }
}

export default ResultView;
class CarList{
    constructor(){
        this.cars=[];
        this.winners=[];
    }

    //재시작
    resetList(){
        this.cars.splice(0);
    }
    resetContent(){
        for(let i = 0;i<this.cars.length;i++){
            this.cars[i].go=0;
            this.cars[i].arr.splice(0);
            this.winners.splice(0);
        }
    }

    addCar(car){
        this.cars.push(car);
    }
    getWinner(){
        console.log('getWinnerStart')
        let maxIdx = 0;
        this.winners=[];
        for(let i = 0;i<this.cars.length;i++){
            if(this.cars[maxIdx].go===this.cars[i].go){//최댓값 여러 개면 배열에 저장
                this.winners.push(i);
            }
            else if(this.cars[maxIdx].go<this.cars[i].go){
                maxIdx = i;
                this.winners = [i];
            }
        }
        //console.log('winner : '+ arr[0] + ','+arr[1]);
        return this.winners;
    }
}

export default CarList;
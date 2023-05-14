const url = './data/data.json';
const container = document.getElementById('container');

function fetchData(){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((response)=>{
        console.log(response);

        {response.map((data)=>{//값들 하나하나씩 꺼내서 볼 수 있음
            const list = document.createElement("div");
            list.innerHTML = `제 이름은 ${data.name}이고, 저는 ${data.state}이고, 제가 좋아하는 과일은 ${data.fruit}입니다`;

            container.appendChild(list);

            //container.appendChild(list);
            console.log(data);
        })}

        // const list = document.createElement('div');
        // list.innerHTML = response;

    })
    .catch((error)=>{
        console.log(error);
        container.innerText = 'Error';
    })
}


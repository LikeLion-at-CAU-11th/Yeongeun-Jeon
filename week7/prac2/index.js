const container = document.getElementById('container');
var count = -1;

async function getData(){
    //const random = Math.floor(Math.random() * 100 + 1);
    const url =`https://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1?numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=test&arrange=A&_type=json&serviceKey=%2BGU04ux5xqM7bA505L%2BHskgdUTKJRirdm1ttr6uWYZHnpYzcV6yAPaupKDoAerYLz14sL2tcLJMOWafom9WcNA%3D%3D`;
    count++;

    const fetchData = await fetch(url);
    console.log(fetchData);

    const toJson  = await fetchData.json();
    console.log(toJson);

    const data = await toJson.response.body.items.item;
    console.log(data);

    {data.map((datas,i)=>{
        const list = document.createElement('div');
        list.id='list';

        const image = document.createElement('img');
        image.src=datas.galWebImageUrl;

        const text = document.createElement('span');
        text.innerText=`
        ${i+1+5*(count)}번째 사진
        제목: ${datas.galTitle}
        장소: ${datas.galPhotographyLocation}`

        const button =document.createElement('button');
        button.innerText='더보기';
        button.onclick=function(){
            window.location.href="detail.html?idx="+i;

        }


        container.appendChild(list);
        list.appendChild(image);
        list.appendChild(text);
        list.appendChild(button);
    })

    }
    
}
const container = document.getElementById('container');

const url = 'https://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1?numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=test&arrange=A&_type=json&serviceKey=%2BGU04ux5xqM7bA505L%2BHskgdUTKJRirdm1ttr6uWYZHnpYzcV6yAPaupKDoAerYLz14sL2tcLJMOWafom9WcNA%3D%3D';

//날짜 : galCreatetime - 파싱해서 연도/월/일
//촬영자 : galPhotographer
//키워드 : galSearchKeyword

async function getData(){
    const fetchData = await fetch(url);
    console.log(fetchData);
    
    const toJson = await fetchData.json();
    console.log(toJson);

    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get('idx');
    console.log(idx);
     
    
    const data = await toJson.response.body.items.item[idx];
    console.log(data);
    
    const dateData = data.galCreatedtime;
    const year = dateData.substring(0, 4);
    const month = dateData.substring(4, 6);
    const day = dateData.substring(6, 8);
    
    const photographerData = data.galPhotographer;
    const keywordData = data.galSearchKeyword;

    console.log(dateData);
    console.log(year);
    console.log(photographerData);
    console.log(keywordData);

    const list1 = document.createElement('div');
    list1.id='list1';
    const list2 = document.createElement('div');
    list2.id='list2';
    const list3 = document.createElement('div');
    list3.id='list3';

    const date = document.createElement('div');
    date.innerText=`날짜 : ${year}년 ${month}월 ${day}일`

    const photographer = document.createElement('div');
    photographer.innerText = `촬영자 : ${photographerData}`

    const keyword = document.createElement('div');
    keyword.innerText = `키워드 : ${keywordData}`;

    container.appendChild(list1);
    list1.appendChild(date);
    
    container.appendChild(list2);
    list2.appendChild(photographer);
    
    container.appendChild(list3);
    list3.appendChild(keyword);
    

}
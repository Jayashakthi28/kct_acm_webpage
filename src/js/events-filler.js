import { app } from "./firebase-init";
import { getDatabase, ref, get, set } from "firebase/database";
import { data } from "jquery";

const database = getDatabase(app);
let MainData=[];
let sorter=document.querySelectorAll('.year-cont select');

async function readDB(reference) {
  return await get(ref(database, reference));
}

function dateSplitter(date) {
  date = date.split("-");
  return date[2] + "-" + date[1] + "-" + date[0];
}

function Sorter(data,val){
    if(val==='asc'){
        data = data.sort((a, b) => {
            if (a["date"] > b["date"]) {
              return 1;
            } else if (b["date"] === a["date"]) {
              return 0;
            } else {
              return -1;
            }
        });
    }
    else{
        data = data.sort((a, b) => {
            if (b["date"] > a["date"]) {
              return 1;
            } else if (b["date"] === a["date"]) {
              return 0;
            } else {
              return -1;
            }
          });
    }
    return data;
}

async function DbFetcher(){
    let dataObj = await readDB("data");
    dataObj = await dataObj.val();
    return dataObj;
}

async function EventsFiller() {
  let dataObj=await DbFetcher();
  let dateObj={};
  MainData=[];
  for (let key in dataObj) {
    dataObj[key]["month"]=dataObj[key].date.split('-')[1];
    dataObj[key]["year"]=dataObj[key].date.split('-')[0];
    MainData.push(dataObj[key]);
    if(dateObj?.[dataObj[key].date]){
        dateObj[dataObj[key].date].push(dataObj[key]);
    }
    else{
        dateObj[dataObj[key].date] = [];
        dateObj[dataObj[key].date].push(dataObj[key]);
    }
  }

  await sorterFiller(dataObj);
  let data=await Sorter(MainData,'desc');
  dataFiller(data);
  SortClicker();
}


function dataFiller(data){
    document.querySelector('.main-cont').innerHTML='';
    data.forEach((d) => {
        let element = document.createElement("div");
        element.classList.add("event-cont");
        let date = dateSplitter(d["date"]);
        element.innerHTML = ` <div class="img-cont">
            <img src="${d["url"]}" alt="Event Image">
            </div>
            <div class="text-cont">
            <h1 class="event-head">
              ${d["name"]}
            </h1>
            <div class="event-des">
            </div>
            <div class="enroll-cont">
                <div class="wrapper">
                    <div class="event-date-cont">
                        <h2 class="happen-cont">Happened On:</h2>
                        <div class="date-cont">${date}</div>
                    </div>
                </div>
            </div>
          </div>`;
        element.querySelector(".event-des").textContent = d["des"];
        document.querySelector(".main-cont").appendChild(element);
      });
}


function sorterFiller(data){
    let yearArr=[];
    let MonthArr=[];
    let tempData=[];
    for(let key in data){
      tempData.push(data[key]);
    }
    tempData.forEach(d=>{
        let date=d.date.split('-');
        yearArr.push(date[0]);
        MonthArr.push(date[1]);
    })
    yearArr=[...new Set(yearArr)];
    MonthArr=[...new Set(MonthArr)];

    yearArr.forEach(d=>{
        sorter[0].innerHTML+=`<option value="${d}">${d}</option>`;
    })
    MonthArr.forEach(d=>{
        sorter[1].innerHTML+=`<option value="${d}">${d}</option>`;
    })
    SortClicker();
}

function filter(year,month){
    let data=MainData;
    if(month!=="00"){
        data=data.filter(t=>t.month===month);
    }
    if(year!=="0000"){
        data=data.filter(t=>t.year===year);
    }
    return data;
}


function SortClicker(){
   sorter.forEach(d=>{
       d.addEventListener('input',()=>{
           let year=sorter[0].value;
           let month=sorter[1].value;
           let sortBy=sorter[2].value;
           let filterData=filter(year,month);
           filterData=Sorter(filterData,sortBy);
           dataFiller(filterData);
       })
   })

}
EventsFiller();

import { app } from "./firebase-init";
import { getDatabase, ref, get} from "firebase/database";

const database=getDatabase(app);

async function readDB(reference) {
    return await get(ref(database, reference));
}

function vanillaTilter(){
    const w = screen.width;
    if(w > 1089) { 
    VanillaTilt.init(document.querySelectorAll(".container"), {
    max: 30,
    speed: 3000
    })}
    else {
        console.log(w);
    }
}


function sorter(val){
    val=val.sort((a,b)=>{
        if(+a['order']>+b['order']){
            return 1;
        }
        else if(+a['order']<+b['order']){
            return -1;
        }
        else{
            return 0;
        }
    });
    return val;
}

function dataFiller(val,teamData){
    teamData[val]=sorter(teamData[val]);
    let temp=``;
    teamData[val].forEach(d => {
        temp+=`<div class="container">
        <div class="card">
          <div class="content">
            <div class="imgbx">
              <img
                src="${d['img']}"
                alt=""
              />
            </div>
            <div class="content-box">
              <h3>${d['name']}<br /><span>${d['role']}</span></h3>
            </div>
          </div>
          <ul class="soc-i">
            ${
              ((d["github"].trim()!=="")?(`
              <li style="--i: 1">
                <a href="${d["github"]}" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
              </li>`):"")
            }
            ${
                ((d["linkedin"].trim()!=="")?(`
                <li style="--i: 2">
                  <a href="${d["linkedin"]}" target="_blank">
                      <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>`):"")
            }
            ${
                ((d["mail"].trim()!=="")?(`
                <li style="--i: 1">
                  <a href="mailto:${d["mail"]}" target="_blank">
                      <i class="far fa-envelope"></i>
                  </a>
                </li>`):"")
            }
          </ul>
        </div>
      </div>`
    });
    document.querySelector(".team-members").innerHTML=temp;
    vanillaTilter();
}

async function teamFiller(){
    let data=await readDB("team");
    data=await data.val();
    let teamData={};
    for(let key in data){
        let temp=data[key]["year"];
        if(!teamData[temp]){
            teamData[temp]=[];
        }
        teamData[temp].push(data[key]);
    }
    let temp="";
    for(let key in teamData){
        temp+=`<option value="${key}" selected>${key}</option>`
    }
    let yearCont= document.querySelector("#year");
    yearCont.innerHTML=temp;
    console.log(yearCont.value);
    dataFiller(yearCont.value,teamData);
    temp="";
    yearCont.addEventListener("change",(e)=>{
        dataFiller(e.target.value,teamData);
    })
}

teamFiller();
import { app } from "./firebase-init";
import { getDatabase, ref, get} from "firebase/database";

const database=getDatabase(app);

async function readDB(reference) {
    return await get(ref(database, reference));
}

export async function blogFiller(){
    let data=await readDB("blog");
    data=await data.val();
    let arr=[];
    for(let key in data){
        arr.push(data[key]);
    }
    let t=``;
    arr.forEach(d=>{
        t+=`<div class="blog-card">
        <div class="img-cont">
            <img src="${d['img']}" alt="">
        </div>
        <a href="${d['url']}" target="blank"><h2>${d['title']}</h2></a>
    </div>`
    });
    document.querySelector('.blog-cont').innerHTML=t;
}


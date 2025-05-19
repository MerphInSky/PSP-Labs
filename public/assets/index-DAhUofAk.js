(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();class m{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card">
                    <img class="card_img_top" src="${t.src}" alt="картинка">
                    <div class="card_body">
                        <h5 class="card_title">${t.title}</h5>
                        <p class="card_text">Количество игр: ${t.games}</p>
                        <div style="display: flex; flex-direction: column; gap:8px">
                        <div style="display: flex; justify-content:space-between; width: 260px">
                            <button class="btn" id="click-card-${t.id}" data-id="${t.id}">Подробнее</button>
                            <button class="btn" id="delete-card-${t.id}" data-id="${t.id}">Удалить</button>
                        </div>
                        <button class="btn" style="width:230px" id="redact-card-${t.id}" data-id="${t.id}">Редактировать класс</button>
                        </div>
                    </div>
                </div>
            `}addListeners(t,e,a,r){document.getElementById(`click-card-${t.id}`).addEventListener("click",e),document.getElementById(`delete-card-${t.id}`).addEventListener("click",a),document.getElementById(`redact-card-${t.id}`).addEventListener("click",r)}render(t,e,a,r){const s=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t,e,a,r)}}class u{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card enlarged">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${t.src}" class="card_img_enlarged" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card_body">
                                <h5 class="card_title">${t.title}</h5>
                                <p class="card_text" style="max-width:90%;">${t.text}</p>
                                <p class="games_num">Количество игр: ${t.games}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class g{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="btn" type="button">Назад</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class f{constructor(){this.baseUrl="http://localhost:3000"}getCharacters(){return`${this.baseUrl}/characters`}getFilteredCharacters(t){return`${this.baseUrl}/characters?title=${t}`}getCharacterById(t){return`${this.baseUrl}/characters/${t}`}createCharacter(){return`${this.baseUrl}/characters`}removeCharacterById(t){return`${this.baseUrl}/characters/${t}`}updateCharacterById(t){return`${this.baseUrl}/characters/${t}`}}const i=new f;class y{constructor(t,e){this.parent=t,this.id=e}get pageRoot(){return document.getElementById("character_page")}getHTML(){return`
                <div id="character_page"></div>
            `}async getData(){try{const t=await fetch(i.getCharacterById(this.id));if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const e=await t.json();this.renderData(e)}catch(t){console.error("Failed to get character data:",t)}}renderData(t){new u(this.pageRoot).render(t)}clickBack(){new o(this.parent).render()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new g(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}class p{constructor(t,e){this.parent=t,this.id=e}get pageRoot(){return document.getElementById("redact_page")}async getData(){if(this.id==-1)this.renderData({src:"https://th.bing.com/th/id/R.c057941b609ab015ece7957ba4fc2908?rik=Mpv8DKgmmU%2bMxA&pid=ImgRaw&r=0",title:"Название класса",text:"Описание класса",games:0});else try{const t=await fetch(i.getCharacterById(this.id));if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const e=await t.json();this.renderData(e)}catch(t){console.error("Failed to get character data:",t)}}getHTML(){return`
                <div id="redact_page"></div>
            `}renderData(t){new u(this.pageRoot).render(t),document.getElementById("title_inp").value=t.title,document.getElementById("src_inp").value=t.src,document.getElementById("text_inp").value=t.te,document.getElementById("games_inp").value=t.games}clickBack(){new o(this.parent).render()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.parent.insertAdjacentHTML("beforeend",`
                <div class="inp_form" style="width: 600px; margin: 10px">
                    <div class="line">
                        <p class="plain_text"> Название класса:  </p>
                        <input type="text" class="input" id="title_inp" placeholder="название" style="width: 250px">
                    </div>
                    <div class="line">
                        <p class="plain_text"> Ссылка на изображение:  </p>
                        <input type="url" class="input" id="src_inp" placeholder="ссылка" style="width: 250px">
                    </div>
                    <div class="line">
                        <p class="plain_text"> Описание класса:  </p>
                        <textarea class="input" id="text_inp" placeholder="описание" style="width: 250px"></textarea>
                    </div>
                    <div class="line">
                        <p class="plain_text"> Количество игр:  </p>
                        <input type="number" class="input" id="games_inp" placeholder="количество" min="0">
                    </div>
                    <button class="btn" id="save">Сохранить</button>
                    </div>
            `),new g(this.pageRoot).render(this.clickBack.bind(this)),document.getElementById("save").addEventListener("click",this.saveData.bind(this)),this.getData()}async saveData(){const t=document.getElementById("title_inp"),e=document.getElementById("src_inp"),a=document.getElementById("text_inp"),r=document.getElementById("games_inp"),s={src:e.value,title:t.value,text:a.value,games:r.value==""?0:r.value};if(this.id==-1)try{const n=await fetch(i.getCharacters());if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);const d=await n.json(),l=d.length>0?d[d.length-1].id+1:1,h=await fetch(i.createCharacter(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:l,...s})});if(!h.ok)throw new Error(`HTTP error! Status: ${h.status}`);this.id=l,this.render()}catch(n){console.error("Failed to add new character:",n)}else try{const n=await fetch(i.updateCharacterById(this.id),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);this.render()}catch(n){console.error("Failed to update character data:",n)}}}class o{constructor(t,e){this.parent=t,this.min_filter=0,this.max_filter=1e5,this.title_filter=""}get pageRoot(){return document.getElementById("main_page")}getHTML(){return`
                <div id="main_page" class="main_page">
                    <div class="inp_form">
                    <div style="display: flex; flex-direction: row; gap: 5px;">
                        <p class="plain_text"> Количество игр: от </p>
                        <input type="number" class="input" id="min_num" placeholder="минимум" min="0">
                        <p class="plain_text"> до </p>
                        <input type="number" class="input" id="max_num" placeholder="максимум" min="0">
                    </div>
                    <div style="display: flex; flex-direction: row; gap: 5px;">
                        <p class="plain_text"> Поиск по названию классов:</p>
                        <input class="input" id="title_filter" placeholder="Введите название">
                        <button class="btn" id="new_card">Создать новый класс</button>
                    </div>
                    </div>
                    <div class="gallery"></div>
                </div>
            `}async getData(){if(this.title_filter)try{const t=await fetch(i.getFilteredCharacters(this.title_filter));if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const e=await t.json();this.renderData(e.filter(a=>a.games>=this.min_filter&&a.games<=this.max_filter))}catch(t){console.error("Failed to get filtered character data:",t)}else try{const t=await fetch(i.getCharacters());if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const e=await t.json();this.renderData(e.filter(a=>a.games>=this.min_filter&&a.games<=this.max_filter))}catch(t){console.error("Failed to get character data:",t)}}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t);const e=document.getElementById("new_card"),a=document.getElementById("min_num"),r=document.getElementById("max_num"),s=document.getElementById("title_filter");a.addEventListener("input",this.updateMin.bind(this)),r.addEventListener("input",this.updateMax.bind(this)),e.addEventListener("click",this.addCard.bind(this)),s.addEventListener("input",this.searchName.bind(this)),this.getData()}renderData(t){this.pageRoot.querySelector(".gallery").innerHTML="",t.forEach(e=>{new m(this.pageRoot.querySelector(".gallery")).render(e,this.openCard.bind(this),this.removeCard.bind(this),this.redactWindow.bind(this))})}updateMin(t){this.min_filter=parseInt(t.target.value),t.target.value==""&&(this.min_filter=0),this.getData()}updateMax(t){this.max_filter=parseInt(t.target.value),t.target.value==""&&(this.max_filter=1e5),this.getData()}searchName(t){this.title_filter=t.target.value,this.getData()}openCard(t){const e=t.target.dataset.id;new y(this.parent,e).render()}redactWindow(t){const e=t.target.dataset.id;new p(this.parent,e).render()}addCard(){new p(this.parent,-1).render()}async removeCard(t){try{const e=await fetch(i.removeCharacterById(t.target.dataset.id),{method:"DELETE"});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`)}catch(e){console.error("Failed to update character data:",e)}this.getData()}}const v=document.getElementById("root"),_=new o(v);_.render();

import{a as h,i as r,A as $}from"./assets/vendor-DCqp26N8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&n(p)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();async function C(e,s=1){const t=window.innerWidth<1440?8:9,o={page:Math.max(1,Number(s)||1),limit:t};return e&&(o.categoryId=e),(await h.get("https://paw-hut.b.goit.study/api/animals/",{params:o})).data}async function P(){return(await h.get("https://paw-hut.b.goit.study/api/categories/",{})).data}const q=document.querySelector(".pets-category-list"),b=document.querySelector(".pets-list"),v=document.querySelector(".loader"),d=document.querySelector(".more-pets-button");function B(e){const s=e.map(t=>`<li class="pet-list-item">
            <div class="pet-item-link">
                <img class="pet-image" src="${t.image}" alt="${t.shortDescription}"/>
            </div>
            <div class="info-container">
                <p class="pet-info species">${t.species}</p>
                <p class="pet-info name">${t.name}</p>
                <div class="pet-info category">${t.categories.map(n=>`<span class="category">${n.name}</span>`).join(" ")}
                </div>
                <p class="pet-info age-gender"><span class="age">${t.age}</span class="gender"><span>${t.gender}</span></p>
                <p class="pet-info behavior">${t.behavior} ${t.shortDescription}</p>
            </div>
            <div class="button-container animated-button ligth">
                <a class="more-pet-info" data-id="${t._id}">Дізнатись більше</a>
            </div>
        </li>`).join("");b.insertAdjacentHTML("beforeend",s)}function L(){b.innerHTML=""}function w(){v.style.display="block"}function M(){v.style.display="none"}function c(){d.style.display="none"}function O(){d.style.display="block"}function S(){const e=document.querySelector(".pet-list-item");if(!e)return;const s=e.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}const m=["Всі","Собаки","Коти","Кролики","Гризуни","Птахи","Тварини з особливими потребами","Терміново шукають дім"];function A(e){const t=e.slice().sort((n,o)=>m.indexOf(n.name)-m.indexOf(o.name)).map(n=>`
            <li class="category-list-item">
                <button class="pet-category-button animated-button dark"
                    type="button"
                    data-category-id="${n._id}">
                    ${n.name}
                </button>
            </li>
        `).join("");q.insertAdjacentHTML("beforeend",t)}let l=1,u="",a=[];const g=document.querySelector(".pets-list");document.querySelector(".animal-details-modal");const y=document.querySelector(".pets-category-list"),I=document.querySelector(".pet-category-button.all");I.classList.add("is-deactive");j();f(u,l);y.addEventListener("click",e=>{const s=e.target.closest(".pet-category-button");if(!s)return;const t=y.querySelector(".pet-category-button.is-deactive");t&&t.classList.remove("is-deactive"),s.classList.add("is-deactive"),u=s.dataset.categoryId||"",l=1,c(),L(),w(),f(u,l)});d&&d.addEventListener("click",e=>{e.preventDefault(),c(),w(),l++,f(u,l)});g==null||g.addEventListener("click",e=>{const s=e.target.closest(".more-pet-info");if(!s)return;e.preventDefault();const t=s.dataset.id;window.dispatchEvent(new CustomEvent("open-animal-modal",{detail:{petId:t}}))});async function f(e,s){try{c();const t=await C(e,s);if(t.animals.length===0){r.info({message:"Тварин не знайдено за обраним фільтром.",position:"topRight"}),L(),c();return}a=t.animals,E(a),B(a),s>1&&S();const n=Math.ceil(t.totalItems/t.limit);s>=n?(c(),r.info({message:"Ви переглянули всі доступні результати."})):O()}catch(t){r.error({message:(t==null?void 0:t.message)||"Сталася помилка під час завантаження тварин.",position:"topRight"})}finally{M()}}async function j(){try{const e=await P();if(!Array.isArray(e)||e.length===0){r.info({message:"Категорії не знайдено.",position:"topRight"});return}a=e,A(a)}catch(e){r.error({message:(e==null?void 0:e.message)||"Сталася помилка під час завантаження категорій.",position:"topRight"})}finally{}}function E(e){a=Array.isArray(e)?e:[]}new $("#faq-accordion",{duration:300,showMultiple:!1,openOnInit:[]});
//# sourceMappingURL=index.js.map

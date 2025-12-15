import{a as h,i as r}from"./assets/vendor-CZz_1llp.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();async function $(e,s=1){const t=window.innerWidth<1440?8:9,o={page:Math.max(1,Number(s)||1),limit:t};return e&&(o.categoryId=e),(await h.get("https://paw-hut.b.goit.study/api/animals/",{params:o})).data}async function C(){return(await h.get("https://paw-hut.b.goit.study/api/categories/",{})).data}const P=document.querySelector(".pets-category-list"),b=document.querySelector(".pets-list"),v=document.querySelector(".loader"),d=document.querySelector(".more-pets-button");function q(e){const s=e.map(t=>`<li class="pet-list-item">
            <div class="pet-item-link">
                <img class="pet-image" src="${t.image}" alt="${t.shortDescription}"/>
            </div>
            <div class="info-container">
                <p class="pet-info species">${t.species}</p>
                <p class="pet-info name">${t.name}</p>
                <div class="pet-info category">${t.categories.map(i=>`<span class="category">${i.name}</span>`).join(" ")}
                </div>
                <p class="pet-info age-gender"><span class="age">${t.age}</span class="gender"><span>${t.gender}</span></p>
                <p class="pet-info behavior">${t.behavior} ${t.shortDescription}</p>
            </div>
            <div class="button-container animated-button ligth">
                <a class="more-pet-info" data-id="${t._id}">Дізнатись більше</a>
            </div>
        </li>`).join("");b.insertAdjacentHTML("beforeend",s)}function L(){b.innerHTML=""}function w(){v.style.display="block"}function B(){v.style.display="none"}function c(){d.style.display="none"}function S(){d.style.display="block"}function M(){const e=document.querySelector(".pet-list-item");if(!e)return;const s=e.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}const y=["Всі","Собаки","Коти","Кролики","Гризуни","Птахи","Тварини з особливими потребами","Терміново шукають дім"];function O(e){const t=e.slice().sort((i,o)=>y.indexOf(i.name)-y.indexOf(o.name)).map(i=>`
            <li class="category-list-item">
                <button class="pet-category-button animated-button dark"
                    type="button"
                    data-category-id="${i._id}">
                    ${i.name}
                </button>
            </li>
        `).join("");P.insertAdjacentHTML("beforeend",t)}let l=1,u="",a=[];const g=document.querySelector(".pets-list");document.querySelector(".animal-details-modal");const f=document.querySelector(".pets-category-list"),A=document.querySelector(".pet-category-button.all");A.classList.add("is-deactive");I();m(u,l);f.addEventListener("click",e=>{const s=e.target.closest(".pet-category-button");if(!s)return;const t=f.querySelector(".pet-category-button.is-deactive");t&&t.classList.remove("is-deactive"),s.classList.add("is-deactive"),u=s.dataset.categoryId||"",l=1,c(),L(),w(),m(u,l)});d&&d.addEventListener("click",e=>{e.preventDefault(),c(),w(),l++,m(u,l)});g==null||g.addEventListener("click",e=>{const s=e.target.closest(".more-pet-info");if(!s)return;e.preventDefault();const t=s.dataset.id;window.dispatchEvent(new CustomEvent("open-animal-modal",{detail:{petId:t}}))});async function m(e,s){try{c();const t=await $(e,s);if(t.animals.length===0){r.info({message:"Тварин не знайдено за обраним фільтром.",position:"topRight"}),L(),c();return}a=t.animals,j(a),q(a),s>1&&M();const i=Math.ceil(t.totalItems/t.limit);s>=i?(c(),r.info({message:"Ви переглянули всі доступні результати."})):S()}catch(t){r.error({message:(t==null?void 0:t.message)||"Сталася помилка під час завантаження тварин.",position:"topRight"})}finally{B()}}async function I(){try{const e=await C();if(!Array.isArray(e)||e.length===0){r.info({message:"Категорії не знайдено.",position:"topRight"});return}a=e,O(a)}catch(e){r.error({message:(e==null?void 0:e.message)||"Сталася помилка під час завантаження категорій.",position:"topRight"})}finally{}}function j(e){a=Array.isArray(e)?e:[]}
//# sourceMappingURL=index.js.map

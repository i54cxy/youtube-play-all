(()=>{"use strict";const e=async()=>{const e=(()=>{const e=window.location.href,t=e.indexOf("/@");if(-1!==t){const n=e.indexOf("/",t+1);return-1!==n?e.substring(t+2,n):e.substring(t+2)}})();if(e){const t=`https://www.googleapis.com/youtube/v3/channels?key=AIzaSyDel30Yj7Gqi7V8hIypFi1TLhF7uaZIsIk&forHandle=${e}&part=id`;console.log(t);try{const e=await fetch(t);if(!e.ok)throw new Error(`Response status: ${e.status}`);const n=(await e.json()).items;if(n?.length){(async e=>{const t=await(n="yt-flexible-actions-view-model",new Promise((e=>{if(document.querySelector(n))return e(document.querySelector(n));const t=new MutationObserver((()=>{document.querySelector(n)&&(t.disconnect(),e(document.querySelector(n)))}));t.observe(document.body,{childList:!0,subtree:!0})})));var n;if(t&&[...t.children].every((e=>"true"!==e.dataset.injectedByPABFYT))){const n=document.createElement("div");n.dataset.injectedByPABFYT="true",console.log(n),n.className="yt-flexible-actions-view-model-wiz__action";const o=document.createElement("button-view-model");o.className="yt-spec-button-view-model";const s=document.createElement("button");s.className="yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m";const c=document.createElement("div");c.className="yt-spec-button-shape-next__button-text-content",c.innerHTML="Play all",n.style.opacity="0",n.style["animation-fill-mode"]="forwards";const i="https://www.youtube.com/playlist?list=UU"+e.slice(2);s.onclick=()=>{window.open(i)},s.appendChild(c),o.appendChild(s),n.appendChild(o),t.appendChild(n),n.animate([{opacity:1}],{duration:100,fill:"forwards",easing:"ease-in"})}})(n[0].id)}}catch(e){}}};window.onload=()=>{let t=document.location.href;const n=document.querySelector("body"),o=new MutationObserver((()=>{t!==document.location.href&&(t=document.location.href,setTimeout(e,500))}));n&&o.observe(n,{childList:!0,subtree:!0})},e()})();
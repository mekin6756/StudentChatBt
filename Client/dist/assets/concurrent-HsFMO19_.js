import{w as c}from"./writeEffect-bNTYiwVv.js";import{a as d}from"./animationSetup-vxDfor0O.js";import"./index-H1nhYkNf.js";const u=(t,s)=>s.text.length-t.text.length,a=t=>t.sort(u)[0].currentNode,l=(t,s)=>{new MutationObserver(r=>{r.forEach(o=>{const n=o.type==="attributes",i=o.target.classList.contains("finished-typing");n&&i&&s()})}).observe(t,{attributes:!0,childList:!0,subtree:!0})},f=(t,s)=>{const{options:e,elements:r}=d(t,s),o=a(r);l(o,()=>e.dispatch("done"));for(const n of r)c(n,e).then(()=>{e.keepCursorOnFinish?n.currentNode!==o?n.currentNode.classList.replace("typing","finished-typing"):e.dispatch("done"):n.currentNode.classList.replace("typing","finished-typing"),typeof e.keepCursorOnFinish=="number"&&setTimeout(()=>{n.currentNode.classList.replace("typing","finished-typing")},e.keepCursorOnFinish)});return{update(){},destroy(){}}};export{f as default};

/* Community demo: no external requests, email, CRM or private Hermes calls. */
(() => {
"use strict";
const canvas=document.getElementById("world"),ctx=canvas.getContext("2d"),events=document.getElementById("events");
const W=canvas.width,H=canvas.height;
const names=["Aster","Boreal","Cirrus","Delta","Ember","Flora","Gaia","Helio","Iris","Juniper","Kite","Lumen","Moss","Nova","Orion","Piper"];
const offersList=["Research","Prototype","Partnership","Innovation","Licensing","Discovery"];
let people=[],offers=[],orders=[],tick=0,collisions=0,running=true,speed=2,mutation=0;
const rand=(a,b)=>a+Math.random()*(b-a);
function item(kind,name,i){return {kind,id:kind+"-"+(i+1),name,x:rand(40,W-40),y:rand(40,H-40),vx:rand(-1.5,1.5),vy:rand(-1.5,1.5),radius:kind==="person"?8:11,immuneUntil:0,contacts:0};}
function log(s){const li=document.createElement("li");li.textContent=s;events.prepend(li);while(events.children.length>45)events.lastChild.remove();}
function update(){document.getElementById("collisions").textContent=collisions;document.getElementById("orders").textContent=orders.length;document.getElementById("days").textContent=(tick/600).toFixed(1);}
function reset(){people=names.map((n,i)=>item("person",n,i));offers=offersList.map((n,i)=>item("offer",n,i));orders=[];tick=0;collisions=0;events.replaceChildren();log("Ecosystem initialized with synthetic people and offers");update();}
function emit(p,o){const key=p.id+":"+o.id+":"+Math.floor(tick/900);if(orders.some(x=>x.idempotency_key===key))return;orders.push({version:"1.0",type:"prepare_outreach",idempotency_key:key,source:"organic-market-physics-demo",created_at:new Date().toISOString(),mode:"draft_only",person:{id:p.id,display_name:p.name},offer:{id:o.id,name:o.name},context:{trigger:"organic_collision",simulation_day:tick/600}});p.contacts++;p.immuneUntil=tick+450;log("✦ "+p.name+" + "+o.name+": prepare_outreach (draft only)");}
function move(e){const jitter=.045+mutation*.022;e.vx+=rand(-jitter,jitter);e.vy+=rand(-jitter,jitter);const lim=mutation?2.7:1.8,v=Math.hypot(e.vx,e.vy);if(v>lim){e.vx=e.vx/v*lim;e.vy=e.vy/v*lim;}e.x+=e.vx;e.y+=e.vy;if(e.x<18||e.x>W-18){e.vx*=-1;e.x=Math.max(18,Math.min(W-18,e.x));}if(e.y<18||e.y>H-18){e.vy*=-1;e.y=Math.max(18,Math.min(H-18,e.y));}}
function step(){if(!running)return;for(let i=0;i<speed;i++){tick++;for(const e of [...people,...offers])move(e);for(const p of people)for(const o of offers){if(Math.hypot(p.x-o.x,p.y-o.y)<p.radius+o.radius){collisions++;if(tick>=p.immuneUntil)emit(p,o);p.vx*=-1;o.vx*=-1;}}}update();}
function draw(){ctx.clearRect(0,0,W,H);ctx.fillStyle="#081b27";ctx.fillRect(0,0,W,H);ctx.strokeStyle="#153244";ctx.lineWidth=1;for(let x=30;x<W;x+=48){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}for(let y=30;y<H;y+=48){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}for(const p of people)for(const o of offers){const d=Math.hypot(p.x-o.x,p.y-o.y);if(d<90){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(o.x,o.y);ctx.strokeStyle="rgba(113,214,211,"+((1-d/90)*.32)+")";ctx.stroke();}}for(const e of [...people,...offers]){const immune=e.kind==="person"&&tick<e.immuneUntil;ctx.beginPath();ctx.arc(e.x,e.y,e.radius,0,Math.PI*2);ctx.fillStyle=e.kind==="offer"?"#ffc078":immune?"#747a98":"#75e4f4";ctx.fill();if(e.kind==="offer"){ctx.strokeStyle="#ffdfad";ctx.strokeRect(e.x-5,e.y-5,10,10);}else{ctx.strokeStyle=immune?"#67748b":"#55afc0";ctx.beginPath();ctx.arc(e.x,e.y,e.radius+4,0,Math.PI*2);ctx.stroke();}}ctx.fillStyle="#a4b7c6";ctx.font="12px system-ui";ctx.fillText("DRIFT → COLLISION → IMMUNITY → DRAFT ORDER",18,H-17);}
function frame(){step();draw();requestAnimationFrame(frame);}
document.getElementById("toggle").onclick=()=>{running=!running;document.getElementById("toggle").textContent=running?"Pause":"Resume";};
document.getElementById("reset").onclick=reset;
document.getElementById("mutate").onclick=()=>{mutation=(mutation+1)%4;log("Physics mutation "+mutation+" applied");};
document.getElementById("speed").oninput=e=>{speed=Number(e.target.value);};
document.getElementById("export").onclick=()=>{const blob=new Blob([JSON.stringify({schema:"organic-market-physics/orders/v1",orders},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="draft-orders.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
reset();requestAnimationFrame(frame);
})();
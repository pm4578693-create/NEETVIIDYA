// ---- Settings: edit your faculty here ----
// photo: put the image in the same folder and write its file name, e.g. "photo-physics.jpg". Leave "" to show initials.
const FACULTY = [
  {name:"Ramij Khan", subject:"Physics", topic:"Specially in Mechanical Physics", photo:"bheswa.jpg",
   points:["B.Sc in Physics (running)","WBJEE qualified, JEE qualified","JENPAS UG rank 928","Multiple competitive exam experience"],
   quote:"Physics is not just a subject, it's the language of the universe."},
  {name:"Bheshma Das", subject:"Chemistry", topic:"Organic Chemistry", photo:"bheswa.jpg",
   points:["IIT Madras, Data Science and Applications (running)","B.Sc in Chemistry (running)","IAT (IISER Aptitude Test) AIR 463 (category)","Multiple competitive exam experience"],
   quote:"Chemistry is not just a subject, it's the art of understanding matter."}
];
const SUBJECTS = ["All","Physics","Chemistry"];

// ---- Render faculty + filter tabs ----
const grid = document.getElementById("faculty-grid"), tabs = document.getElementById("tabs");
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
function show(sub){
  tabs.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", t.dataset.c === sub));
  const list = FACULTY.filter(p => sub === "All" || p.subject === sub);
  grid.innerHTML = list.length ? list.map(p => `<div class="card fac">
    ${p.photo ? `<img class="photo" src="${p.photo}" alt="${p.name}">` : `<div class="avatar" aria-hidden="true">${initials(p.name)}</div>`}
    <span class="badge">${p.subject}</span>
    <h3>${p.name}</h3>
    <div class="dur">${p.topic}</div>
    <ul class="feat">${p.points.map(x => `<li>${x}</li>`).join("")}</ul>
    <p class="quote">"${p.quote}"</p></div>`).join("") : '<p class="sub">Faculty coming soon.</p>';
}
tabs.innerHTML = SUBJECTS.map(c => `<button class="tab" data-c="${c}">${c}</button>`).join("");
tabs.onclick = e => { if(e.target.dataset.c) show(e.target.dataset.c); };
show("All");

// ---- Mobile menu ----
const menuBtn = document.querySelector(".menu-btn"), navLinks = document.getElementById("nav-links");
menuBtn.onclick = () => { const o = navLinks.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", o); };

document.getElementById("yr").textContent = new Date().getFullYear();

// ---- Particle background ----
(function(){
  const c=document.getElementById("bg"),x=c.getContext("2d");
  const still=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w,h,pts=[],mouse={x:-999,y:-999};
  function size(){w=c.width=innerWidth;h=c.height=innerHeight;
    pts=Array.from({length:Math.min(90,Math.floor(w*h/16000))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}));}
  addEventListener("resize",size);
  addEventListener("mousemove",e=>{mouse.x=e.clientX;mouse.y=e.clientY});
  function draw(){
    x.clearRect(0,0,w,h);
    for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
      x.fillStyle="rgba(127,224,214,.8)";x.beginPath();x.arc(p.x,p.y,1.8,0,7);x.fill();}
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
        if(d<120){x.strokeStyle=`rgba(127,224,214,${.25*(1-d/120)})`;x.beginPath();x.moveTo(pts[i].x,pts[i].y);x.lineTo(pts[j].x,pts[j].y);x.stroke();}}
      const m=Math.hypot(pts[i].x-mouse.x,pts[i].y-mouse.y);
      if(m<160){x.strokeStyle=`rgba(255,194,51,${.5*(1-m/160)})`;x.beginPath();x.moveTo(pts[i].x,pts[i].y);x.lineTo(mouse.x,mouse.y);x.stroke();}
    }
    if(!still)requestAnimationFrame(draw);
  }
  size();draw();
})();
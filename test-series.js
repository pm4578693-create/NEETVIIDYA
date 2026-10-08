// ---- Settings: edit your test series here ----
const WA_NUMBER = "917439685658"; // country code + number, no + or spaces
const TESTS = [
  {name:"Full Syllabus Mock Series", cat:"Full Length", count:"30 tests", price:"Rs 1,999", old:"Rs 2,999",
   desc:"Full-length NEET papers of 180 questions with detailed solutions.",
   features:["Real exam pattern","All India rank estimate","Detailed solutions","Performance analysis"]},
  {name:"Subject-wise Test Series", cat:"Subject-wise", count:"45 tests", price:"Rs 1,499", old:"Rs 2,199",
   desc:"Separate tests for Physics, Chemistry and Biology to fix weak subjects.",
   features:["15 tests per subject","Topic-wise analysis","Solutions in PDF","Weekly schedule"]},
  {name:"Chapter-wise Test Series", cat:"Chapter-wise", count:"90 tests", price:"Rs 999", old:"Rs 1,599",
   desc:"Short tests after every chapter to build strong basics.",
   features:["Based on NCERT","Instant score","Previous year questions","Doubt support"]}
];
const CATS = ["All","Full Length","Subject-wise","Chapter-wise"];

const grid = document.getElementById("ts-grid"), tabs = document.getElementById("tabs");
function show(cat){
  tabs.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", t.dataset.c === cat));
  grid.innerHTML = TESTS.map((t,i) => ({t,i})).filter(o => cat === "All" || o.t.cat === cat).map(({t,i}) => {
    const msg = encodeURIComponent(`Hello NEETVIDYA, I want to enroll in ${t.name}.`);
    return `<div class="card"><span class="badge">${t.cat}</span><h3>${t.name}</h3>
      <div class="dur">${t.count}</div><p>${t.desc}</p>
      <ul class="feat">${t.features.map(f => `<li>${f}</li>`).join("")}</ul>
      <div class="price">${t.price}<span class="old">${t.old}</span></div>
      <div class="acts"><a class="btn ghost" href="demo-test.html?id=${i}">Free Demo Test</a>
      <a class="btn alt" target="_blank" rel="noopener" href="https://wa.me/${WA_NUMBER}?text=${msg}">Enroll on WhatsApp</a></div></div>`;
  }).join("");
}
tabs.innerHTML = CATS.map(c => `<button class="tab" data-c="${c}">${c}</button>`).join("");
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
// ---- Settings: edit your courses here ----
const WA_NUMBER = "917439685658"
; // country code + number, no + or spaces
const COURSES = [
  {name:"DURBAR", cat:"Class 11", duration:"12 months", price:"Rs 49,999", old:"Rs 59,999",
   desc:"A focused NEET preparation programme for Class 12 students and droppers.",
   features:["NCERT mastery","Mock Tests","Daily DPP","Doubt support"]},
  {name:"UDYOG", cat:"Class 11", duration:"24 months", price:"Rs 79,999", old:"Rs 89,999",
   desc:"Class 11 syllabus with revision and NEET exam-level practice.",
   features:["Live and recorded lectures","Chapter-wise PYQs","Monthly full tests","Doubt support"]},
  {name:"PROTTOY", cat:"Board Student", duration:"12 months", price:"Rs 14,999", old:"Rs 18,999",
   desc:"It is for West Bengal Board Student",
   features:["Complete syllabus in 12 months","Daily practice problems","Fortnightly mock tests","Mentor sessions"]},
  {name:"SHIKHAR TEST SERIES", cat:"Test Series", duration:"6 months", price:"Rs 1,999", old:"Rs 2,999",
   desc:"30 full-length NEET mock tests with performance analysis.",
   features:["30 full-length tests","All India rank estimate","Detailed solutions","Topic-wise analysis"]}
];
const CATS = ["All","Class 11","Class 12","Dropper","Test Series"];

// ---- Render courses + filter tabs ----
const grid = document.getElementById("course-grid"), tabs = document.getElementById("tabs");
function show(cat){
  tabs.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", t.dataset.c === cat));
  grid.innerHTML = COURSES.filter(c => cat === "All" || c.cat === cat).map(c => {
    const msg = encodeURIComponent(`Hello NEETVIDYA, I want to enroll in ${c.name}.`);
    return `<div class="card"><span class="badge">${c.cat}</span><h3>${c.name}</h3>
      <div class="dur">${c.duration}</div><p>${c.desc}</p>
      <ul class="feat">${c.features.map(f => `<li>${f}</li>`).join("")}</ul>
      <div class="price">${c.price}<span class="old">${c.old}</span></div>
      <a class="btn alt" target="_blank" rel="noopener" href="https://wa.me/${WA_NUMBER}?text=${msg}">Enroll on WhatsApp</a></div>`;
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
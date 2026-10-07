// ---- Settings: change these ----
const EXAM_DATE = "2027-05-02T14:00:00"; // placeholder, set the real NEET date
const COURSES = [
  {name:"Foundation Batch", desc:"Class 11 NCERT-based, full syllabus.", price:"Rs 4,999"},
  {name:"Target Batch", desc:"Class 12 plus revision and weekly tests.", price:"Rs 6,999"},
  {name:"Test Series", desc:"30 full-length mock tests with analysis.", price:"Rs 1,999"}
];
const QUESTIONS = [
  {q:"Powerhouse of the cell is the:", o:["Ribosome","Mitochondrion","Golgi body","Lysosome"], a:1},
  {q:"SI unit of force is:", o:["Joule","Pascal","Newton","Watt"], a:2},
  {q:"The pH of pure water at 25 C is:", o:["5","7","9","14"], a:1},
  {q:"Which blood group is the universal donor?", o:["AB+","A-","B+","O-"], a:3},
  {q:"Speed of light in vacuum (approx.):", o:["3 x 10^6 m/s","3 x 10^8 m/s","3 x 10^10 m/s","3 x 10^5 m/s"], a:1}
];
const SPLIT = [["Biology",0.4],["Physics",0.3],["Chemistry",0.3]];

// ---- Countdown ----
function tick(){
  let ms = new Date(EXAM_DATE) - new Date();
  if(ms < 0) ms = 0;
  const d = Math.floor(ms/864e5), h = Math.floor(ms/36e5)%24, m = Math.floor(ms/6e4)%60, s = Math.floor(ms/1e3)%60;
  document.getElementById("cd-days").textContent = d;
  document.getElementById("cd-hms").textContent = `${h}h ${m}m ${s}s`;
}
tick(); setInterval(tick,1000);

// ---- Courses ----
document.getElementById("course-list").innerHTML = COURSES.map(c =>
  `<div class="card"><h3>${c.name}</h3><p>${c.desc}</p><div class="price">${c.price}</div><a class="btn" href="#contact">Enquire</a></div>`).join("");

// ---- Quiz ----
let qi = 0, score = 0;
const box = document.getElementById("quiz-box");
function showQ(){
  if(qi >= QUESTIONS.length){
    box.innerHTML = `<h3>Your score: ${score} / ${QUESTIONS.length}</h3><p style="margin:10px 0 18px">${score>=4?"Strong result. Keep practising.":"Good start. Revise the topics you missed and try again."}</p><button class="btn" id="again">Try again</button>`;
    document.getElementById("again").onclick = () => {qi=0;score=0;showQ();};
    return;
  }
  const q = QUESTIONS[qi];
  box.innerHTML = `<div class="meta"><span>Question ${qi+1} of ${QUESTIONS.length}</span><span>Score ${score}</span></div><h3 style="margin-bottom:12px">${q.q}</h3>` +
    q.o.map((t,i)=>`<button class="opt" data-i="${i}">${t}</button>`).join("");
  box.querySelectorAll(".opt").forEach(b => b.onclick = () => {
    const pick = +b.dataset.i;
    box.querySelectorAll(".opt").forEach(x => x.disabled = true);
    box.querySelectorAll(".opt")[q.a].classList.add("right");
    if(pick === q.a) score++; else b.classList.add("wrong");
    setTimeout(()=>{qi++;showQ();}, 1100);
  });
}
showQ();

// ---- Study planner ----
const pd = document.getElementById("p-date");
pd.min = new Date().toISOString().slice(0,10);
document.getElementById("plan-form").onsubmit = e => {
  e.preventDefault();
  const days = Math.ceil((new Date(pd.value) - new Date()) / 864e5);
  const hrs = +document.getElementById("p-hours").value;
  if(days < 0){document.getElementById("p-summary").textContent = "Pick a date in the future.";return;}
  document.getElementById("p-summary").textContent = `${days} days left. About ${Math.round(days*hrs)} study hours in total.`;
  let rows = SPLIT.map(([n,p]) => {
    const h = Math.round(hrs*p*2)/2;
    return `<tr><td>${n}</td><td>${h} h</td><td><div class="bar"><i style="width:${p*100}%"></i></div></td></tr>`;
  }).join("");
  document.getElementById("p-table").innerHTML = `<table><tr><th>Subject</th><th>Hours per day</th><th>Share</th></tr>${rows}</table>
  <p class="sub" style="margin-top:12px">Tip: split each subject into 2-hour blocks with a 10-minute break, and keep the last hour of the day for revision.</p>`;
};

document.getElementById("yr").textContent = new Date().getFullYear();

// ---- Animated particle background ----
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
    for(const p of pts){
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1;
      x.fillStyle="rgba(127,224,214,.8)";x.beginPath();x.arc(p.x,p.y,1.8,0,7);x.fill();
    }
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
        if(d<120){x.strokeStyle=`rgba(127,224,214,${.25*(1-d/120)})`;x.beginPath();x.moveTo(pts[i].x,pts[i].y);x.lineTo(pts[j].x,pts[j].y);x.stroke();}
      }
      const m=Math.hypot(pts[i].x-mouse.x,pts[i].y-mouse.y);
      if(m<160){x.strokeStyle=`rgba(255,194,51,${.5*(1-m/160)})`;x.beginPath();x.moveTo(pts[i].x,pts[i].y);x.lineTo(mouse.x,mouse.y);x.stroke();}
    }
    if(!still)requestAnimationFrame(draw);
  }
  size();draw();
})();

// ---- Reveal sections on scroll ----
document.querySelectorAll("section .wrap").forEach(el=>el.classList.add("reveal"));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

// ---- Mobile menu ----
const menuBtn = document.querySelector(".menu-btn"), navLinks = document.getElementById("nav-links");
menuBtn.onclick = () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
};
navLinks.querySelectorAll("a").forEach(a => a.onclick = () => navLinks.classList.remove("open"));
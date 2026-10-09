// ---- Settings ----
const WA_NUMBER = "917439685658";
// Add verified achievements here when you have them, one line each. photo can be "" for none.
// Example: {title:"Student Name selected for MBBS", detail:"Government Medical College, 2026", year:"2026", photo:""}
const ACHIEVEMENTS = [];

// ---- Achievements ----
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ach = document.getElementById("ach-grid");
ach.innerHTML = ACHIEVEMENTS.length
  ? ACHIEVEMENTS.map(a => `<div class="card">${a.photo ? `<img class="pic" src="${a.photo}" alt="${a.title}">` : ""}
      <span class="badge">${a.year}</span><h3>${a.title}</h3><p>${a.detail}</p></div>`).join("")
  : `<div class="card newbeg"><span class="badge">A New Beginning</span>
      <h3>Achievement updates will appear here</h3>
      <p>As NEETVIDYA adds verified student results and milestone updates, they will be published here in a clear and factual format.</p></div>`;

// ---- Confetti ----
const fx = document.getElementById("fx"), fc = fx.getContext("2d");
let bits = [], raf = 0;
function sizeFx(){ fx.width = innerWidth; fx.height = innerHeight; }
sizeFx(); addEventListener("resize", sizeFx);
function confetti(x, y){
  if(reduce) return;
  const cols = ["#ffc233","#7fe0d6","#ffffff","#6cc12b","#ff7a59"];
  for(let i = 0; i < 90; i++){
    const a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 8;
    bits.push({x, y, vx:Math.cos(a)*v, vy:Math.sin(a)*v - 5, w:6 + Math.random()*6, h:4 + Math.random()*5, r:Math.random()*6, vr:(Math.random()-.5)*.4, c:cols[i % cols.length], life:90 + Math.random()*40});
  }
  if(!raf) raf = requestAnimationFrame(loop);
}
function loop(){
  fc.clearRect(0, 0, fx.width, fx.height);
  bits = bits.filter(b => b.life-- > 0);
  for(const b of bits){
    b.vy += .3; b.x += b.vx; b.y += b.vy; b.vx *= .99; b.r += b.vr;
    fc.save(); fc.translate(b.x, b.y); fc.rotate(b.r); fc.fillStyle = b.c; fc.globalAlpha = Math.min(1, b.life/30);
    fc.fillRect(-b.w/2, -b.h/2, b.w, b.h); fc.restore();
  }
  raf = bits.length ? requestAnimationFrame(loop) : 0;
  if(!bits.length) fc.clearRect(0, 0, fx.width, fx.height);
}

// ---- Buttons ----
document.getElementById("celebrate").onclick = e => {
  const r = e.currentTarget.getBoundingClientRect();
  confetti(r.left + r.width/2, r.top);
};
document.getElementById("join").href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello NEETVIDYA, I want to join NEETVIDYA.");

// ---- Fade sections in on scroll ----
document.querySelectorAll("main .wrap").forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

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
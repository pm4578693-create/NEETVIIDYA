// ---- Settings ----
const WA_NUMBER = "917439685658"; // country code + number, no + or spaces
// Optional: paste your Formspree form ID (the part after /f/) to receive enquiries by email.
// If it is left empty, the enquiry opens WhatsApp with the details filled in instead.
const FORMSPREE_ID = "";

// ---- Admission enquiry form ----
const form = document.getElementById("enq"), msgEl = document.getElementById("form-msg");
const say = (t, cls) => { msgEl.textContent = t; msgEl.className = cls || ""; };
form.addEventListener("submit", async e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const d = {name:v("f-name"), phone:v("f-phone"), email:v("f-email"), program:v("f-prog"), message:v("f-msg")};
  if(!d.name || !d.phone || !d.program){ say("Please fill in your name, phone number and target program.", "err"); return; }
  if(!/^[0-9+\s-]{10,15}$/.test(d.phone)){ say("Please enter a valid phone number.", "err"); return; }
  if(d.email && !/^\S+@\S+\.\S+$/.test(d.email)){ say("Please enter a valid email address.", "err"); return; }

  if(FORMSPREE_ID){
    say("Sending your enquiry...");
    try{
      const r = await fetch("https://formspree.io/f/" + FORMSPREE_ID, {
        method:"POST", headers:{"Content-Type":"application/json", "Accept":"application/json"}, body:JSON.stringify(d)});
      if(!r.ok) throw new Error();
      say("Thank you! Your enquiry has been sent. Our team will get back to you soon.", "ok");
      form.reset();
    }catch(_){ say("Sorry, we could not send your enquiry. Please call us or use WhatsApp.", "err"); }
    return;
  }
  const text = `Hello NEETVIDYA, I want to send an admission enquiry.\nName: ${d.name}\nPhone: ${d.phone}\n` +
    (d.email ? `Email: ${d.email}\n` : "") + `Program: ${d.program}` + (d.message ? `\nMessage: ${d.message}` : "");
  window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  say("Opening WhatsApp so you can send your enquiry to our team.", "ok");
});

// ---- Fade sections in on scroll ----
document.querySelectorAll("main .wrap").forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.08});
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
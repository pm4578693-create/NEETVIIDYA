// ---- Settings ----
const WA_NUMBER = "917439685658";
const SECONDS_PER_Q = 60; // time allowed per question
const TITLES = ["Full Syllabus Mock Series","Subject-wise Test Series","Chapter-wise Test Series"];

// Questions by subject. a = number of the correct option (0 is the first option).
const BANK = {
  Physics: [
    {q:"A body of mass 2 kg moves with an acceleration of 3 m/s². The force acting on it is:", o:["1.5 N","5 N","6 N","9 N"], a:2},
    {q:"The dimensional formula of work is:", o:["[MLT⁻²]","[ML²T⁻²]","[ML²T⁻³]","[M²LT⁻²]"], a:1},
    {q:"At the highest point of a ball thrown vertically upward, its acceleration is:", o:["Zero","g upward","g downward","2g downward"], a:2},
    {q:"The SI unit of electric potential is:", o:["Ampere","Volt","Ohm","Farad"], a:1},
    {q:"The speed of light in vacuum is approximately:", o:["3 x 10^6 m/s","3 x 10^8 m/s","3 x 10^10 m/s","3 x 10^5 m/s"], a:1},
    {q:"A resistor of 4 ohm carries a current of 2 A. The potential difference across it is:", o:["2 V","6 V","8 V","0.5 V"], a:2},
    {q:"Which type of mirror is used in car headlights?", o:["Convex","Concave","Plane","Cylindrical"], a:1},
    {q:"A wave has a time period of 0.02 s. Its frequency is:", o:["20 Hz","50 Hz","0.02 Hz","200 Hz"], a:1},
    {q:"The kinetic energy of a 2 kg body moving at 3 m/s is:", o:["3 J","6 J","9 J","18 J"], a:2},
    {q:"Which of these is a scalar quantity?", o:["Displacement","Velocity","Force","Speed"], a:3}
  ],
  Chemistry: [
    {q:"The pH of pure water at 25 °C is:", o:["5","7","9","14"], a:1},
    {q:"The atomic number of carbon is:", o:["4","6","8","12"], a:1},
    {q:"The chemical formula of common salt is:", o:["KCl","NaCl","CaCl₂","NaOH"], a:1},
    {q:"Which of these is a noble gas?", o:["Nitrogen","Oxygen","Argon","Hydrogen"], a:2},
    {q:"Avogadro's number is approximately:", o:["6.022 x 10^21","6.022 x 10^23","6.022 x 10^25","3.011 x 10^23"], a:1},
    {q:"The hybridisation of carbon in methane is:", o:["sp","sp²","sp³","dsp²"], a:2},
    {q:"Which gas is released when zinc reacts with dilute HCl?", o:["Oxygen","Hydrogen","Carbon dioxide","Chlorine"], a:1},
    {q:"The functional group present in alcohols is:", o:["–CHO","–COOH","–OH","–NH₂"], a:2},
    {q:"How many moles are present in 18 g of water (molar mass 18 g/mol)?", o:["0.5","1","2","18"], a:1},
    {q:"The most electronegative element is:", o:["Oxygen","Chlorine","Fluorine","Nitrogen"], a:2}
  ],
  Biology: [
    {q:"The powerhouse of the cell is the:", o:["Ribosome","Mitochondrion","Golgi body","Lysosome"], a:1},
    {q:"Which blood group is the universal donor?", o:["AB+","A-","B+","O-"], a:3},
    {q:"Photosynthesis takes place in the:", o:["Mitochondria","Chloroplast","Nucleus","Vacuole"], a:1},
    {q:"The basic unit of heredity is the:", o:["Chromosome","Gene","Cell","Ribosome"], a:1},
    {q:"Which vitamin is made in the skin in sunlight?", o:["Vitamin A","Vitamin B12","Vitamin C","Vitamin D"], a:3},
    {q:"The number of chromosomes in a normal human body cell is:", o:["23","44","46","48"], a:2},
    {q:"Which enzyme in saliva digests starch?", o:["Pepsin","Salivary amylase","Lipase","Trypsin"], a:1},
    {q:"Which blood cells fight infection?", o:["RBCs","WBCs","Platelets","Plasma"], a:1},
    {q:"The functional unit of the kidney is the:", o:["Neuron","Nephron","Alveolus","Villus"], a:1},
    {q:"Which hormone from the pancreas lowers blood sugar?", o:["Thyroxine","Adrenaline","Insulin","Estrogen"], a:2}
  ]
};

// Chapter-wise questions: subject -> chapter -> questions
const CHAPTERS = {
  Physics: {
    "Laws of Motion": [
      {q:"A body of mass 2 kg moves with an acceleration of 3 m/s². The force acting on it is:", o:["1.5 N","5 N","6 N","9 N"], a:2},
      {q:"Newton's first law of motion is also called the law of:", o:["Energy","Inertia","Momentum","Gravitation"], a:1},
      {q:"The SI unit of momentum is:", o:["kg m/s","kg m/s²","N m","J"], a:0},
      {q:"A force of 10 N acts on a 5 kg body at rest. Its velocity after 2 s is:", o:["2 m/s","4 m/s","10 m/s","20 m/s"], a:1},
      {q:"Action and reaction forces act:", o:["On the same body","On different bodies","Only on moving bodies","Only in vacuum"], a:1}
    ],
    "Current Electricity": [
      {q:"The SI unit of electric potential is:", o:["Ampere","Volt","Ohm","Farad"], a:1},
      {q:"A resistor of 4 ohm carries a current of 2 A. The potential difference across it is:", o:["2 V","6 V","8 V","0.5 V"], a:2},
      {q:"Two resistors of 2 ohm and 3 ohm in series have an equivalent resistance of:", o:["1.2 ohm","5 ohm","6 ohm","0.6 ohm"], a:1},
      {q:"Two resistors of 2 ohm each in parallel have an equivalent resistance of:", o:["4 ohm","2 ohm","1 ohm","0.5 ohm"], a:2},
      {q:"The power of a device working at 100 V and drawing 2 A is:", o:["50 W","102 W","200 W","98 W"], a:2}
    ]
  },
  Chemistry: {
    "Periodic Table": [
      {q:"The atomic number of carbon is:", o:["4","6","8","12"], a:1},
      {q:"Which of these is a noble gas?", o:["Nitrogen","Oxygen","Argon","Hydrogen"], a:2},
      {q:"The most electronegative element is:", o:["Oxygen","Chlorine","Fluorine","Nitrogen"], a:2},
      {q:"Group 1 elements are known as:", o:["Alkaline earth metals","Alkali metals","Halogens","Noble gases"], a:1},
      {q:"Across a period from left to right, atomic size generally:", o:["Increases","Decreases","Stays the same","First increases, then decreases"], a:1}
    ],
    "Mole Concept": [
      {q:"Avogadro's number is approximately:", o:["6.022 x 10^21","6.022 x 10^23","6.022 x 10^25","3.011 x 10^23"], a:1},
      {q:"How many moles are present in 18 g of water (molar mass 18 g/mol)?", o:["0.5","1","2","18"], a:1},
      {q:"The mass of 2 moles of CO₂ (molar mass 44 g/mol) is:", o:["22 g","44 g","66 g","88 g"], a:3},
      {q:"The volume of 1 mole of any gas at STP is about:", o:["11.2 L","22.4 L","24.0 L","44.8 L"], a:1},
      {q:"The number of moles in 11.2 L of a gas at STP is:", o:["0.25","0.5","1","2"], a:1}
    ]
  },
  Biology: {
    "Cell: The Unit of Life": [
      {q:"The powerhouse of the cell is the:", o:["Ribosome","Mitochondrion","Golgi body","Lysosome"], a:1},
      {q:"Photosynthesis takes place in the:", o:["Mitochondria","Chloroplast","Nucleus","Vacuole"], a:1},
      {q:"The plant cell wall is mainly made of:", o:["Chitin","Cellulose","Starch","Protein"], a:1},
      {q:"The cell was first observed by:", o:["Robert Hooke","Charles Darwin","Gregor Mendel","Louis Pasteur"], a:0},
      {q:"Ribosomes are the site of:", o:["Photosynthesis","Protein synthesis","Lipid digestion","Cell division"], a:1}
    ],
    "Body Fluids and Circulation": [
      {q:"Which blood group is the universal donor?", o:["AB+","A-","B+","O-"], a:3},
      {q:"Which blood cells fight infection?", o:["RBCs","WBCs","Platelets","Plasma"], a:1},
      {q:"Which blood cells help in clotting?", o:["RBCs","WBCs","Platelets","Plasma"], a:2},
      {q:"The normal human heart has how many chambers?", o:["2","3","4","5"], a:2},
      {q:"The pigment that carries oxygen in human blood is:", o:["Chlorophyll","Haemoglobin","Melanin","Carotene"], a:1}
    ]
  }
};

const id = +(new URLSearchParams(location.search).get("id")) || 0;
const title = TITLES[id] || TITLES[0];
const MODE = ["full","subject","chapter"][id] || "full";
document.getElementById("t-title").textContent = "Free Demo: " + title;
document.getElementById("t-sub").textContent = ({
  full:"Full syllabus mock: one paper with Physics, Chemistry and Biology questions mixed together.",
  subject:"Subject-wise test: pick a subject and practise only that subject.",
  chapter:"Chapter-wise test: pick a subject, then a chapter."
})[MODE] + " You get 1 minute per question.";

const box = document.getElementById("demo-box"), cnt = document.getElementById("q-count"), tm = document.getElementById("timer");
let QS = [], label = "", cur = 0, ans = [], left = 0, iv;
const fmt = s => String(Math.floor(s/60)).padStart(2,"0") + ":" + String(s%60).padStart(2,"0");
const tag = (arr, s, ch) => arr.map(q => ({...q, s, ch}));
const allQs = () => Object.entries(BANK).flatMap(([s,a]) => tag(a, s));

// ---- Where each test type starts ----
function home(){
  if(MODE === "full") return run(allQs(), "Full syllabus mock");
  pickSubject();
}
function pickSubject(){
  clearInterval(iv); cnt.textContent = "Choose a subject"; tm.textContent = "";
  box.innerHTML = `<h3 style="margin-bottom:12px">Pick a subject</h3>` +
    Object.keys(BANK).map(s => `<button class="opt" data-s="${s}">${s} (${MODE==="chapter" ? Object.keys(CHAPTERS[s]).length + " chapters" : BANK[s].length + " questions"})</button>`).join("");
  box.querySelectorAll(".opt").forEach(b => b.onclick = () =>
    MODE === "chapter" ? pickChapter(b.dataset.s) : run(tag(BANK[b.dataset.s], b.dataset.s), b.dataset.s));
}
function pickChapter(s){
  cnt.textContent = s + ": choose a chapter";
  box.innerHTML = `<h3 style="margin-bottom:12px">Pick a chapter in ${s}</h3>` +
    Object.entries(CHAPTERS[s]).map(([ch,a]) => `<button class="opt" data-ch="${ch}">${ch} (${a.length} questions)</button>`).join("") +
    `<div class="nav2"><button class="btn ghost" id="back">Back to subjects</button></div>`;
  box.querySelectorAll(".opt").forEach(b => b.onclick = () =>
    run(tag(CHAPTERS[s][b.dataset.ch], s, b.dataset.ch), s + ": " + b.dataset.ch));
  document.getElementById("back").onclick = pickSubject;
}

// ---- Take the test ----
function run(list, lbl){
  QS = list; label = lbl;
  cur = 0; ans = Array(QS.length).fill(-1); left = QS.length * SECONDS_PER_Q;
  clearInterval(iv);
  iv = setInterval(() => { left--; tm.textContent = "Time left " + fmt(left); if(left <= 0) finish(); }, 1000);
  tm.textContent = "Time left " + fmt(left);
  render();
}
function render(){
  const q = QS[cur];
  cnt.textContent = (MODE === "full" ? `${label} · ${q.s}` : label) + ` · Question ${cur+1} of ${QS.length}`;
  box.innerHTML = `<h3 style="margin-bottom:12px">${q.q}</h3>` +
    q.o.map((t,i) => `<button class="opt ${ans[cur]===i?"sel":""}" data-i="${i}">${t}</button>`).join("") +
    `<div class="nav2"><button class="btn ghost" id="prev" ${cur===0?"disabled":""}>Previous</button>` +
    (cur < QS.length-1 ? `<button class="btn" id="next">Next</button>` : `<button class="btn alt" id="submit">Submit test</button>`) + `</div>`;
  box.querySelectorAll(".opt").forEach(b => b.onclick = () => { ans[cur] = +b.dataset.i; render(); });
  document.getElementById("prev").onclick = () => { cur--; render(); };
  const n = document.getElementById("next"); if(n) n.onclick = () => { cur++; render(); };
  const s = document.getElementById("submit"); if(s) s.onclick = finish;
}

// ---- Result ----
function finish(){
  clearInterval(iv);
  const score = QS.reduce((s,q,i) => s + (ans[i]===q.a ? 1 : 0), 0);
  const wrong = QS.reduce((s,q,i) => s + (ans[i]!==-1 && ans[i]!==q.a ? 1 : 0), 0);
  const by = {};
  QS.forEach((q,i) => { by[q.s] = by[q.s] || {c:0,t:0}; by[q.s].t++; if(ans[i]===q.a) by[q.s].c++; });
  const rows = Object.entries(by).map(([s,v]) => `<tr><td>${s}</td><td>${v.c} / ${v.t}</td></tr>`).join("");
  cnt.textContent = "Result"; tm.textContent = "";
  const msg = encodeURIComponent(`Hello NEETVIDYA, I took the free demo test and want to enroll in ${title}.`);
  const changeBtn = MODE === "full" ? "" : `<button class="btn ghost" id="change">${MODE === "chapter" ? "Change chapter" : "Change subject"}</button>`;
  box.innerHTML = `<h3>${label}: ${score} / ${QS.length}</h3>
    <p style="margin:8px 0 14px">Correct ${score}, wrong ${wrong}, skipped ${QS.length-score-wrong}.</p>
    <table><tr><th>Subject</th><th>Score</th></tr>${rows}</table>
    <h3 style="margin:20px 0 8px">Review</h3>` +
    QS.map((q,i) => `<div class="rev"><b>${q.s}, Q${i+1}. ${q.q}</b><br>Your answer: ${ans[i]===-1?"Skipped":q.o[ans[i]]}<br>Correct answer: ${q.o[q.a]}</div>`).join("") +
    `<div class="nav2"><button class="btn ghost" id="again">Retake</button>${changeBtn}
     <a class="btn ghost" href="test-series.html">Back to Test Series</a>
     <a class="btn alt" target="_blank" rel="noopener" href="https://wa.me/${WA_NUMBER}?text=${msg}">Enroll on WhatsApp</a></div>`;
  document.getElementById("again").onclick = () => run(QS, label);
  const c = document.getElementById("change"); if(c) c.onclick = home;
}
home();
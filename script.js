/* ================= SCREEN FLOW ================= */

const screens = document.querySelectorAll(".screen");
let index = 0;
let locked = false;

function showScreen(i){
  screens.forEach(s => s.classList.remove("active"));
  screens[i].classList.add("active");
}

/* next screen with lock (prevents double taps) */
function nextScreen(){
  if(locked) return;
  locked = true;

  if(index < screens.length - 1){
    index++;
    showScreen(index);
  }

  setTimeout(()=> locked = false, 1200);
}

/* tap navigation */
document.body.addEventListener("click", nextScreen);

/* ================= MUSIC ================= */

const music = document.getElementById("bgMusic");

document.body.addEventListener("click", ()=>{
  music.play().catch(()=>{});
},{ once:true });


/* ================= HEART ANIMATION ================= */

const heartCanvas = document.getElementById("heartCanvas");

if(heartCanvas){
  const ctx = heartCanvas.getContext("2d");

  heartCanvas.width = window.innerWidth;
  heartCanvas.height = window.innerHeight;

  let particles = [];

  function heart(t){
    return {
      x: 16 * Math.pow(Math.sin(t),3),
      y: -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
    };
  }

  for(let i=0;i<400;i++){
    let t = Math.random()*Math.PI*2;
    let p = heart(t);

    particles.push({
      x: heartCanvas.width/2 + p.x*12,
      y: heartCanvas.height + Math.random()*200,
      targetY: heartCanvas.height/2 + p.y*12
    });
  }

  function animateHeart(){
    ctx.clearRect(0,0,heartCanvas.width,heartCanvas.height);

    particles.forEach(p=>{
      if(p.y > p.targetY) p.y -= 2;

      ctx.fillStyle = "white";
      ctx.fillRect(p.x,p.y,2,2);
    });

    requestAnimationFrame(animateHeart);
  }

  animateHeart();
}


/* ================= LETTER ================= */

const openLetter = document.getElementById("openLetter");
const letterBox = document.getElementById("letterBox");

if(openLetter){
  openLetter.addEventListener("click", ()=>{
    letterBox.style.display = "block";
  });
}


/* ================= COUNTDOWN ================= */

const countdown = document.getElementById("countdownTimer");

if(countdown){
  const target = new Date("April 25, 2026 00:00:00").getTime();

  setInterval(()=>{
    let now = new Date().getTime();
    let gap = target - now;

    if(gap < 0){
      countdown.innerHTML = "🎉 It's Today 🎉";
      return;
    }

    let d = Math.floor(gap/(1000*60*60*24));
    let h = Math.floor((gap/(1000*60*60))%24);
    let m = Math.floor((gap/(1000*60))%60);
    let s = Math.floor((gap/1000)%60);

    countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
  },1000);
}


/* ================= FIREWORKS ================= */

const fireCanvas = document.getElementById("fireworksCanvas");

if(fireCanvas){
  const ctx = fireCanvas.getContext("2d");

  fireCanvas.width = window.innerWidth;
  fireCanvas.height = window.innerHeight;

  let particles = [];

  function createFirework(){
    for(let i=0;i<150;i++){
      particles.push({
        x: Math.random()*fireCanvas.width,
        y: Math.random()*fireCanvas.height,
        dx: (Math.random()-0.5)*6,
        dy: (Math.random()-0.5)*6,
        life: 100
      });
    }
  }

  function animateFire(){
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,fireCanvas.width,fireCanvas.height);

    particles.forEach(p=>{
      p.x += p.dx;
      p.y += p.dy;
      p.life--;

      ctx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;
      ctx.fillRect(p.x,p.y,3,3);
    });

    particles = particles.filter(p=>p.life>0);

    requestAnimationFrame(animateFire);
  }

  document.getElementById("celebration")
    .addEventListener("click", createFirework);

  animateFire();
}


/* ================= PROPOSAL ================= */

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const overlay = document.getElementById("resultOverlay");

/* NO button runs away */
if(noBtn){
  noBtn.addEventListener("click",(e)=>{
    e.stopPropagation();

    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random()*80 + "%";
    noBtn.style.top  = Math.random()*80 + "%";
  });
}

/* YES → cinematic reveal */
if(yesBtn){
  yesBtn.addEventListener("click",(e)=>{
    e.stopPropagation();

    /* hearts explosion */
    for(let i=0;i<120;i++){
      let h = document.createElement("div");
      h.innerHTML = "❤️";

      h.style.position="fixed";
      h.style.left = Math.random()*100 + "%";
      h.style.top  = Math.random()*100 + "%";
      h.style.fontSize = Math.random()*20 + 15 + "px";

      document.body.appendChild(h);
    }

    /* show image */
    setTimeout(()=>{
      overlay.classList.add("active");
    },600);

  });
}
/* ================= SCREEN FLOW ================= */
const screens = document.querySelectorAll(".screen");
let current = 0;
let locked = false;

function showScreen(i){
  screens.forEach(s => s.classList.remove("active"));
  screens[i].classList.add("active");
}

function nextScreen(){
  if(locked) return;
  locked = true;

  if(current < screens.length - 1){
    current++;
    showScreen(current);
  }

  setTimeout(()=> locked = false, 1200);
}

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
      x:16*Math.pow(Math.sin(t),3),
      y:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
    };
  }

  for(let i=0;i<300;i++){
    let t=Math.random()*Math.PI*2;
    let p=heart(t);

    particles.push({
      x:heartCanvas.width/2+p.x*12,
      y:heartCanvas.height+100,
      ty:heartCanvas.height/2+p.y*12
    });
  }

  function animate(){
    ctx.clearRect(0,0,heartCanvas.width,heartCanvas.height);
    particles.forEach(p=>{
      if(p.y>p.ty) p.y-=2;
      ctx.fillStyle="white";
      ctx.fillRect(p.x,p.y,2,2);
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ================= LETTER ================= */
const openLetter = document.getElementById("openLetter");
const letterBox = document.getElementById("letterBox");

if(openLetter){
  openLetter.onclick = ()=>{
    letterBox.style.display = "block";
  };
}

/* ================= COUNTDOWN ================= */
const countdown = document.getElementById("countdown");

if(countdown){
  const target = new Date("April 25, 2026 00:00:00").getTime();

  const timer = setInterval(()=>{
    let now = new Date().getTime();
    let gap = target - now;

    if(gap <= 0){
      clearInterval(timer);
      countdown.innerHTML = "🎉 Happy Birthday 🎉";

      launchBalloons();

      setTimeout(()=>{
        nextScreen(); // move to birthday page automatically
      },3000);

      return;
    }

    let d=Math.floor(gap/(1000*60*60*24));
    let h=Math.floor((gap/(1000*60*60))%24);
    let m=Math.floor((gap/(1000*60))%60);
    let s=Math.floor((gap/1000)%60);

    countdown.innerHTML = d+"d "+h+"h "+m+"m "+s+"s";
  },1000);
}

/* ================= BALLOONS ================= */
function launchBalloons(){
  for(let i=0;i<30;i++){
    let b=document.createElement("div");
    b.className="balloon";
    b.innerHTML="🎈";

    b.style.left=Math.random()*100+"%";
    b.style.fontSize=(20+Math.random()*30)+"px";

    document.body.appendChild(b);
  }
}

/* ================= FIREWORKS ================= */
const fireCanvas = document.getElementById("fireworksCanvas");

if(fireCanvas){
  const ctx = fireCanvas.getContext("2d");
  fireCanvas.width = window.innerWidth;
  fireCanvas.height = window.innerHeight;

  let particles=[];

  function createFire(){
    for(let i=0;i<200;i++){
      particles.push({
        x:Math.random()*fireCanvas.width,
        y:Math.random()*fireCanvas.height,
        dx:(Math.random()-0.5)*8,
        dy:(Math.random()-0.5)*8,
        life:100
      });
    }
  }

  function animateFire(){
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,fireCanvas.width,fireCanvas.height);

    particles.forEach(p=>{
      p.x+=p.dx;
      p.y+=p.dy;
      p.life--;

      ctx.fillStyle=`hsl(${Math.random()*360},100%,60%)`;
      ctx.fillRect(p.x,p.y,3,3);
    });

    particles = particles.filter(p=>p.life>0);

    requestAnimationFrame(animateFire);
  }

  document.getElementById("celebration").onclick = createFire;

  animateFire();
}

/* ================= PROPOSAL ================= */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const overlay = document.getElementById("resultOverlay");

if(noBtn){
  noBtn.onclick = (e)=>{
    e.stopPropagation();

    noBtn.style.position="absolute";
    noBtn.style.left=Math.random()*80+"%";
    noBtn.style.top=Math.random()*80+"%";
  };
}

if(yesBtn){
  yesBtn.onclick = (e)=>{
    e.stopPropagation();

    // heart explosion
    for(let i=0;i<120;i++){
      let h=document.createElement("div");
      h.className="heart";
      h.innerHTML="❤️";

      h.style.left=Math.random()*100+"%";
      h.style.top=Math.random()*100+"%";

      document.body.appendChild(h);
    }

    setTimeout(()=>{
      overlay.classList.add("active");
    },500);
  };
}
/* ================= MUSIC ================= */
const music = document.getElementById("bgMusic");

document.body.addEventListener("click", () => {
  music.play().catch(() => {});
}, { once: true });

/* ================= LETTER OPEN ================= */
const openLetter = document.getElementById("openLetter");
const letterBox = document.getElementById("letterBox");

if (openLetter) {
  openLetter.onclick = () => {
    letterBox.classList.remove("hidden");
  };
}

/* ================= COUNTDOWN ================= */
const timer = document.getElementById("timer");

if (timer) {
  const targetDate = new Date("April 25, 2026 00:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      timer.innerHTML = "🎉 Happy Birthday 🎉";
      startBalloons();
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    timer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
  }, 1000);
}

/* ================= BALLOONS ================= */
function startBalloons() {
  for (let i = 0; i < 25; i++) {
    let b = document.createElement("div");
    b.innerHTML = "🎈";
    b.style.position = "fixed";
    b.style.left = Math.random() * 100 + "%";
    b.style.bottom = "-50px";
    b.style.fontSize = "25px";
    b.style.animation = "rise 6s linear infinite";

    document.body.appendChild(b);
  }
}

/* ================= NO BUTTON ESCAPE ================= */
const noBtn = document.getElementById("noBtn");

if (noBtn) {
  noBtn.onclick = (e) => {
    e.stopPropagation();

    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * 80 + "%";
    noBtn.style.top = Math.random() * 80 + "%";
  };
}

/* ================= YES BUTTON ================= */
const yesBtn = document.getElementById("yesBtn");

if (yesBtn) {
  yesBtn.onclick = (e) => {
    e.stopPropagation();
    createHearts();
  };
}

/* ================= HEART BLAST ================= */
function createHearts() {
  for (let i = 0; i < 80; i++) {
    let heart = document.createElement("div");
    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.top = Math.random() * 100 + "%";
    heart.style.fontSize = "20px";

    heart.style.animation = "floatUp 3s linear infinite";

    document.body.appendChild(heart);
  }
}

/* ================= HEART ANIMATION ================= */
const canvas = document.getElementById("heartCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let dots = [];

  function heartShape(t) {
    return {
      x: 16 * Math.pow(Math.sin(t), 3),
      y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    };
  }

  for (let i = 0; i < 300; i++) {
    let t = Math.random() * Math.PI * 2;
    let p = heartShape(t);

    dots.push({
      x: canvas.width / 2 + p.x * 12,
      y: canvas.height + 100,
      ty: canvas.height / 2 + p.y * 12
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(d => {
      if (d.y > d.ty) d.y -= 2;
      ctx.fillStyle = "white";
      ctx.fillRect(d.x, d.y, 2, 2);
    });

    requestAnimationFrame(animate);
  }

  animate();
}
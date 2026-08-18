"use strict";

/* =========================
   HELPER
========================= */

const $ = (id) => document.getElementById(id);


/* =========================
   ELEMENTS
========================= */

const loader = $("loader");
const music = $("bgMusic");
const musicControl = $("musicControl");

const openBtn = $("openBtn");
const duaBtn = $("duaBtn");
const duaBox = $("duaBox");
const celebrateBtn = $("celebrateBtn");

const toast = $("toast");

const canvas = $("stars");
const ctx = canvas ? canvas.getContext("2d") : null;


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    if (loader) {
      loader.classList.add("hide");
    }

  }, 1700);

});


/* =========================
   TOAST
========================= */

let toastTimer = null;

function showToast(message) {

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3500);

}


/* =========================
   MUSIC
========================= */

let musicStarted = false;

async function startMusic() {

  if (!music) return false;

  try {

    music.volume = 0.45;

    await music.play();

    musicStarted = true;

    if (musicControl) {
      musicControl.textContent = "🔊";
    }

    createMusicNotes();

    return true;

  } catch (error) {

    console.log("Music error:", error);

    if (musicControl) {
      musicControl.textContent = "🎵";
    }

    showToast(
      "Music start nahi hua — 🎵 button dabao"
    );

    return false;

  }

}


/* =========================
   MUSIC BUTTON
========================= */

if (musicControl) {

  musicControl.addEventListener(
    "click",
    async () => {

      if (!music) return;

      if (music.paused) {

        await startMusic();

      } else {

        music.pause();

        if (musicControl) {
          musicControl.textContent = "🔇";
        }

        showToast("Music paused");

      }

    }
  );

}


/* =========================
   OPEN SURPRISE
========================= */

if (openBtn) {

  openBtn.addEventListener(
    "click",
    async () => {

      await startMusic();

      reveal("wish");

      burst(25);

      const wish = $("wish");

      if (wish) {

        setTimeout(() => {

          wish.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }, 150);

      }

      openBtn.innerHTML = `
        <span>Surprise Opened 🤍</span>
        <b>✓</b>
      `;

    }
  );

}


/* =========================
   DUA BUTTON
========================= */

if (duaBtn && duaBox) {

  duaBtn.addEventListener(
    "click",
    () => {

      duaBox.classList.toggle("open");

      const isOpen =
        duaBox.classList.contains("open");

      if (isOpen) {

        duaBtn.textContent =
          "Dua dil se 🤲🤍";

        burst(15);

      } else {

        duaBtn.textContent =
          "Dil se ek dua 🤲";

      }

    }
  );

}


/* =========================
   SCROLL REVEAL
========================= */

function setupScrollReveal() {

  const sections =
    document.querySelectorAll(".section");

  if (!sections.length) return;

  if (!("IntersectionObserver" in window)) {

    sections.forEach((section) => {
      section.classList.add("visible");
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

  sections.forEach((section) => {

    observer.observe(section);

  });

}

setupScrollReveal();


/* =========================
   REVEAL FUNCTION
========================= */

function reveal(id) {

  const element = $(id);

  if (element) {
    element.classList.add("visible");
  }

}


/* =========================
   FINAL MAGIC
========================= */

if (celebrateBtn) {

  celebrateBtn.addEventListener(
    "click",
    async () => {

      await startMusic();

      burst(90);

      createHearts(30);

      showToast(
        "Allah Zainab ko hamesha khush rakhe. Ameen Ya Rabb 🤲🤍"
      );

    }
  );

}


/* =========================
   MUSIC NOTES
========================= */

function createMusicNotes() {

  const notes = [
    "♪",
    "♫",
    "♩",
    "🎵"
  ];

  for (let i = 0; i < 8; i++) {

    setTimeout(() => {

      const note =
        document.createElement("div");

      note.className =
        "music-note";

      note.textContent =
        notes[
          Math.floor(
            Math.random() * notes.length
          )
        ];

      note.style.left =
        Math.random() * 90 + "%";

      note.style.bottom =
        Math.random() * 20 + 10 + "px";

      document.body.appendChild(note);

      setTimeout(() => {

        note.remove();

      }, 3000);

    }, i * 350);

  }

}


/* =========================
   HEARTS
========================= */

function createHearts(amount = 20) {

  const hearts = [
    "🤍",
    "❤️",
    "🌸",
    "✨",
    "🥹"
  ];

  for (let i = 0; i < amount; i++) {

    setTimeout(() => {

      const heart =
        document.createElement("div");

      heart.className =
        "celebrate-heart";

      heart.textContent =
        hearts[
          Math.floor(
            Math.random() * hearts.length
          )
        ];

      heart.style.left =
        Math.random() * 95 + "%";

      heart.style.bottom =
        "30px";

      document.body.appendChild(heart);

      setTimeout(() => {

        heart.remove();

      }, 3000);

    }, i * 80);

  }

}


/* =========================
   PARTICLE BURST
========================= */

function burst(amount = 30) {

  const icons = [
    "✨",
    "🤍",
    "🌙",
    "💫",
    "🌸",
    "⭐",
    "✦"
  ];

  for (let i = 0; i < amount; i++) {

    const particle =
      document.createElement("div");

    particle.className =
      "spark";

    particle.textContent =
      icons[
        Math.floor(
          Math.random() * icons.length
        )
      ];

    particle.style.left =
      "50vw";

    particle.style.top =
      "45vh";

    particle.style.setProperty(
      "--x",
      `${(Math.random() - 0.5) * 95}vw`
    );

    particle.style.setProperty(
      "--y",
      `${(Math.random() - 0.5) * 90}vh`
    );

    particle.style.fontSize =
      `${12 + Math.random() * 18}px`;

    document.body.appendChild(particle);

    setTimeout(() => {

      particle.remove();

    }, 1600);

  }

}


/* =========================
   STARFIELD
========================= */

let stars = [];

function resizeCanvas() {

  if (!canvas || !ctx) return;

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  const width =
    window.innerWidth;

  const height =
    window.innerHeight;

  canvas.width =
    width * dpr;

  canvas.height =
    height * dpr;

  canvas.style.width =
    `${width}px`;

  canvas.style.height =
    `${height}px`;

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

}


function createStars() {

  stars = [];

  const count =
    window.innerWidth < 600
      ? 65
      : 110;

  for (let i = 0; i < count; i++) {

    stars.push({

      x:
        Math.random() *
        window.innerWidth,

      y:
        Math.random() *
        window.innerHeight,

      radius:
        Math.random() * 1.4 + 0.25,

      speed:
        Math.random() * 0.22 + 0.03,

      opacity:
        Math.random() * 0.55 + 0.12,

      phase:
        Math.random() *
        Math.PI *
        2

    });

  }

}


function animateStars() {

  if (!canvas || !ctx) return;

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  const time =
    performance.now() / 900;

  stars.forEach((star) => {

    star.y -= star.speed;

    if (star.y < -3) {

      star.y =
        window.innerHeight + 3;

    }

    const twinkle =
      star.opacity +
      Math.sin(
        time + star.phase
      ) * 0.12;

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${Math.max(
        0.04,
        twinkle
      )})`;

    ctx.fill();

  });

  requestAnimationFrame(
    animateStars
  );

}


if (canvas && ctx) {

  resizeCanvas();

  createStars();

  animateStars();

  window.addEventListener(
    "resize",
    () => {

      resizeCanvas();
      createStars();

    }
  );

}


/* =========================
   CLICK SPARKLE
========================= */

let lastSpark = 0;

document.addEventListener(
  "pointerdown",
  (event) => {

    const now =
      Date.now();

    if (
      now - lastSpark < 650
    ) {
      return;
    }

    lastSpark = now;

    const spark =
      document.createElement("div");

    spark.className =
      "spark";

    spark.textContent =
      "✦";

    spark.style.left =
      `${event.clientX}px`;

    spark.style.top =
      `${event.clientY}px`;

    spark.style.setProperty(
      "--x",
      `${(Math.random() - 0.5) * 45}px`
    );

    spark.style.setProperty(
      "--y",
      `${-25 - Math.random() * 35}px`
    );

    document.body.appendChild(spark);

    setTimeout(() => {

      spark.remove();

    }, 1500);

  }
);


/* =========================
   AUDIO ERROR CHECK
========================= */

if (music) {

  music.addEventListener(
    "error",
    () => {

      console.warn(
        "birthday-song.mp3 could not be loaded."
      );

      if (musicControl) {
        musicControl.textContent = "🎵";
      }

    }
  );

}


/* =========================
   INITIAL STATE
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    document
      .querySelectorAll(".section")
      .forEach((section) => {

        if (
          section.getBoundingClientRect().top <
          window.innerHeight
        ) {

          section.classList.add("visible");

        }

      });

  }
);

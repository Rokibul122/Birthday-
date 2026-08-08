const $ = (id) => document.getElementById(id);


/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    $("loader").classList.add("hide");

  }, 1700);

});



/* =========================
   OPEN SURPRISE
========================= */

$("openBtn").addEventListener("click", () => {

  reveal("wish");

  burst(25);

  setTimeout(() => {

    $("wish").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 150);

});



/* =========================
   DUA BUTTON
========================= */

$("duaBtn").addEventListener("click", () => {

  const box = $("duaBox");

  box.classList.toggle("open");


  if(box.classList.contains("open")){

    $("duaBtn").textContent =
      "Dua dil se 🤲🤍";

    burst(15);

  }

  else{

    $("duaBtn").textContent =
      "Dil se ek dua 🤲";

  }

});



/* =========================
   SCROLL REVEAL
========================= */

const observer =
new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if(entry.isIntersecting){

        entry.target.classList.add("visible");

      }

    });

  },

  {
    threshold:.12
  }

);


document
.querySelectorAll(".section")
.forEach((element) => {

  observer.observe(element);

});



/* =========================
   FINAL MAGIC
========================= */

$("celebrateBtn").addEventListener(
  "click",
  () => {

    burst(90);

    showToast(
      "Allah Zainab ko hamesha khush rakhe. Ameen Ya Rabb 🤲🤍"
    );

  }
);



/* =========================
   REVEAL FUNCTION
========================= */

function reveal(id){

  const element =
    document.getElementById(id);

  element.classList.add("visible");

}



/* =========================
   TOAST
========================= */

function showToast(message){

  const toast =
    $("toast");

  toast.textContent =
    message;

  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  },3500);

}



/* =========================
   PARTICLE CELEBRATION
========================= */

function burst(amount){

  const icons = [

    "✨",
    "🤍",
    "🌙",
    "💫",
    "🌸",
    "⭐",
    "✦"

  ];


  for(
    let i=0;
    i<amount;
    i++
  ){

    const particle =
      document.createElement("div");


    particle.className =
      "spark";


    particle.textContent =
      icons[
        Math.floor(
          Math.random() *
          icons.length
        )
      ];


    particle.style.left =
      "50vw";


    particle.style.top =
      "45vh";


    particle.style.setProperty(
      "--x",
      `${(Math.random()-.5)*95}vw`
    );


    particle.style.setProperty(
      "--y",
      `${(Math.random()-.5)*90}vh`
    );


    particle.style.fontSize =
      `${12 + Math.random()*18}px`;


    document.body.appendChild(
      particle
    );


    setTimeout(() => {

      particle.remove();

    },1600);

  }

}



/* =========================
   STARFIELD
========================= */

const canvas =
  $("stars");

const ctx =
  canvas.getContext("2d");


let stars = [];



function resizeCanvas(){

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  canvas.width =
    window.innerWidth * dpr;


  canvas.height =
    window.innerHeight * dpr;


  canvas.style.width =
    window.innerWidth + "px";


  canvas.style.height =
    window.innerHeight + "px";


  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

}


resizeCanvas();


window.addEventListener(
  "resize",
  resizeCanvas
);



/* CREATE STARS */

function createStars(){

  stars = [];


  for(
    let i=0;
    i<100;
    i++
  ){

    stars.push({

      x:
        Math.random() *
        window.innerWidth,

      y:
        Math.random() *
        window.innerHeight,

      radius:
        Math.random()*1.4+.25,

      speed:
        Math.random()*.22+.03,

      opacity:
        Math.random()*.55+.12,

      phase:
        Math.random() *
        Math.PI * 2

    });

  }

}


createStars();



/* ANIMATE STARS */

function animateStars(){

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );


  const time =
    performance.now()/900;


  stars.forEach((star) => {

    star.y -= star.speed;


    if(star.y < -3){

      star.y =
        window.innerHeight + 3;

    }


    const twinkle =
      star.opacity +
      Math.sin(
        time + star.phase
      )*.12;


    ctx.beginPath();


    ctx.arc(
      star.x,
      star.y,
      star.radius,
      0,
      Math.PI*2
    );


    ctx.fillStyle =
      `rgba(255,255,255,${Math.max(.04,twinkle)})`;


    ctx.fill();

  });


  requestAnimationFrame(
    animateStars
  );

}


animateStars();



/* =========================
   CLICK SPARKLE
========================= */

let lastSpark = 0;


document.addEventListener(
  "pointerdown",
  (event) => {

    const now =
      Date.now();


    if(
      now - lastSpark <
      650
    ){

      return;

    }


    lastSpark =
      now;


    const spark =
      document.createElement("div");


    spark.className =
      "spark";


    spark.textContent =
      "✦";


    spark.style.left =
      event.clientX + "px";


    spark.style.top =
      event.clientY + "px";


    spark.style.setProperty(
      "--x",
      `${(Math.random()-.5)*45}px`
    );


    spark.style.setProperty(
      "--y",
      `${-25-Math.random()*35}px`
    );


    document.body.appendChild(
      spark
    );


    setTimeout(() => {

      spark.remove();

    },1500);

  }

);

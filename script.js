/* ==========================================
   ZAINAB BIRTHDAY
   NEXT LEVEL INTERACTIVE ENGINE
========================================== */


const fxCanvas =
  document.getElementById("fxCanvas");

const fx =
  fxCanvas.getContext("2d");

const portraitCanvas =
  document.getElementById("portraitCanvas");

const ctx =
  portraitCanvas.getContext("2d");

const portraitWrapper =
  document.getElementById("portraitWrapper");

const intro =
  document.getElementById("intro");

const enterButton =
  document.getElementById("enterButton");

const website =
  document.getElementById("website");

const secretButton =
  document.getElementById("secretButton");

const secretMessage =
  document.getElementById("secretMessage");


let W = 0;
let H = 0;

let portraitW = 0;
let portraitH = 0;

let dots = [];

let stars = [];

let burstParticles = [];

let mouse = {
  x: -9999,
  y: -9999,
  active: false
};


/* ==========================================
   RESIZE
========================================== */

function resize() {

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  W =
    window.innerWidth;

  H =
    window.innerHeight;


  fxCanvas.width =
    W * dpr;

  fxCanvas.height =
    H * dpr;

  fx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );


  const rect =
    portraitCanvas
      .getBoundingClientRect();


  portraitW =
    rect.width;

  portraitH =
    rect.height;


  portraitCanvas.width =
    portraitW * dpr;

  portraitCanvas.height =
    portraitH * dpr;

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );


  createPortrait();

  createStars();

}


/* ==========================================
   ELLIPSE
========================================== */

function ellipse(
  x,
  y,
  cx,
  cy,
  rx,
  ry
) {

  const dx =
    (x - cx) / rx;

  const dy =
    (y - cy) / ry;

  return (
    dx * dx +
    dy * dy <= 1
  );

}


/* ==========================================
   PORTRAIT SHAPES
========================================== */

function face(x,y) {

  return ellipse(
    x,
    y,
    portraitW*.50,
    portraitH*.45,
    portraitW*.205,
    portraitH*.255
  );

}


function hair(x,y) {

  return (

    ellipse(
      x,
      y,
      portraitW*.50,
      portraitH*.40,
      portraitW*.30,
      portraitH*.34
    )

    ||

    ellipse(
      x,
      y,
      portraitW*.50,
      portraitH*.58,
      portraitW*.34,
      portraitH*.25
    )

  );

}


function neck(x,y) {

  return (
    x > portraitW*.43 &&
    x < portraitW*.57 &&
    y > portraitH*.61 &&
    y < portraitH*.75
  );

}


function shoulders(x,y) {

  return ellipse(
    x,
    y,
    portraitW*.50,
    portraitH*.82,
    portraitW*.42,
    portraitH*.23
  );

}


function eyes(x,y) {

  return (

    ellipse(
      x,y,
      portraitW*.425,
      portraitH*.445,
      portraitW*.055,
      portraitH*.018
    )

    ||

    ellipse(
      x,y,
      portraitW*.575,
      portraitH*.445,
      portraitW*.055,
      portraitH*.018
    )

  );

}


function brows(x,y) {

  return (

    ellipse(
      x,y,
      portraitW*.425,
      portraitH*.405,
      portraitW*.065,
      portraitH*.012
    )

    ||

    ellipse(
      x,y,
      portraitW*.575,
      portraitH*.405,
      portraitW*.065,
      portraitH*.012
    )

  );

}


function nose(x,y) {

  return (
    Math.abs(
      x - portraitW*.50
    ) < portraitW*.018
    &&
    y > portraitH*.455
    &&
    y < portraitH*.55
  );

}


function mouth(x,y) {

  const cx =
    portraitW*.50;

  const cy =
    portraitH*.575;

  const dx =
    Math.abs(x-cx);

  const curve =
    cy +
    (dx*dx)/(portraitW*.20);

  return (
    dx < portraitW*.075 &&
    Math.abs(y-curve) <
    portraitH*.012
  );

}


/* ==========================================
   CREATE PORTRAIT
========================================== */

function createPortrait() {

  dots = [];

  const gap =
    W < 500 ? 5 : 6;


  for(
    let y=0;
    y<portraitH;
    y+=gap
  ) {

    for(
      let x=0;
      x<portraitW;
      x+=gap
    ) {

      let type = null;


      if(
        shoulders(x,y)
      )
        type = "dress";


      if(
        neck(x,y)
      )
        type = "skin";


      if(
        face(x,y)
      )
        type = "skin";


      if(
        hair(x,y) &&
        y < portraitH*.60
      )
        type = "hair";


      if(
        brows(x,y)
      )
        type = "brow";


      if(
        eyes(x,y)
      )
        type = "eye";


      if(
        nose(x,y)
      )
        type = "nose";


      if(
        mouth(x,y)
      )
        type = "mouth";


      if(!type)
        continue;


      const angle =
        Math.random()*Math.PI*2;

      const distance =
        Math.max(
          portraitW,
          portraitH
        ) *
        (.5 + Math.random()*1.2);


      dots.push({

        targetX:x,
        targetY:y,

        x:
          portraitW/2 +
          Math.cos(angle)*distance,

        y:
          portraitH/2 +
          Math.sin(angle)*distance,

        size:
          Math.random()*1.4+.5,

        type,

        phase:
          Math.random()*Math.PI*2,

        delay:
          Math.random()*1300

      });

    }

  }

}


/* ==========================================
   DOT COLORS
========================================== */

function dotColor(
  type,
  alpha
) {

  const colors = {

    hair:
      `rgba(95,72,108,${alpha})`,

    skin:
      `rgba(245,195,184,${alpha})`,

    eye:
      `rgba(220,205,255,${alpha})`,

    brow:
      `rgba(150,115,155,${alpha})`,

    nose:
      `rgba(255,180,205,${alpha})`,

    mouth:
      `rgba(255,135,195,${alpha})`,

    dress:
      `rgba(105,135,225,${alpha})`

  };

  return (
    colors[type] ||
    `rgba(200,180,255,${alpha})`
  );

}


/* ==========================================
   PORTRAIT
========================================== */

function drawPortrait(time) {

  ctx.clearRect(
    0,
    0,
    portraitW,
    portraitH
  );


  dots.forEach(dot => {

    const progress =
      Math.max(
        0,
        Math.min(
          1,
          (time-dot.delay)/1900
        )
      );


    const ease =
      1 -
      Math.pow(
        1-progress,
        5
      );


    let x =
      dot.x +
      (dot.targetX-dot.x)*ease;

    let y =
      dot.y +
      (dot.targetY-dot.y)*ease;


    /* FLOATING */

    x +=
      Math.sin(
        time*.0008+
        dot.phase
      )*.7;

    y +=
      Math.cos(
        time*.0007+
        dot.phase
      )*.7;


    /* TOUCH REPULSION */

    if(mouse.active) {

      const dx =
        x-mouse.x;

      const dy =
        y-mouse.y;

      const dist =
        Math.sqrt(
          dx*dx+dy*dy
        );


      if(
        dist < 110 &&
        dist > 0
      ) {

        const force =
          (110-dist)/110;

        x +=
          dx/dist *
          force *
          18;

        y +=
          dy/dist *
          force *
          18;

      }

    }


    const pulse =
      .75 +
      Math.sin(
        time*.002+
        dot.phase
      )*.25;


    ctx.beginPath();

    ctx.arc(
      x,
      y,
      dot.size*pulse,
      0,
      Math.PI*2
    );

    ctx.fillStyle =
      dotColor(
        dot.type,
        .7+Math.random()*.25
      );

    ctx.fill();


    /* RANDOM SPARKLE */

    if(
      Math.random() > .996
    ) {

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        dot.size*4,
        0,
        Math.PI*2
      );

      ctx.fillStyle =
        "rgba(235,220,255,.25)";

      ctx.fill();

    }

  });

}


/* ==========================================
   BACKGROUND STARS
========================================== */

function createStars() {

  stars = [];

  const amount =
    W < 600 ? 55 : 110;


  for(
    let i=0;
    i<amount;
    i++
  ) {

    stars.push({

      x:
        Math.random()*W,

      y:
        Math.random()*H,

      size:
        Math.random()*1.5+.2,

      speed:
        Math.random()*.25+.03,

      phase:
        Math.random()*Math.PI*2

    });

  }

}


/* ==========================================
   PARTICLE BURST
========================================== */

function burst(x,y) {

  for(
    let i=0;
    i<35;
    i++
  ) {

    const angle =
      Math.random()*Math.PI*2;

    const speed =
      Math.random()*4+1;


    burstParticles.push({

      x,
      y,

      vx:
        Math.cos(angle)*speed,

      vy:
        Math.sin(angle)*speed,

      life:1,

      size:
        Math.random()*2+1

    });

  }

}


/* ==========================================
   FX LOOP
========================================== */

function drawFX(time) {

  fx.clearRect(
    0,
    0,
    W,
    H
  );


  /* STARS */

  stars.forEach(star => {

    star.y -= star.speed;

    if(star.y < -5)
      star.y = H+5;


    const alpha =
      .15 +
      (
        .5 +
        Math.sin(
          time*.001+
          star.phase
        )*.5
      )*.35;


    fx.beginPath();

    fx.arc(
      star.x,
      star.y,
      star.size,
      0,
      Math.PI*2
    );

    fx.fillStyle =
      `rgba(
        215,
        200,
        255,
        ${alpha}
      )`;

    fx.fill();

  });


  /* BURST */

  burstParticles =
    burstParticles.filter(
      p => p.life > 0
    );


  burstParticles.forEach(p => {

    p.x += p.vx;

    p.y += p.vy;

    p.vx *= .97;

    p.vy *= .97;

    p.vy += .025;

    p.life -= .018;


    fx.beginPath();

    fx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI*2
    );

    fx.fillStyle =
      `rgba(
        220,
        200,
        255,
        ${p.life}
      )`;

    fx.fill();

  });

}


/* ==========================================
   MAIN ANIMATION
========================================== */

function animationLoop(time) {

  drawPortrait(time);

  drawFX(time);

  requestAnimationFrame(
    animationLoop
  );

}


/* ==========================================
   INTRO BUTTON
========================================== */

enterButton.addEventListener(
  "click",
  () => {

    burst(
      W/2,
      H/2
    );


    intro.classList.add("hide");

    website.classList.remove(
      "hidden"
    );


    setTimeout(() => {

      website.style.opacity = "1";

    },100);

  }
);


/* ==========================================
   SECRET MESSAGE
========================================== */

secretButton.addEventListener(
  "click",
  event => {

    secretMessage.classList.toggle(
      "open"
    );


    if(
      secretMessage.classList.contains(
        "open"
      )
    ) {

      secretButton.textContent =
        "You found it ✦";

      burst(
        event.clientX,
        event.clientY
      );

    }
    else {

      secretButton.textContent =
        "Tap to discover";

    }

  }
);


/* ==========================================
   MESSAGE REVEAL
========================================== */

const cards =
  document.querySelectorAll(
    ".message-card"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if(
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add("show");

          }

        }
      );

    },
    {
      threshold:.15
    }
  );


cards.forEach(card => {

  observer.observe(card);

});


/* ==========================================
   MOUSE
========================================== */

window.addEventListener(
  "mousemove",
  event => {

    const rect =
      portraitCanvas
        .getBoundingClientRect();


    mouse.x =
      event.clientX -
      rect.left;

    mouse.y =
      event.clientY -
      rect.top;


    mouse.active =
      mouse.x >= 0 &&
      mouse.x <= portraitW &&
      mouse.y >= 0 &&
      mouse.y <= portraitH;


    /* 3D PORTRAIT TILT */

    if(
      mouse.active
    ) {

      const px =
        (mouse.x/portraitW-.5);

      const py =
        (mouse.y/portraitH-.5);


      portraitWrapper.style.transform =
        `
        perspective(900px)
        rotateX(${py*-5}deg)
        rotateY(${px*5}deg)
        `;

    }

  }
);


/* RESET TILT */

portraitWrapper.addEventListener(
  "mouseleave",
  () => {

    portraitWrapper.style.transform =
      "perspective(900px) rotateX(0) rotateY(0)";

    mouse.active = false;

  }
);


/* ==========================================
   TOUCH
========================================== */

portraitCanvas.addEventListener(
  "touchmove",
  event => {

    const touch =
      event.touches[0];

    const rect =
      portraitCanvas
        .getBoundingClientRect();


    mouse.x =
      touch.clientX -
      rect.left;

    mouse.y =
      touch.clientY -
      rect.top;

    mouse.active = true;

  },
  {
    passive:true
  }
);


portraitCanvas.addEventListener(
  "touchstart",
  event => {

    const touch =
      event.touches[0];

    burst(
      touch.clientX,
      touch.clientY
    );

  },
  {
    passive:true
  }
);


portraitCanvas.addEventListener(
  "touchend",
  () => {

    mouse.active = false;

  }
);


/* ==========================================
   CLICK ANYWHERE
========================================== */

document.addEventListener(
  "click",
  event => {

    if(
      event.target.tagName === "BUTTON"
    )
      return;


    burst(
      event.clientX,
      event.clientY
    );

  }
);


/* ==========================================
   START
========================================== */

resize();

requestAnimationFrame(
  animationLoop
);


window.addEventListener(
  "resize",
  resize
);

/* script.js */

/*
  ZAINAB BIRTHDAY
  --------------------------------
  No external image is required.

  The portrait is generated completely
  with JavaScript particles/dots.
*/

const canvas =
  document.getElementById("portrait");

const ctx =
  canvas.getContext("2d");

const shell =
  document.getElementById("portraitShell");

const replay =
  document.getElementById("replay");

const loader =
  document.getElementById("loader");

const toast =
  document.getElementById("toast");

const space =
  document.getElementById("space");

const sctx =
  space.getContext("2d");


let W = 0;
let H = 0;

let DPR =
  Math.min(
    window.devicePixelRatio || 1,
    2
  );

let particles = [];
let stars = [];
let explosions = [];

let mouse = {
  x:0,
  y:0,
  active:false
};

let startTime =
  performance.now();

let exploding = false;


/* -----------------------------
   Utility
----------------------------- */

function random(a,b){
  return a + Math.random() * (b-a);
}

function clamp(v,a,b){
  return Math.max(a,Math.min(b,v));
}

function easeOut(t){
  return 1 - Math.pow(1-t,3);
}


/* -----------------------------
   Toast
----------------------------- */

function showToast(text){

  toast.textContent = text;

  toast.classList.add("show");

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(()=>{
      toast.classList.remove("show");
    },1700);
}


/* -----------------------------
   Canvas resize
----------------------------- */

function resize(){

  const rect =
    canvas.getBoundingClientRect();

  W =
    Math.max(
      1,
      Math.floor(rect.width)
    );

  H =
    Math.max(
      1,
      Math.floor(rect.height)
    );

  DPR =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  canvas.width =
    W * DPR;

  canvas.height =
    H * DPR;

  ctx.setTransform(
    DPR,
    0,
    0,
    DPR,
    0,
    0
  );

  buildPortrait();
}


/* -----------------------------
   DOT PORTRAIT

   The portrait is generated
   from a procedural dot map.
----------------------------- */

function buildPortrait(){

  particles = [];

  /*
    Face ellipse
  */

  const cx =
    W * .50;

  const faceCy =
    H * .47;

  const faceRx =
    W * .22;

  const faceRy =
    H * .37;


  /*
    Hair region
  */

  const hairCx =
    W * .50;

  const hairCy =
    H * .39;

  const hairRx =
    W * .27;

  const hairRy =
    H * .40;


  /*
    Generate particles.
  */

  for(
    let y=10;
    y<H-10;
    y+=3
  ){

    for(
      let x=10;
      x<W-10;
      x+=3
    ){

      const dx =
        (x-cx)/faceRx;

      const dy =
        (y-faceCy)/faceRy;

      const face =
        dx*dx + dy*dy < 1;


      const hdx =
        (x-hairCx)/hairRx;

      const hdy =
        (y-hairCy)/hairRy;

      const hair =
        hdx*hdx + hdy*hdy < 1;


      /*
        Hair + face silhouette
      */

      if(
        !face &&
        !hair
      ){
        continue;
      }


      /*
        Random gaps create
        a photographic dot style.
      */

      if(
        Math.random() < .22
      ){
        continue;
      }


      /*
        Face skin dots
      */

      let color;

      if(face){

        color = {
          r:220,
          g:185,
          b:190
        };

      }else{

        color = {
          r:95,
          g:82,
          b:112
        };

      }


      /*
        Eyes
      */

      const leftEye =
        Math.hypot(
          x-W*.43,
          y-H*.45
        ) < W*.025;

      const rightEye =
        Math.hypot(
          x-W*.57,
          y-H*.45
        ) < W*.025;


      /*
        Hair/details
      */

      if(
        leftEye ||
        rightEye
      ){

        color = {
          r:235,
          g:220,
          b:250
        };

      }


      /*
        Nose highlight
      */

      const nose =
        Math.hypot(
          x-W*.50,
          y-H*.52
        ) < W*.018;


      if(nose){

        color = {
          r:240,
          g:205,
          b:215
        };

      }


      /*
        Lips
      */

      const lips =
        Math.hypot(
          x-W*.50,
          y-H*.60
        ) < W*.025;


      if(lips){

        color = {
          r:245,
          g:150,
          b:175
        };

      }


      particles.push({

        tx:x,
        ty:y,

        x:
          W/2 +
          random(-W,W),

        y:
          H/2 +
          random(-H,H),

        vx:0,
        vy:0,

        r:color.r,
        g:color.g,
        b:color.b,

        size:
          random(.55,1.55),

        seed:
          Math.random() *
          Math.PI * 2,

        delay:
          Math.random() * 1500

      });

    }

  }


  /*
    Extra outline dots
  */

  for(
    let i=0;
    i<500;
    i++
  ){

    const a =
      Math.random() *
      Math.PI * 2;

    const rx =
      W*.28;

    const ry =
      H*.41;

    particles.push({

      tx:
        cx +
        Math.cos(a)*rx,

      ty:
        faceCy +
        Math.sin(a)*ry,

      x:
        random(-W,W),

      y:
        random(-H,H),

      vx:0,
      vy:0,

      r:170,
      g:140,
      b:220,

      size:
        random(.4,1.2),

      seed:
        Math.random() *
        Math.PI*2,

      delay:
        Math.random()*1800

    });

  }


  shuffle(
    particles
  );

}


/* -----------------------------
   Shuffle
----------------------------- */

function shuffle(array){

  for(
    let i=array.length-1;
    i>0;
    i--
  ){

    const j =
      Math.floor(
        Math.random()*(i+1)
      );

    [
      array[i],
      array[j]
    ] =
    [
      array[j],
      array[i]
    ];

  }

}


/* -----------------------------
   Reset animation
----------------------------- */

function resetParticles(){

  particles.forEach(
    p=>{

      const angle =
        random(
          0,
          Math.PI*2
        );

      const radius =
        Math.max(W,H) *
        random(.8,1.5);

      p.x =
        W/2 +
        Math.cos(angle) *
        radius;

      p.y =
        H/2 +
        Math.sin(angle) *
        radius;

      p.vx=0;
      p.vy=0;

      p.delay =
        random(0,1300);

    }
  );

  startTime =
    performance.now();

  exploding=false;
}


/* -----------------------------
   Draw portrait
----------------------------- */

function drawPortrait(now){

  ctx.clearRect(
    0,
    0,
    W,
    H
  );


  const elapsed =
    now-startTime;


  particles.forEach(
    p=>{

      let progress =
        clamp(
          (elapsed-p.delay)/1450,
          0,
          1
        );

      progress =
        easeOut(progress);


      let x =
        p.x +
        (p.tx-p.x) *
        progress;

      let y =
        p.y +
        (p.ty-p.y) *
        progress;


      /*
        Floating movement
      */

      if(progress>.97){

        x +=
          Math.sin(
            now*.0013+
            p.seed
          )*.45;

        y +=
          Math.cos(
            now*.0011+
            p.seed
          )*.45;

      }


      /*
        Finger magnetic field
      */

      if(mouse.active){

        const dx =
          x-mouse.x;

        const dy =
          y-mouse.y;

        const distance =
          Math.hypot(dx,dy);

        if(distance<120){

          const force =
            1 -
            distance/120;

          x +=
            dx/(distance||1) *
            force *
            32;

          y +=
            dy/(distance||1) *
            force *
            32;

        }

      }


      /*
        Explosion
      */

      if(exploding){

        x += p.vx;
        y += p.vy;

      }


      const alpha =
        .15 +
        progress*.85;


      ctx.fillStyle =
        `rgba(
          ${p.r},
          ${p.g},
          ${p.b},
          ${alpha}
        )`;


      ctx.beginPath();

      ctx.arc(
        x,
        y,
        p.size,
        0,
        Math.PI*2
      );

      ctx.fill();

    }
  );


  /*
    Sparkle dots
  */

  for(
    let i=0;
    i<30;
    i++
  ){

    if(!particles.length)
      continue;

    const p =
      particles[
        (i*67 +
        Math.floor(now/700))
        % particles.length
      ];

    const pulse =
      .5 +
      .5 *
      Math.sin(
        now*.003+i
      );

    ctx.fillStyle =
      `rgba(
        225,
        205,
        255,
        ${.12*pulse}
      )`;

    ctx.beginPath();

    ctx.arc(
      p.tx,
      p.ty,
      1.5*pulse,
      0,
      Math.PI*2
    );

    ctx.fill();

  }

}


/* -----------------------------
   Background stars
----------------------------- */

function resizeSpace(){

  space.width =
    innerWidth * DPR;

  space.height =
    innerHeight * DPR;

  sctx.setTransform(
    DPR,
    0,
    0,
    DPR,
    0,
    0
  );


  stars =
    Array.from(
      {
        length:
          Math.min(
            220,
            Math.floor(
              innerWidth/3
            )
          )
      },
      ()=>({

        x:
          Math.random() *
          innerWidth,

        y:
          Math.random() *
          innerHeight,

        radius:
          random(.25,1.1),

        alpha:
          random(.1,.55),

        speed:
          random(.0003,.0015)

      })
    );

}


function drawSpace(now){

  sctx.clearRect(
    0,
    0,
    innerWidth,
    innerHeight
  );


  stars.forEach(
    star=>{

      const alpha =
        star.alpha *
        (
          .65 +
          .35 *
          Math.sin(
            now*star.speed+
            star.x
          )
        );


      sctx.fillStyle =
        `rgba(
          205,
          190,
          235,
          ${alpha}
        )`;


      sctx.beginPath();

      sctx.arc(
        star.x,
        star.y,
        star.radius,
        0,
        Math.PI*2
      );

      sctx.fill();

    }
  );


  /*
    Explosion particles
  */

  explosions.forEach(
    p=>{

      p.x += p.vx;
      p.y += p.vy;

      p.vx *= .97;
      p.vy *= .97;

      p.life -= .018;


      sctx.fillStyle =
        `rgba(
          ${p.r},
          ${p.g},
          ${p.b},
          ${Math.max(
            0,
            p.life
          )}
        )`;


      sctx.beginPath();

      sctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI*2
      );

      sctx.fill();

    }
  );


  explosions =
    explosions.filter(
      p=>p.life>0
    );

}


/* -----------------------------
   Explosion
----------------------------- */

function explode(){

  const rect =
    shell.getBoundingClientRect();


  const cx =
    rect.width/2;

  const cy =
    rect.height/2;


  explosions=[];


  for(
    let i=0;
    i<350;
    i++
  ){

    const angle =
      random(
        0,
        Math.PI*2
      );

    const speed =
      random(1.5,8);


    explosions.push({

      x:
        cx,

      y:
        cy,

      vx:
        Math.cos(angle) *
        speed,

      vy:
        Math.sin(angle) *
        speed,

      r:
        Math.floor(
          random(120,230)
        ),

      g:
        Math.floor(
          random(100,210)
        ),

      b:
        255,

      size:
        random(.5,2.5),

      life:
        random(.7,1.5)

    });

  }


  particles.forEach(
    p=>{

      const dx =
        p.tx-W/2;

      const dy =
        p.ty-H/2;

      const distance =
        Math.hypot(dx,dy)||1;


      p.vx =
        dx/distance *
        random(3,8);

      p.vy =
        dy/distance *
        random(3,8);

    }
  );


  exploding=true;

  showToast(
    "✨ The dots remembered their way back."
  );


  setTimeout(
    ()=>{
      resetParticles();
    },
    800
  );

}


/* -----------------------------
   Touch / mouse
----------------------------- */

shell.addEventListener(
  "pointerdown",
  e=>{

    const rect =
      shell.getBoundingClientRect();

    mouse.x =
      e.clientX-
      rect.left;

    mouse.y =
      e.clientY-
      rect.top;

    mouse.active=true;

    explode();

  }
);


shell.addEventListener(
  "pointermove",
  e=>{

    const rect =
      shell.getBoundingClientRect();

    mouse.x =
      e.clientX-
      rect.left;

    mouse.y =
      e.clientY-
      rect.top;

    mouse.active=true;

  }
);


shell.addEventListener(
  "pointerleave",
  ()=>{
    mouse.active=false;
  }
);


shell.addEventListener(
  "pointerup",
  ()=>{
    setTimeout(
      ()=>{
        mouse.active=false;
      },
      500
    );
  }
);


/* -----------------------------
   Replay
----------------------------- */

replay.addEventListener(
  "click",
  ()=>{

    resetParticles();

    showToast(
      "✦ Replaying the little magic..."
    );

  }
);


/* -----------------------------
   Scroll reveal
----------------------------- */

const observer =
  new IntersectionObserver(
    entries=>{

      entries.forEach(
        entry=>{

          if(
            entry.isIntersecting
          ){

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


document
  .querySelectorAll(".reveal")
  .forEach(
    element=>
      observer.observe(element)
  );


/* -----------------------------
   Start
----------------------------- */

function start(){

  resizeSpace();

  resize();

  resetParticles();

  setTimeout(
    ()=>{
      loader
        .classList
        .add("done");
    },
    900
  );

  requestAnimationFrame(
    animate
  );

}


function animate(now){

  drawSpace(now);

  drawPortrait(now);

  requestAnimationFrame(
    animate
  );

}


window.addEventListener(
  "resize",
  ()=>{
    resizeSpace();
    resize();
  }
);


start();

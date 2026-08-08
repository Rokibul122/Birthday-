@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap');


:root{

  --background:#070816;
  --white:#faf8ff;
  --muted:#aaa8bd;

  --purple:#ad91ff;
  --pink:#ff9fd0;

  --gold:#f5dda0;

  --border:rgba(255,255,255,.13);

}


*{

  box-sizing:border-box;

}


html{

  scroll-behavior:smooth;

}


body{

  margin:0;

  min-height:100vh;

  overflow-x:hidden;

  color:var(--white);

  font-family:
  "DM Sans",
  Arial,
  sans-serif;

  background:

    radial-gradient(
      circle at 50% -10%,
      #302c68 0%,
      #12142f 35%,
      var(--background) 75%
    );

}


body::before{

  content:"";

  position:fixed;

  inset:0;

  pointer-events:none;

  z-index:1;

  opacity:.3;

  background:

    linear-gradient(
      rgba(255,255,255,.018) 1px,
      transparent 1px
    ),

    linear-gradient(
      90deg,
      rgba(255,255,255,.018) 1px,
      transparent 1px
    );

  background-size:
  48px 48px;

}


#stars{

  position:fixed;

  inset:0;

  width:100%;

  height:100%;

  z-index:0;

  pointer-events:none;

}


.glow{

  position:fixed;

  width:450px;

  height:450px;

  border-radius:50%;

  filter:blur(110px);

  opacity:.13;

  pointer-events:none;

}


.glow-one{

  background:#9c73ff;

  left:-240px;

  top:-170px;

}


.glow-two{

  background:#ff5bb5;

  right:-250px;

  top:40%;

}


/* LOADER */


#loader{

  position:fixed;

  inset:0;

  background:#070816;

  z-index:100;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  gap:12px;

  transition:.8s;

}


#loader.hide{

  opacity:0;

  visibility:hidden;

}


.loader-moon{

  font-size:70px;

  animation:float 2s infinite;

}


#loader h3{

  margin:0;

  font-size:14px;

}


#loader p{

  color:#77758a;

  font-size:11px;

}


.loading{

  width:190px;

  height:3px;

  background:#25273b;

  border-radius:20px;

  overflow:hidden;

}


.loading span{

  display:block;

  width:0;

  height:100%;

  background:

    linear-gradient(
      90deg,
      var(--purple),
      var(--pink)
    );

  animation:
  loading 1.7s forwards;

}


/* MAIN */


main{

  position:relative;

  z-index:2;

  width:100%;

  max-width:680px;

  margin:auto;

  padding:
  18px
  18px
  100px;

}


/* HERO */


.hero{

  min-height:94vh;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  text-align:center;

}


.moon-area{

  position:relative;

  width:150px;

  height:135px;

  display:grid;

  place-items:center;

  margin-bottom:8px;

}


.moon{

  font-size:82px;

  filter:
  drop-shadow(
    0 0 30px
    rgba(255,220,145,.4)
  );

  animation:
  float 3.2s ease-in-out infinite;

}


.moon-ring{

  position:absolute;

  width:115px;

  height:115px;

  border:

    1px solid
    rgba(255,230,165,.18);

  border-radius:50%;

  box-shadow:
  0 0 65px
  rgba(255,220,145,.08);

}


.orbit-star{

  position:absolute;

  color:#f7dfa4;

}


.star-one{

  animation:
  orbit 7s linear infinite;

}


.star-two{

  animation:
  orbitReverse 10s linear infinite;

}


.bismillah{

  color:#d6d2df;

  font-size:12px;

  letter-spacing:2px;

  text-transform:uppercase;

}


.small-title{

  color:#77758b;

  font-size:11px;

  margin:
  13px 0
  5px;

}


h1,
h2{

  font-family:
  "Playfair Display",
  Georgia,
  serif;

}


h1{

  font-size:
  clamp(43px,11vw,74px);

  line-height:1.02;

  margin:
  12px 0;

}


h1 span,
h2 span{

  background:

    linear-gradient(
      100deg,
      #fff,
      #d8c6ff,
      #ffb6d9
    );

  -webkit-background-clip:text;

  color:transparent;

}


.hero-text{

  color:var(--muted);

  font-size:16px;

  margin:
  12px 0
  27px;

}


.main-button,
.gold-button{

  border:

    1px solid
    rgba(255,255,255,.2);

  border-radius:999px;

  padding:
  15px
  24px;

  font-weight:700;

  font-size:14px;

  cursor:pointer;

  color:#161321;

  background:

    linear-gradient(
      135deg,
      #fff,
      #ded1ff
    );

  box-shadow:

    0 18px 55px
    rgba(145,113,255,.2);

  transition:
  transform .25s,
  box-shadow .25s;

}


.main-button:hover,
.gold-button:hover{

  transform:
  translateY(-4px);

  box-shadow:

    0 25px 70px
    rgba(145,113,255,.3);

}


.main-button b{

  margin-left:10px;

}


.scroll-hint{

  color:#68667a;

  font-size:10px;

  margin-top:17px;

}


/* SECTIONS */


.section{

  margin-top:115px;

  opacity:0;

  transform:
  translateY(42px);

  transition:
  opacity 1s,
  transform 1s;

}


.section.visible{

  opacity:1;

  transform:none;

}


.section-number{

  color:#77758a;

  font-size:10px;

  letter-spacing:2.2px;

  margin-bottom:11px;

}


section h2{

  font-size:42px;

  line-height:1.12;

  margin:
  0 0
  23px;

}


/* GLASS CARD */


.glass-card{

  position:relative;

  overflow:hidden;

  padding:28px;

  border:

    1px solid
    var(--border);

  border-radius:30px;

  background:

    linear-gradient(
      145deg,
      rgba(255,255,255,.085),
      rgba(255,255,255,.032)
    );

  backdrop-filter:blur(20px);

  box-shadow:

    0 30px 90px
    rgba(0,0,0,.27);

}


.card-light{

  position:absolute;

  width:180px;

  height:180px;

  right:-80px;

  top:-80px;

  border-radius:50%;

  background:#a98bff;

  filter:blur(55px);

  opacity:.14;

}


.glass-card p,
.letter p{

  color:#d7d3df;

  font-size:16px;

  line-height:1.85;

  margin:0;

}


.gold-button{

  margin-top:18px;

  background:

    linear-gradient(
      135deg,
      var(--gold),
      #fff
    );

}


/* DUA */


.dua-box{

  max-height:0;

  opacity:0;

  overflow:hidden;

  margin-top:15px;

  padding:
  0 22px;

  border-radius:24px;

  border:

    1px solid
    rgba(245,221,160,.18);

  background:

    rgba(245,221,160,.055);

  transition:

    max-height .8s,
    opacity .6s,
    padding .6s;

}


.dua-box.open{

  max-height:350px;

  opacity:1;

  padding:22px;

}


.dua-icon{

  font-size:28px;

  margin-bottom:7px;

}


.dua-box strong{

  color:var(--gold);

  font-size:14px;

}


/* FUN CARDS */


.cards{

  display:grid;

  grid-template-columns:
  1fr
  1fr;

  gap:13px;

}


.fun-card{

  padding:21px;

  min-height:175px;

  border:

    1px solid
    var(--border);

  border-radius:25px;

  background:

    rgba(255,255,255,.05);

  transition:.3s;

}


.fun-card:hover{

  transform:
  translateY(-8px)
  rotate(-.7deg);

  border-color:
  rgba(255,255,255,.25);

}


.fun-card.large{

  grid-row:span 2;

  min-height:363px;

  background:

    linear-gradient(
      145deg,
      rgba(169,139,255,.12),
      rgba(255,255,255,.04)
    );

}


.fun-card.wide{

  grid-column:span 2;

  min-height:140px;

}


.emoji{

  font-size:30px;

}


.fun-card h3{

  font-size:15px;

  margin:
  14px 0
  7px;

}


.fun-card p{

  color:var(--muted);

  font-size:13px;

  line-height:1.65;

  margin:0;

}


/* LETTER */


.letter{

  position:relative;

  overflow:hidden;

  padding:
  32px
  25px;

  border:

    1px solid
    var(--border);

  border-radius:30px;

  background:

    linear-gradient(
      145deg,
      rgba(255,255,255,.085),
      rgba(255,255,255,.032)
    );

  backdrop-filter:blur(20px);

  box-shadow:
  0 30px 90px
  rgba(0,0,0,.27);

}


.letter-glow{

  position:absolute;

  width:230px;

  height:230px;

  right:-130px;

  top:-130px;

  border-radius:50%;

  background:#ff72b8;

  filter:blur(80px);

  opacity:.1;

}


.stamp{

  position:absolute;

  right:20px;

  top:20px;

  padding:8px 7px;

  border:

    1px solid
    rgba(255,255,255,.18);

  border-radius:8px;

  color:#aaa5ba;

  font-size:8px;

  letter-spacing:2px;

  text-align:center;

  transform:rotate(7deg);

}


.letter-icon{

  font-size:36px;

}


.letter h2{

  font-size:38px;

}


.quote{

  display:flex;

  gap:10px;

  padding:20px;

  margin:
  24px 0;

  border-radius:21px;

  background:
  rgba(169,139,255,.07);

  border:
  1px solid
  rgba(169,139,255,.15);

}


.quote span{

  color:#bca5ff;

  font-family:Georgia,serif;

  font-size:45px;

  line-height:.7;

}


.quote p{

  margin:0!important;

}


.funny{

  color:#e8cfe0!important;

}


.signature{

  text-align:right;

  margin-top:30px;

  color:#9996a9;

  font-size:12px;

  line-height:1.8;

}


.signature b{

  color:#e4dfeb;

}


/* SECRET */


.secret-card{

  padding:24px;

  border:

    1px solid
    var(--border);

  border-radius:30px;

  background:

    rgba(255,255,255,.045);

}


.secret-row{

  display:flex;

  align-items:center;

  gap:12px;

}


.number{

  flex-shrink:0;

  width:30px;

  height:30px;

  display:grid;

  place-items:center;

  border-radius:50%;

  background:
  rgba(255,255,255,.08);

  color:#d9d4e5;

  font-size:10px;

}


.secret-row p{

  color:#d7d3df;

  font-size:14px;

  line-height:1.6;

}


.line{

  height:1px;

  background:
  var(--border);

  margin:
  18px 0;

}


/* FINAL */


.final{

  text-align:center;

  margin-top:125px;

  padding:
  35px 0
  10px;

}


.final-stars{

  color:#d8c8ff;

  font-size:16px;

  letter-spacing:8px;

}


.final-moon{

  font-size:50px;

  margin:10px;

  animation:
  float 3s ease-in-out infinite;

}


.final h2{

  font-size:44px;

}


.final > p{

  color:var(--muted);

  font-size:15px;

  line-height:1.85;

}


.ameen{

  color:var(--gold);

  font-family:
  "Playfair Display",
  Georgia,
  serif;

  font-size:34px;

  margin:24px;

}


footer{

  color:#666477;

  font-size:10px;

  margin-top:35px;

}


/* TOAST */


#toast{

  position:fixed;

  left:50%;

  bottom:24px;

  z-index:60;

  opacity:0;

  transform:
  translate(-50%,20px);

  background:#fff;

  color:#151323;

  padding:
  12px
  18px;

  border-radius:999px;

  font-size:12px;

  transition:.4s;

}


#toast.show{

  opacity:1;

  transform:
  translate(-50%,0);

}


/* PARTICLE */


.spark{

  position:fixed;

  z-index:55;

  pointer-events:none;

  animation:
  spark 1.5s
  ease-out
  forwards;

}


/* ANIMATIONS */


@keyframes loading{

  to{
    width:100%;
  }

}


@keyframes float{

  50%{
    transform:translateY(-10px);
  }

}


@keyframes orbit{

  to{
    transform:
    rotate(360deg)
    translateX(60px)
    rotate(-360deg);
  }

}


@keyframes orbitReverse{

  to{
    transform:
    rotate(-360deg)
    translateX(48px)
    rotate(360deg);
  }

}


@keyframes spark{

  to{

    transform:
    translate(var(--x),var(--y))
    rotate(400deg)
    scale(.2);

    opacity:0;

  }

}


/* MOBILE */


@media(max-width:500px){

  main{

    padding-left:14px;
    padding-right:14px;

  }


  .cards{

    grid-template-columns:1fr;

  }


  .fun-card.large,
  .fun-card.wide{

    grid-column:auto;

    grid-row:auto;

    min-height:150px;

  }


  section h2{

    font-size:35px;

  }


  .letter{

    padding:
    27px
    19px;

  }


  #toast{

    width:
    calc(100% - 35px);

    text-align:center;

  }

    }

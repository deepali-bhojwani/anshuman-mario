const body = document.querySelector('body');
const mario = document.querySelector('#mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const pipeAnimation = document.querySelector('.pipe-animation');
const chao1 = document.querySelector(".chao-1");
const chao2 = document.querySelector(".chao-2");
const marioLose = document.querySelector('#mario-lose');
let cardInicial = document.querySelector(".card-inicial")
let cardNormal = document.querySelector(".card-normal");
let cardNewRecord = document.querySelector(".card-new-record");
let displayScore = document.getElementById("text-score");
let gameData = JSON.parse(localStorage.getItem('gameData') ?? '{}');
gameData.maxScore = gameData.maxScore ?? 0;
let score = 0;
let loop;
let increaseScore;
let pipePosition;
let musicaTema;
let pipeRefer;
const jumpSound = new Audio();
jumpSound.src = 'assets/sounds/jump.mp3';

const temaSound = new Audio();
temaSound.src = 'assets/sounds/tema.mp3';

const deathSound = new Audio();
deathSound.src = 'assets/sounds/death.mp3';

const stageClear = new Audio();
stageClear.src = 'assets/sounds/stage-clear.mp3';


const jump = () => {
  mario.classList.add('jump');
  jumpSound.play()
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);

};

pipe.style.display = 'none';
clouds.style.display = 'none';

function reloadFrame() {
  temaSound.src = 'assets/sounds/tema.mp3';
  temaSound.play();
  deathSound.pause();
  stageClear.pause();
  jumpSound.src = 'assets/sounds/jump.mp3';
  cardInicial.style.display = 'none';
  cardNewRecord.style.display = 'none';
  cardNormal.style.display = 'none'
  displayScore.textContent = 0;
  clouds.style.display = 'initial';
  clouds.style.left = '';
  clouds.style.animation = '';
  clouds.className = 'clouds clouds-animation-1'
  pipe.style.display = 'initial';
  pipe.style.animation = '';
  pipe.style.left = '';
  pipe.className= 'pipe animation-pipe-1';
  marioLose.style.display = 'none';
  mario.style.display = 'initial';
  mario.style.animation = '';
  mario.style.bottom = '';
  chao1.style.animation = '';
  chao2.style.animation = '';
  chao1.style.left = '';
  chao2.style.left = '';
  chao1.className ='chao-1 animation-chao1-1'
  chao2.className ='chao-2 animation-chao2-1';
  score = 0;

  increaseScore = setInterval(() => {
    score += 1;
    displayScore.textContent = score * 10;
  }, 1000);

  loop = setInterval(() => {
    verifica()
    velocidade()
  }, 10);

  musicaTema = setInterval(()=>{
    temaSound.src = ''
    temaSound.pause();
    temaSound.src = 'assets/sounds/tema.mp3'
    temaSound.play();
    },88000)

}

window.screen.width < 1000 ? pipeRefer = 85 : pipeRefer = 120;

function verifica() {

  pipePosition = pipe.offsetLeft;
  
  const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''));
  const cloudsPostion = clouds.offsetLeft;
  const chao1Position = chao1.offsetLeft;
 //

  if (pipePosition <= pipeRefer && pipePosition > 0 && marioPosition < pipe.height) {
    temaSound.pause()
    clearInterval(musicaTema)
    jumpSound.src = '';
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    mario.style.animation = 'none';
    mario.style.display = 'none';
    marioLose.style.display = 'initial';
    marioLose.style.bottom = `${marioPosition}px`;
    clouds.style.left = `${cloudsPostion}px`
    clouds.style.animation = 'none';
    chao1.style.animation = 'none';
    chao1.style.left = `${chao1Position}px`;
   //

    clearInterval(loop)
    clearInterval(increaseScore);

    //

    else {
      deathSound.play()
      setTimeout(() => {
        localStorage.setItem('gameData', JSON.stringify(gameData));
        cardNormal.style.display = 'initial';
        let recordScore = document.querySelector(".record-score");
        let lastScore = document.querySelector(".last-score");
        lastScore.textContent = `Last score: ${score * 10}`
        recordScore.textContent = `Record score: ${gameData.maxScore * 10}`
      }, 1500)
    }
  };

}

function velocidade() {

  pipePosition = pipe.offsetLeft;
  const cloudsPostion = clouds.offsetLeft;
  if(score < 10) {
    pipe.classList.add('animation-pipe-1');
    chao1.classList.add('animation-chao1-1');
    chao2.classList.add('animation-chao2-1');
  } else if (score > 10 && score < 20 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-1');
    pipe.classList.add('animation-pipe-2');
    chao1.classList.remove('animation-chao1-1');
    //
    chao1.classList.add('animation-chao1-2');
    chao2.classList.add('animation-chao2-2');
  } else if (score > 20 && score < 30 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-2');
    pipe.classList.add('animation-pipe-3');
    //

  } else if (score > 30 && score < 40 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-3');
    pipe.classList.add('animation-pipe-4');
   //

  } else if (score > 40 && score < 60 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-4');
    pipe.classList.add('animation-pipe-5');
    chao1.classList.remove('animation-chao1-4');
    chao2.classList.remove('animation-chao2-4');
    chao1.classList.add('animation-chao1-5');
    chao2.classList.add('animation-chao2-5');
  }
  //

  }  
   
 
  
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

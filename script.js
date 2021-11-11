const dino = document.querySelector(".dino");
const background = document.querySelector(".background");

let isJumping = false;
let isGameOver = false;
let position = 0;
const INITIAL_VELOCITY = 20;
let velocity = INITIAL_VELOCITY;
const acceleration = -1;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    velocity += acceleration;
    console.log(position, velocity);
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        velocity += acceleration;
        if (position + (velocity + acceleration) <= 0) {
          clearInterval(downInterval);
          isJumping = false;
          position = 0;
          dino.style.bottom = position + "px";
          velocity = INITIAL_VELOCITY;
        } else {
          position += velocity;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      // Subindo
      //velocity = 20;
      position += velocity;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add("cactus");
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + "px";

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      //clearInterval(leftTimer);
      //isGameOver = true;
      //document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener("keyup", handleKeyUp);

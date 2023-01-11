const canvas: HTMLCanvasElement = document.querySelector("#my-canvas");

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
let gameRunning: boolean = true;

let speed: number = 5;
let snakeHeadX: number = 20;
let snakeHeadY: number = 20;
let snakeHeadYv: number = 0;
let snakeHeadXv: number = 5;

let snakeButtX: number = 0;
let snakeButtY: number = 20;
let snakeButtYv: number = 0;
let snakeButtXv: number = 5;
let counter: number = 0;
let turningPointX: number = 0;
let turningPointY: number = 0;

let rightArrowPressed: boolean = false;
let leftArrowPressed: boolean = false;
let downArrowPressed: boolean = false;
let upArrowPressed: boolean = false;

let rect: DOMRect = canvas.getBoundingClientRect();

// increase the actual size of our canvas
canvas.width = rect.width * devicePixelRatio;
canvas.height = rect.height * devicePixelRatio;

// ensure all drawing operations are scaled
ctx.scale(devicePixelRatio, devicePixelRatio);

// scale everything down using CSS
canvas.style.width = rect.width + "px";
canvas.style.height = rect.height + "px";

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    gameRunning = false;
    console.log("game over");
  }

  if (e.key === "Enter") {
    toggleFullScreen();
  }

  if (e.key === "ArrowRight") {
    rightArrowPressed = true;
    leftArrowPressed = false;
    upArrowPressed = false;
    downArrowPressed = false;
  } else if (e.key === "ArrowLeft") {
    rightArrowPressed = false;
    leftArrowPressed = true;
    upArrowPressed = false;
    downArrowPressed = false;
  } else if (e.key === "ArrowUp") {
    rightArrowPressed = false;
    leftArrowPressed = false;
    upArrowPressed = true;
    downArrowPressed = false;
  } else if (e.key === "ArrowDown") {
    rightArrowPressed = true;
    leftArrowPressed = false;
    upArrowPressed = false;
    downArrowPressed = true;
  }
});

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(snakeHeadX, snakeHeadY, 20, 20);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(snakeButtX, snakeButtY, 20, 20);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();


  snakeButtX += snakeButtXv;
  snakeButtY += snakeButtYv;
  snakeHeadX += snakeHeadXv;
  snakeHeadY += snakeHeadYv;

  //check input
  if (rightArrowPressed) {
    snakeHeadXv = 5;
    snakeHeadYv = 0;
    turningPointY = snakeHeadY;
    if (snakeButtY === turningPointY) {
      snakeButtXv = 5; 
      snakeButtYv = 0;
    }
  }
  if (leftArrowPressed) {
    snakeHeadXv = -5;
    snakeHeadYv = 0;
    turningPointY = snakeHeadY;
    if (snakeButtY === turningPointY) {
      snakeButtXv = -5; 
      snakeButtYv = 0;
    }
  }
  if (upArrowPressed) {
    snakeHeadYv = -5;
    snakeHeadXv = 0;
    turningPointX = snakeHeadX;
    if (snakeButtX === turningPointX) {
      snakeButtYv = -5; 
      snakeButtXv = 0;
    }
  }
  if (downArrowPressed) {
    snakeHeadYv = 5;
    snakeHeadXv = 0;
    turningPointX = snakeHeadX;
    if (snakeButtX === turningPointX) {
      snakeButtYv = 5;
      snakeButtXv = 0;
    }
  }

  console.log("snakeButtX: " + snakeButtX, "SnakeHeadX" + snakeHeadX);

  counter++;

  if (gameRunning) {
    window.requestAnimationFrame(draw);
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

window.requestAnimationFrame(draw);

// Ball's variables
let ballX = 300;
let ballY = 200;
let diameter = 18;
let radius = diameter/2;

// Ball's speed
let ballSpeedX = 5;
let ballSpeedY = 5;

// Racket's variables
let myRacketX = 5;
let oponentRacketX = 585;
let myRacketY = 160;
let oponentRacketY = 160;
let racketWidth = 10;
let racketHeight = 80;
let racketRadius = 50;

let missingChance = 0;

let racketSpeed = 5;

let hit = false;

// Score
let myScore = 0;
let oponentScore = 0;

// Sounds
let soundtrack;
let racketSfx;
let pointSfx;

function preload() {
  soundtrack = loadSound("soundtrack.mp3");
  racketSfx = loadSound("racket.mp3");
  pointSfx = loadSound("point.mp3");
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(0);
  
  showBall();
  moveBall();
  verifyBorderCollision();
  unstuck();
  
  showRacket(myRacketX, myRacketY);
  showRacket(oponentRacketX, oponentRacketY);
  moveMyRacket();
  moveOponentRacket();
  // autoMyRacket();
  // autoOponentRacket();
  verifyRacketCollision(myRacketX, myRacketY);
  verifyRacketCollision(oponentRacketX, oponentRacketY);
  
  showScore();
  scorePoints();
}

// Ball functions
function showBall() {
  circle(ballX, ballY, diameter);
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

function verifyBorderCollision() {
  if (ballX+radius > width || ballX-radius < 0) {
    ballSpeedX *= -1;
  }
  
  if (ballY+radius > height || ballY-radius < 0) {
    ballSpeedY *= -1;
  }
}

function unstuck() {
  if (ballX-radius < 0) {
    ballX = racketWidth+myRacketX;
  }
  if (ballX+radius > width) {
    ballX = oponentRacketX;
  }
}

// Racket functions
function showRacket(x, y) {
  rect(x, y, racketWidth, racketHeight, racketRadius);
}

function moveMyRacket() {
  if (keyIsDown(87)) {
    myRacketY -= racketSpeed;
  }
  if (keyIsDown(83)) {
    myRacketY += racketSpeed;
  }
  
  myRacketY = constrain(myRacketY, 5, 315);
}

function moveOponentRacket() {
  if (keyIsDown(UP_ARROW)) {
    oponentRacketY -= racketSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    oponentRacketY += racketSpeed;
  }
  
  oponentRacketY = constrain(oponentRacketY, 5, 315);
}

function autoOponentRacket() {
  oponentRacketY = ballY-racketHeight/2-missingChance;
  calculateMissingChance();
  
  oponentRacketY = constrain(oponentRacketY, 5, 315);
}

function autoMyRacket() {
  myRacketY = ballY-racketHeight/2+missingChance;
  
  myRacketY = constrain(myRacketY, 5, 315);
}

function calculateMissingChance() {
  if (oponentScore >= myScore) {
    missingChance += 1;
    if (missingChance >= 49) {
      missingChance = 50;
    }
  } else {
    missingChance -= 1;
    if (missingChance <= 45) {
      missingChance = 45;
    }
  }
}

// My collision function
// function verifyRacketCollision() {
//   if (ballX-radius < racketWidth+myRacketX && ballY-radius < myRacketY+racketHeight && ballY+radius > myRacketY) {
//     ballSpeedX *= -1;
//     racketSfx.play();
//   }
  
//   if (ballX+radius > oponentRacketX && ballY-radius < oponentRacketY+racketHeight && ballY+radius > oponentRacketY) {
//     ballSpeedX *= -1;
//     racketSfx.play();
//   }
// }

function verifyRacketCollision(x, y) {
  hit = collideRectCircle(x, y, racketWidth, racketHeight, ballX, ballY, radius);
  if (hit) {
    ballSpeedX *= -1;
    racketSfx.play();
  }
}

// Score functions

function showScore() {
  stroke(255);
  textSize(24);
  textAlign(CENTER);
  fill(0);
  rect(246, 18, 48, 28, 8);
  fill(255);
  text(myScore, 270, 40);
  fill(0);
  rect(301, 18, 48, 28, 8);
  fill(255);
  text(oponentScore, 325, 40);
}

function scorePoints() {
  if (ballX < 15) {
    oponentScore += 1;
    pointSfx.play();
  }
  if (ballX > 585) {
    myScore += 1;
    pointSfx.play();
  }
}
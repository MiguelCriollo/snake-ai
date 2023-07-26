let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/bjEWPBfWT/';
let video;
let flippedVideo;
let label = '';

let snake;
let rez = 20;
let food;
let w;
let h;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();

  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
  
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed(keyCode) {
  if (keyCode === "IZQUIERDA") {
    snake.setDir(-1, 0);
  } else if (keyCode === "DERECHA") {
    snake.setDir(1, 0);
  } else if (keyCode === "ABAJO") {
    snake.setDir(0, 1);
  } else if (keyCode === "ARRIBA") {
    snake.setDir(0, -1);
  }else if (keyCode === "NADA"){
    snake.setDir(0, 0);
  }else if (key == ' ') {
    snake.grow();
  }
}

function draw() {
  background(0);
  image(flippedVideo, 0, 0);

  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  console.log(label);
  keyPressed(label)
  scale(rez);

  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}


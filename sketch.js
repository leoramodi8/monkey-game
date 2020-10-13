var bananaImage, obstacleImage, obstacleGroup, foodGroup;
var monkey, monkey_running;
var backgroundd, backgrounddImage;
var score = 0;
var ground;

function preload() {
  backgrounddImage = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey1.png", "Monkey2.png", "Monkey3.png", "Monkey4.png", "Monkey5.png", "Monkey6.png", "Monkey7.png", "Monkey8.png", "Monkey9.png", "Monkey10.png");

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("stone.png");

}

function setup() {
  createCanvas(400, 400);
background(220);

  backgroundd = createSprite(200, 200, 400, 400);
  backgroundd.addImage("bg", backgrounddImage);
  backgroundd.velocityX = -4;
  backgroundd.x = backgroundd.width / 2;

  monkey = createSprite(75, 330, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(200, 380, 400, 30);
  ground.visible = false;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {

  if (backgroundd.x < 0) {
    backgroundd.x = backgroundd.width / 2;
  }

  monkey.collide(ground);

  if (keyDown("space")) {
    monkey.velocityY = -18;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

if (foodGroup.isTouching(monkey)){
  score = score+2;
  foodGroup.destroyEach();
}

if (obstacleGroup.isTouching(monkey)){
  monkey.scale = 0.15;
}

switch(score){
  case 10 : monkey.scale=0.17;
    break;
    case 20: monkey.scale= 0.19;
    break;
    case 30 : monkey.scale = 0.21;
    break;
    case 40 : monkey.scale = 0.23;
    break;
    case 50 : monkey.scale= 0.25;
    break;
    default:break;
}
  
console.log(monkey.y);

  spawnFood();
  spawnObstacles();
  
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score, 300, 50)

}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, random(160, 220), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -4;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300===0) {
    var obstacle = createSprite(400, 350, 20, 20);
    obstacle.addImage("stone", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;

    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
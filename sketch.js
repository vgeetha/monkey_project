var PLAY= 1;
var END= 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score=0;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,600); 

 monkey = createSprite(50,300,20,20);
 monkey.addAnimation('running',monkey_running);
  
 monkey.scale=0.1;
  
  ground = createSprite(200,450,1200,20);
   ground.x = ground.width/2;
  ground.velocityX = -(4 +3* score/100)
   FoodGroup= new Group();
   obstacleGroup= new Group();
  monkey.setCollider("circle",0,0,300);
  monkey.debug=true;
  score=0;
}


function draw() {
 background("lightblue");
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time:"+score,300,50);

  
  if(gameState === PLAY){
    ground.velocityX = -(4 +3* score/60);
    if (ground.x < 0){
      ground.x = ground.width/2;       
    }
    //scoring
    score = score + Math.round(getFrameRate()/60);
     if(score>0 && score%100 === 0){
    
    }
     //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 130) {
        monkey .velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the banana
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
     monkey.collide(ground);
    spawnBanana();
    spawnObstacles();
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
     if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      }
     }
   else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0
      
//set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
 
  //stop monkey from falling down
  monkey.collide(ground);

 drawSprites();
}

function spawnObstacles(){
  if (frameCount % 80 === 0){
   var obstacle1 = createSprite(600,325,10,40);
   obstacle1.velocityX = -(6 + score/100);
   obstacle1.y = Math.round(random(410,410));
    obstacle1.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle1.scale = 0.2;
    obstacle1.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle1);
 }
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    var fruit = createSprite(600,120,40,10);
   fruit.y = Math.round(random(120,120));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
   fruit.velocityX = -3;
    
     //assign lifetime to the variable
   fruit.lifetime = 200;
    
    //add each banana to the group
    FoodGroup.add(fruit);
    fruit.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;    
  }
}




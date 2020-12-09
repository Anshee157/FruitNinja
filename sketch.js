var PLAY=1;
var END=0;
var gameState=1;


var knife,knifeImage;
var enemy,enemyImage,fruit,fruitImage,background,backgroundImage;

var alien1,alien2,fruit1,fruit2,fruit3,fruit4;
var alien1Image,alien2Image,fruit1Image,fruit2Image,fruit3Image,fruit4Image;
var gameOver,gameOverImage;

var fruitGroup,enemyGroup;
var knifeSwooshSound,gameoverSound;
var position;

function preload(){
 backgroundImage=loadImage("background1.png");
  
  knifeImage=loadImage("sword.png");
  alien1Image=loadImage("alien1.png");
  alien2Image=loadImage("alien2.png");
  fruit1Image=loadImage("fruit1.png");
  fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
  fruit4Image=loadImage("fruit4.png");
  gameOverImage=loadImage("gameover.png");
 
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3")

}
function setup(){
  createCanvas(600,600);
  

  //bg
  background=createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale=3;
 
    score=0;

  
  //knife
  knife=createSprite(50,50,10,10);
  knife.addImage(knifeImage);
  knife.scale=0.5;
  
  //groups
  fruitGroup= new Group();
  enemyGroup= new Group();
  
  knife.setCollider("circle",0,0,40);
 // knife.debug = true
  
}

function draw(){
  

  
  
if (gameState===PLAY){

  //moving sword
knife.x=World.mouseX;
knife.y=World.mouseY;
  
  // scoring
  if (fruitGroup.isTouching(knife)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score=score+1;
  }
  if(enemyGroup.isTouching(knife)){
  gameState=END
    gameoverSound.play();
  }
}
if (gameState===END){
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  fruitGroup.setVelocityEach(0);
  enemyGroup.setVelocityEach(0);
  
  gameOver=createSprite(300,200);
  gameOver.addImage(gameOverImage);
}  
  
  //fruits and enemies
  fruits();
  enemies();
  
  drawSprites();
    text("Score: "+ score, 200,50);
  
}
function fruits(){
  if (World.frameCount%80===0){
    position=Math.round(random(1,2));
    fruit=createSprite(600,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1Image);
    }else if (r==2){
      fruit.addImage(fruit2Image);
    }else if (r==3){
      fruit.addImage(fruit3Image);
    }else if (r==4){
      fruit.addImage(fruit4Image);
    }
  fruit.y=Math.round(random(50,340));
      if(position==1){
   fruit.x = 400;
   fruit.velocityX=-(6+(score/4));
 }
 else
 {
   if(position==2){
   fruit.x = 0;
   fruit.velocityX=(6+(score/4));
 } 
}
  //increase the veloc.of fruit afterscore 4 or 10
    
  fruit.setLifetime=100;
  
  fruitGroup.add(fruit);
    
  } 




}
function enemies(){
  if(frameCount%200===0){
    enemy=createSprite(600,200,20,20);
 e=Math.round(random(1,2));
    if (e==1){
      enemy.addImage(alien1Image);
    }else if (e==2){
      enemy.addImage(alien2Image);
    }
    
    
    enemy.scale=1;
    enemy.y=Math.round(random(100,300));
    enemy.velocityX=-(8+(score/10));
    enemy.setLifetime=50;
   
    enemyGroup.add(enemy);

  }
 
}
var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg,zombieGroup
var liveImg,live1,live2,live3
var bulletGroup
var countLive=3

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
zombieImg=loadImage("assets/zombie.png")
liveImg=loadImage("assets/heart_1.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
  // player.debug = false
  // player.setCollider("rectangle",0,0,300,300)
zombieGroup=new Group()
bulletGroup=new Group()
live1=createSprite(100,50,70,70)
live2=createSprite(160,50,70,70)
live3=createSprite(220,50,70,70)
  live1.addImage("live1",liveImg)
  live2.addImage("live2",liveImg)
  live3.addImage("live3",liveImg)
  live1.scale=0.3
  live2.scale=0.3
  live3.scale=0.3

}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  Bullet()
  player.addImage(shooter_shooting)
 
}
if(zombieGroup.isTouching(player)){
  countLive-=1
  if(countLive==2){
    live3.visible=false
    live2.visible=true
    live1.visible=true
  }
  if(countLive==1){
    live3.visible=false
    live2.visible=false
    live1.visible=true
  }
  if(countLive==0){
    live3.visible=false
    live2.visible=false
    live1.visible=false
    textSize=5
    text("Game Over",500,500)
    
  }
}
if(bulletGroup.isTouching(zombieGroup)){
 
for(var i=0;i<zombieGroup.length;i++){
  if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy()
    bulletGroup[i].destroy()
  }
 
}
/*for(var j=0;j<bulletGroup.length;j++){
  if(bulletGroup[j].isTouching(zombieGroup)){
    bulletGroup[j].destroy()
  }
}*/
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
Zombie();


drawSprites();

}

function Zombie(){
if(frameCount%120===0){
  var ZombieR=Math.round(random(windowHeight,windowHeight/2))
  zombie=createSprite()
  var zombie=createSprite(windowWidth-100,ZombieR,100,100)
  zombie.addImage("zombies",zombieImg)
  zombie.scale=0.2
  zombie.velocityX=-5
  zombie.lifetime=300
  zombieGroup.add(zombie)
}
}



function Bullet(){
  var bullet=createSprite(100,100,5,5)
  bullet.x=player.x
  bullet.y=player.y
  bullet.shapeColor="white"
  bullet.velocityX=5
  bullet.lifetime=300
bulletGroup.add(bullet)
bullet.lifetime=300
}
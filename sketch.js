PLAY = 1;
END = 0;
var gameState = 1;
var fruit;
var knife; 
var apple, appleCut;
var orange, orangeCut;
var banana, bananaCut;
var watermelon, watermelonCut;
var bomb,monster; 
var fruitGroup, bombGroup;

function preload(){
  watermelon = loadImage("watermelon.png");
  watermelonCut = loadImage("watermeloncut.png");
  apple = loadImage("apple.jpg");
  appleCut = loadImage("applecut.png");
  orange = loadImage("orange.jpg");
  orangeCut = loadImage("orangecut.jpg")
  banana = loadImage("banana.png");
  bananaCut = loadImage("bananacut.jpg")
  bomb = loadImage("bomb.png")

  knifeImg = loadImage("knife.png");
  gameOver = loadImage("gameover.png");

  kSound = loadSound("knifeSound.mp3");
  gOver = loadSound("gameOver.mp3");
}

function setup(){
  canvas = createCanvas(600,600)

  knife = createSprite(40,200,20,20)
  knife.addImage(knifeImg)

  gameO = createSprite(300,300,20,20)
  gameO.addImage(gameOver)
  gameO.visible = false;

  score = 0;
  fruitGroup = createGroup();
  bombGroup = createGroup();
  

}

function draw(){
  background("lightblue")
  text("score:" + score,250,50)

  if (gameState === PLAY){
      
      knife.y = World.mouseY
      knife.x = World.mouseX

      fruits()
      Bmonster()


      if(fruitGroup.isTouching(knife)){
        kSound.play()
        score = score+=2;
        fruitGroup.destroyEach()
        console.log("a")

      }      

  else{
    if(bombGroup.isTouching(knife)){
      gameState = END;
      score = 0;
      bombGroup.destroyEach()
      fruitGroup.destroyEach()
      bombGroup.setVelocityXEach(0)
      fruitGroup.setVelocityXEach(0)
      gOver.play()
      gameO.visible = true
      
    }
    
    
  }
}


  drawSprites();
}

function fruits(){
  if(World.frameCount%60===0){
    fruit = createSprite(400,300,20,20)
    fruit.velocityX = 6
    var images = Math.round(random(1,4))
    if (images == 1){
      fruit.addImage(apple)
      fruit.scale = 0.15
    }
    else if(images == 2){
      fruit.addImage(banana)
      fruit.scale = 0.02
    }
    else if(images == 3){
      fruit.addImage(orange)
      fruit.scale = 0.05
    }
    else{
      fruit.addImage(watermelon)
      fruit.scale = 0.05
    }
    fruit.y = Math.round(random(50,500))
    fruit.x = 0

    fruitGroup.add(fruit)
    

  }
  
}

function Bmonster(){
  if(World.frameCount%210===0){
    monster = createSprite(40,300,20,20)
    monster.addImage("moving", bomb)
    monster.velocityX = 6
    monster.scale = 0.15
    monster.y = Math.round(random(50,500))
    monster.x = 0

    bombGroup.add(monster)
  }
  
 
}


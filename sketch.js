var database
var balloon,balloonImage;
var backGround;
var position;

function preload(){
  backGround = loadImage("images/background.png");
  balloonImage = loadAnimation("images/balloon1.png","balloon2.png","balloon3.png");
}
function setup() {
  createCanvas(500,500);
  database = firebase.database();
  balloon = createSprite(400, 200, 50, 50);
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(backGround);  
  if(position !== undefined){

    if(keyDown(LEFT_ARROW)){
      changePosition(-1,0);
      balloon.addAnimation("hotAirBalloon",balloonImage);
    }

   else if(keyDown(RIGHT_ARROW)){
      changePosition(+1,0);
      balloon.addAnimation("hotAirBalloon",balloonImage);
    }

    else if(keyDown(UP_ARROW)){
      updateHeight(0,-10);
      balloon.addAnimation("hotAirBalloon",balloonImage);
      balloon.scale = balloon.scale - 0.01;
    }

    else if(keyDown(DOWN_ARROW)){
      updateHeight(0,+10);
      balloon.addAnimation("hotAirBalloon",balloonImage);
      balloon.scale = balloon.scale + 0.01;
    }
  }
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x' : position.x + x,
    'y' : position.y + y
  })

}

function readHeight(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("error in writing the database");
}
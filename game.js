
//Created by Dhruv Hegde
//create the ball, playerPaddle and computerPaddle as sprite objects
var ball = createSprite(200,200,15,15);
var playerPaddle = createSprite(380,200,10,70);
var computerPaddle = createSprite(10,200,10,70);
var computerScore = 0;
var playerScore = 0;

//variable to store different state of game
var gameState = "serve";


function draw() {
  playerPaddle.shapeColor = "black";
  computerPaddle.shapeColor = "black";
  ball.shapeColor = "black";
  //clear the screen
  background("lightblue");
  text(computerScore, 180, 20);
  text(playerScore, 220, 20);
  
  //place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  computerPaddle.y = ball.y;
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  createEdgeSprites();
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    if (ball.x > 400) {
      computerScore = computerScore + 1;
    }
    if (ball.x < 0) {
      playerScore = playerScore + 1;
    }
    reset();
    gameState = "serve";
  }
  
  if (computerScore===5 || playerScore===5) {
    gameState = "gameOver";
    text("GAME OVER", 150, 175);
    text("Press r to Restart", 150, 150);
  }
  if (keyDown("r") && gameState==="gameOver") {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}

/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  // Game Item Objects

  const KEY = {
    "W": 87,
    "S": 83, 
    "UP": 38,
    "DOWN": 40
  }


  function createGameItem(id, speedX, speedY){
    var gameItem = {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      width: $(id).width(),
      height: $(id).height()
    }
    return gameItem;
  }

  var paddleLeft = createGameItem("#paddleLeft", 0, 0)
  var paddleRight = createGameItem("#paddleRight", 0, 0)
  var ball = createGameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1))
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    showGameItem(paddleLeft)
    updateGameItem(paddleLeft)
    showGameItem(paddleRight)
    updateGameItem(paddleRight)
    showGameItem(ball)
    updateGameItem(ball)
    wallCollision(paddleLeft)
    wallCollision(paddleRight)
    ballWallCollision(ball)
    paddleBallCollision(ball, paddleLeft, paddleRight)
    reset(ball);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY = -5
    }
    if(event.which === KEY.S){
      paddleLeft.speedY = 5
    }
    if(event.which === KEY.UP){
      paddleRight.speedY = -5
    }
    if(event.which === KEY.DOWN){
      paddleRight.speedY = 5
    }
  }
  function handleKeyUp(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY = 0
    }
    if(event.which === KEY.S){
      paddleLeft.speedY = 0
    }
    if(event.which === KEY.UP){
      paddleRight.speedY = 0
    }
    if(event.which === KEY.DOWN){
      paddleRight.speedY = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //Game Info Helper
  function showGameItem(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function updateGameItem(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }

  function wallCollision(obj){
    if (obj.y > BOARD_HEIGHT - obj.height || obj.y < 0) {
      obj.y -= obj.speedY;
    } 
  }



  

  function makeHitbox(obj){
    obj.leftX = obj.x;
    obj.topY = obj.y;
    obj.rightX = obj.x + obj.width;
    obj.bottomY = obj.y + obj.height;
  }

  function reset(obj){
    if(obj.x > BOARD_WIDTH - obj.width || obj.x < 0){
      obj.x = 437.5;
      obj.y = 237.5;
      obj.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1)
      obj.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1)
      if(obj.x > BOARD_WIDTH - obj.width){
        //show player 1 score go up
      } else if(obj.x < 0){
        //show player 2 score go up
      }
    }
    
  }


  function paddleBallCollision(ball, paddle1, paddle2){
    makeHitbox(ball);
    makeHitbox(paddle1);
    makeHitbox(paddle2);
    if(ball.leftX < paddle1.rightX && ball.topY > paddle1.topY && ball.bottomY < paddle1.bottomY){
      ball.speedX = ball.speedX + .25;
      ball.speedX = -ball.speedX;
    }
    if(ball.rightX > paddle2.leftX && ball.topY > paddle2.topY && ball.bottomY < paddle2.bottomY){
      ball.speedX = ball.speedX + .25;
      ball.speedX = -ball.speedX;
    }
  }
  
  function ballWallCollision(obj){
    makeHitbox(obj);
    if (obj.topY < 0 || obj.bottomY > BOARD_HEIGHT) {
      obj.speedY = -obj.speedY;
    } 
    
  }

  

 //Check boundaries of paddles
 //determine if objects collide
 //handle what happens when ball hits walls
 //handle what happens when ball hits paddles
 //handle what happens when someone wins
 //handles the points
 //handle resetting the game


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

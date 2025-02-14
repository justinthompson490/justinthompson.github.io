/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const WALKER_WIDTH = $("#walker").width();
  const WALKER_HEIGHT = $("#walker").height();
  const WALKER2_WIDTH = $("#walker2").width();
  const WALKER2_HEIGHT = $("#walker2").height();
  const KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,

    "A": 65,
    "W": 87,
    "D": 68,
    "S": 83,

  }
  // Game Item Objects
  var walker = Walker("#walker", 0, 0, 0, 0, WALKER_WIDTH, WALKER_HEIGHT)
  var walker2 = Walker("#walker2", BOARD_WIDTH-WALKER_WIDTH, BOARD_HEIGHT-WALKER_HEIGHT, 0, 0, WALKER_WIDTH, WALKER_HEIGHT)

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    repositionGameItem(walker);
    repositionGameItem(walker2);
    redrawGameItem(walker);
    redrawGameItem(walker2);
    wallCollision(walker);
    wallCollision(walker2);

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.LEFT){
      walker.speedX = -5;
    }
    if(event.which === KEY.UP){
      walker.speedY = -5;
    }
    if(event.which === KEY.RIGHT){
      walker.speedX = 5;
    }
    if(event.which === KEY.DOWN){
      walker.speedY = 5;
    }

    if(event.which === KEY.A){
      walker2.speedX = -5;
    }
    if(event.which === KEY.W){
      walker2.speedY = -5;
    }
    if(event.which === KEY.D){
      walker2.speedX = 5;
    }
    if(event.which === KEY.S){
      walker2.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if(event.which === KEY.LEFT){
      walker.speedX = 0;
    }
    if(event.which === KEY.UP){
      walker.speedY = 0;
    }
    if(event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
    if(event.which === KEY.DOWN){
      walker.speedY = 0;
    }

    if(event.which === KEY.A){
      walker2.speedX = 0;
    }
    if(event.which === KEY.W){
      walker2.speedY = 0;
    }
    if(event.which === KEY.D){
      walker2.speedX = 0;
    }
    if(event.which === KEY.S){
      walker2.speedY = 0;
    }

    if(doCollide(walker, walker2)){
      showConnection()
    } 
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(obj){
    obj.XPos += obj.speedX; // update the position of the box along the x-axis
    obj.YPos += obj.speedY;

  }
  function redrawGameItem(obj){
    $(obj.id).css("left", obj.XPos); // draw the box in the new location, positionX pixels away from the "left"
    $(obj.id).css("top", obj.YPos);

  }

  function wallCollision(obj){
    if(obj.XPos === BOARD_WIDTH - WALKER_WIDTH){
      obj.XPos -= 5;
    }
    if(obj.XPos === 0){
      obj.XPos += 5;
    }
    if(obj.YPos === 0){
      obj.YPos += 5;
    }
    if(obj.YPos === BOARD_HEIGHT - WALKER_HEIGHT){
      obj.YPos -= 5;
    }

  }

  function doCollide(walker, walker2) {

    walker.leftX = walker.XPos;
    walker.topY = walker.YPos;
    walker.rightX = walker.XPos + WALKER_WIDTH;
    walker.bottomY = walker.YPos + WALKER_HEIGHT;
    
    walker2.leftX = walker2.XPos;
    walker2.topY = walker2.YPos;
    walker2.rightX = walker2.Xpos + WALKER2_WIDTH;
    walker2.bottomY = walker2.YPos + WALKER2_HEIGHT;

    if(
      walker.rightX > walker2.leftX &&
      walker.leftX < walker2.rightX &&
      walker.topY < walker2.bottomY &&
      walker.bottomY > walker2.topY
      ){
        return true
      } else{
        return false
      }
  }
  function showConnection() {
    $("h2").text("They're touching!!!");
}

function Walker(id, xPos, yPos, speedX, speedY, width, height){
  let obj = {
    id : id,
    xPos : xPos,
    yPos: yPos,
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height,
  }
  return obj;
}
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y,){
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/shrieker.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;
      obstacleImage.scaleX = .5;
      obstacleImage.scaleY = .5;
    }
    

    

    function createEnemy( x, y, image, moveX, moveY, velocity, scaleX, scaleY, damage, points){//the creation of the functiion and the parameters
      var enemy = game.createGameItem("enemy", 25);//creates enemy hitzone
      var redSquare = draw.bitmap(image);//gives the enemy an image
      redSquare.x = moveX;//moves the x of the image
      redSquare.y = moveY;//moves the y of the image
      enemy.addChild(redSquare);
      enemy.x = x;//moves hitzone x
      enemy.y = y;//moves hitzone y
      game.addGameItem(enemy);
      enemy.velocityX = velocity;//creates the velocirty for any enemy in the game
      redSquare.scaleX = scaleX;//changes the x scale for the image
      redSquare.scaleY = scaleY;//changes the y scale for the image

      enemy.onPlayerCollision = function(){
      game.changeIntegrity(damage);//tells the game how much damage the enemy does
      }

      enemy.onProjectileCollision = function(){
        game.increaseScore(points);
        enemy.fadeOut();
        //enemy.shrink();
        //enemy.flyTo(x,y);
      }
    }

    
    

    function createReward(x,y,image, scale){//creation of the function and the parameters of the function
      var reward = game.createGameItem("enemy", 25);
      var blueSquare = draw.bitmap(image);//creates the image of the reward
      blueSquare.x = -25;//this is the x of the reward image
      blueSquare.y = -25;//this is the y of the reward image
      reward.addChild(blueSquare);//this puts the image on the screen
      reward.x = x;//this is the reward ritzone x
      reward.y = y;//this is the reward hitzone y
      game.addGameItem(reward);//this adds the hitzone to the screen
      reward.velocityX = -3;//this is the velocity of the reward
      blueSquare.scaleX = scale;//this is the scale of the x of the image
      blueSquare.scaleY = scale;//this is the scale of the y of the image

      reward.onPlayerCollision = function(){//function that activates whenever the player collides with the reward
      game.changeIntegrity(10);//increases the players health by 10
      game.increaseScore(100);//increases the score by 100
      reward.shrink();//makes it to where the reward shrinks on contact
      }

      reward.onProjectileCollision = function(){//this function activates whenever a player projectile connects with the reward
        game.changeIntegrity(10)//this increases the players health by 10
        game.increaseScore(100);//this increases the score by 100
        //reward.fadeOut();
        reward.shrink();//makes it to where the reward shrinks on projectile collision
        //reward.flyTo(x,y);
      }
    }


    


    function createMarker(x,y,image, scale, imageX, imageY){//creates the marker function and its parameters
      var marker = game.createGameItem("enemy", 25)//
      var yellowSquare = draw.bitmap(image);//creates the image for the marker
      yellowSquare.x = imageX;//gives the image an x value
      yellowSquare.y = imageY;//gives the image a y value
      marker.addChild(yellowSquare);
      marker.x = x;
      marker.y = y;
      game.addGameItem(marker);
      marker.velocityX = -3;
      yellowSquare.scaleX = scale;
      yellowSquare.scaleY = scale;

      marker.onPlayerCollision = function (){
        game.changeIntegrity(25);
        startLevel();
        marker.fadeOut();
      }
    }

    //function calls
    /*createSawBlade(400, groundY - 120);
    createSawBlade(700, groundY - 120);
    createSawBlade(1100, groundY - 120);
    createEnemy(400, groundY - 50);
    createEnemy(800, groundY - 50);
    createEnemy(1200, groundY - 50);
    createReward(1000, groundY - 100);
    createMarker(1500, groundY - 50);*/
    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for(var i = 0; i < levelObjects.length; i++){
        var element = levelObjects[i];
        if(element.type === "sawblade"){
          createSawBlade(element.x, element.y);
        }
        if(element.type === "enemy"){
          createEnemy(element.x, element.y, element.image, element.moveX, element.moveY, element.velocity, element.scaleX, element.scaleY, element.damage, element.points);
        }
        if(element.type === "reward"){
          createReward(element.x, element.y, element.image, element.scale);
        }
        if(element.type === "marker"){
          createMarker(element.x, element.y, element.image, element.scale, element.imageX, element.imageY);
        }
      }
 

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}

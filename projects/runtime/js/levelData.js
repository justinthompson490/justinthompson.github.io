var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY - 120},
          { type: "sawblade", x: 600, y: groundY - 120},
          { type: "sawblade", x: 900, y: groundY -120},
          {type: "enemy", x: 800, y: groundY - 50, image: "img/charger.png", moveX: -75, moveY: -75, velocity: -4, scaleX: 1, scaleY: 1, damage: -100, points: 1000},
          {type: "enemy", x: 1100, y: groundY - 50, image: "img/charger.png", moveX: -75, moveY: -75, velocity: -4, scaleX: 1, scaleY: 1, damage: -100, points: 1000},
          {type: "reward", x: 1000, y: groundY - 75, image: "img/sample.png", scale: .13},
          {type: "marker", x: 1500, y: groundY - 10, image: "img/pelican HD2.png", scale: .245, imageX: -50, imageY: -50},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
          {type: "enemy", x: 900, y: groundY - 50, image: "img/hunter.png", moveX: -75, moveY: -75, velocity: -3, scaleX: 1, scaleY: 1, damage: -25, points: 500},
          {type: "enemy", x: 1300, y: groundY - 50, image: "img/charger.png", moveX: -75, moveY: -75, velocity: -4, scaleX: 1, scaleY: 1, damage: -100, points: 1000},
          {type: "reward", x: 1200, y: groundY - 50, image: "img/sample.png", scale: .13},
          {type: "marker", x: 1500, y: groundY - 10, image: "img/pelican HD2.png", scale: .245, imageX: -50, imageY: -50},
        ],
      },
      {
        name: "Robot Radio",
        number: 3,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY -120},
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY -120},
          {type: "enemy", x: 900, y: groundY - 50, image: "img/hunter.png", moveX: -75, moveY: -75, velocity: -3, scaleX: 1, scaleY: 1, damage: -25, points: 500},
          {type: "reward", x: 1200, y: groundY - 50, image: "img/sample.png", scale: .13},
          {type: "marker", x: 1500, y: groundY - 10, image: "img/pelican HD2.png", scale: .245, imageX: -50, imageY: -50},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}

var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree ;
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.bitmap("img/helldives 2 background.jpg");9
            
            background.addChild(backgroundFill);//takes backgroundFill and is adding it as child to background
            
            // TODO 2: - Add a moon and starfield

            for(var stars = 0; stars < 100; stars++){
                var circle = draw.circle(2, "white", "yellow", 2);
                circle.x = canvasWidth * Math.random();
                circle.y = groundY * Math.random();
                background.addChild(circle);
            }

            var moon = draw.bitmap("img/moon.png");
            moon.x = canvasWidth-250;
            moon.y = groundY-350;
            moon.scaleX = 0.5;
            moon.scaleY = 0.5;
            background.addChild(moon);
            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            /*var  buildingColors = ["blue", "orange", "pink", "yellow", "green"];
            for (var i = 0; i < 5; i++){
                var buildingHeight = 300 * Math.random(); //making a variable for the height of the variable and put it at 300 pixels times the math.random command
                var building = draw.rect(75, buildingHeight, buildingColors[i], "Black", 1);// draws the individual building
                building.x = 200 * i;// creating a x value for the building which is 200 pixels time the iteration
                building.y = groundY - buildingHeight;// makes the building y which is thre ground Y minus the building height
                background.addChild(building);// adds the buildings to the background
                buildings.push(building);// taking the building created and puts it into the buildings array
            }*/
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/shrieker nest.png");
            tree.x = 400;
            tree.y = groundY - 200;
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 1;

            if (tree.x < -200) {
             tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++){
                var building = buildings[i]
                building.x = building.x - 0.5;

                if(building.x < -100){
                    building.x = canvasWidth
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; //variable made to hold a single circle
        var circles = []; // making an empty array that will be iterated over later

        // TODO 2 : Create a function that draws a circle 
        function drawCircle(){
            // Code to draw a circle
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2); //makes sure the circle is drawn on the screen
            physikz.addRandomVelocity(circle, canvas); //gives random speed
            view.addChild(circle); //gets the circle to appear on the screen
            circles.push(circle); //saves the circle in a new array
        }

        // TODO 3 / 7 : Call the drawCircle() function 
        for (var i = 0; i < 100; i++){
            drawCircle(circles[i]); //loops the creation of 100 circles 
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            //deleted because it was too repeating and a for loop iterated this code easier
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            //deleted because it was too repeating and a for loop iterated this code easier
            
            // TODO 8/9 : Iterate over the array
            for (var i = 0; i < circles.length; i++){
            game.checkCirclePosition(circles[i]); //finds out where the circle  are  on the screen
            physikz.updatePosition(circles[i]); // brings the circles back onto the screen using the loop
            }
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if ( circle.x < 0 ) {
                circle.x = canvas.width;// if the circle has gone past the left side of the screen then place it on the right
            }
            if ( circle.y < 0 ) {
                circle.y = canvas.height;// if the circle has gone past the top side of the screen then place it on the bottom
            }
            if ( circle.y > canvas.height ) {
                circle.y = 0;// if the circle has gone past the bottom side of the screen then place it on the top
            }


            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}

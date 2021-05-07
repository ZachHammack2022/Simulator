// Hammack 2021

/* Here the game rewards users for being confident and accurate by awarding addional points when they click on target. */

window.addEventListener("load", function(event) {

    "use strict";
  
        ///////////////////
      //// FUNCTIONS ////
    ///////////////////
  

    var keyDownUp = function(event) {
  
      controller.keyDownUp(event.type, event.keyCode);
  
    };

    var resize = function(event) {
  
      display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
      display.render();
  
    };
    var $on = document.addEventListener.bind(document);
  
    var xmouse, ymouse;
    $on('mousemove', function (e) {
         xmouse = e.clientX || e.pageX;
         ymouse = e.clientY || e.pageY;
    });
  
    var followMouse = function followMouse() {
        xmouse = Math.round(xmouse*128 /(document.documentElement.clientWidth - 32));
        ymouse = Math.round(ymouse*72/(document.documentElement.clientHeight - 32));
   };

   var mousepressed = false;

   var fire = function fire() {
    mousepressed = true;
    document.getElementById('audio2').play();
};

  
const scoreEl = document.querySelector('#scoreEl');
const timeEl = document.querySelector('#timeEl');


  
    var render = function() {
  
        display.fill(game.world.background_color); // Clear background to game's background color.
        display.drawRectangle(game.world.enemy1.x +10, 0, 10,game.world.height, "#202830"); // black box
    
        display.drawRectangle(game.world.enemy1.x, game.world.enemy1.y, game.world.enemy1.width, game.world.enemy1.height, game.world.enemy1.color);
        display.drawRectangle(game.world.player1.x, game.world.player1.y, game.world.player1.width, game.world.player1.height, game.world.player1.color);
        
        display.drawRectangle(game.world.enemy2.x, game.world.enemy2.y, game.world.enemy2.width, game.world.enemy2.height, game.world.enemy2.color);
        display.drawRectangle(game.world.player2.x, game.world.player2.y, game.world.player2.width, game.world.player2.height, game.world.player2.color);
        display.render();
    };

  
  
    var update = function() {
  
      if (controller.down.active) { game.world.player1.moveDown(); }
      if (controller.up.active)    { game.world.player1.moveUp(); }
    
      game.world.enemy1.moveRandomy(); 
      game.world.enemy2.moveRandomy();
      game.world.enemy2.moveRandomx();
      scoreEl.innerHTML = game.world.score;
      timeEl.innerHTML = game.world.time;
      game.update(xmouse,ymouse, mousepressed);
      mousepressed = false;
  
    };
  
  
        /////////////////
      //// OBJECTS ////
    /////////////////
    
  
    var controller = new Controller();
    var display    = new Display(document.querySelector("canvas"));
    var game       = new Game(72,128);
    var engine     = new Engine(1000/30, render, update);
    

        ////////////////////
      //// INITIALIZE ////
    ////////////////////
  
    /* This is very important. The buffer canvas must be pixel for pixel the same
    size as the world dimensions to properly scale the graphics. All the game knows
    are player location and world dimensions. We have to tell the display to match them. */
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
  
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);
    window.addEventListener("mousemove", followMouse);
    
    window.addEventListener("click", fire);
  
    resize();
  
   
    engine.start();
  
  });
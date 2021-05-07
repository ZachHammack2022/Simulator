// Zach Hammack March 2021

/* Here, we add mouse functionality for player 2. Everything else remains the same. */



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

    // the following functions allow the program to store the x and y coordinates of the mouse whenever the mouse position moves
    var $on = document.addEventListener.bind(document);

    var xmouse, ymouse;
    $on('mousemove', function (e) {
         xmouse = e.clientX || e.pageX;
         ymouse = e.clientY || e.pageY;
    });

    // This function scales the mouse coordinates to fit within the context of the canvas. This is extremely important for good playability.
    var followMouse = function followMouse() {
      xmouse = Math.round(xmouse*128 /(document.documentElement.clientWidth - 32));
      ymouse = Math.round(ymouse*72/(document.documentElement.clientHeight - 32));
   };

    const scoreEl = document.querySelector('#scoreEl');
    const timeEl = document.querySelector('#timeEl');
  
    var render = function() {
  
      display.fill(game.world.background_color);// Clear background to game's background color.
      display.drawRectangle(game.world.enemy1.x +10, 0, 10,game.world.height, "#202830") // black box
  
      display.drawRectangle(game.world.enemy1.x, game.world.enemy1.y, game.world.enemy1.width, game.world.enemy1.height, game.world.enemy1.color);
      display.drawRectangle(game.world.player1.x, game.world.player1.y, game.world.player1.width, game.world.player1.height, game.world.player1.color);
      
      display.drawRectangle(game.world.enemy2.x, game.world.enemy2.y, game.world.enemy2.width, game.world.enemy2.height, game.world.enemy2.color);
      display.drawRectangle(game.world.player2.x, game.world.player2.y, game.world.player2.width, game.world.player2.height, game.world.player2.color);
      display.render();
  
    };
    // the update function now updates the game with the scaled mouse coordinates
    var update = function() {
  
      if (controller.down.active) { game.world.player1.moveDown(); }
      if (controller.up.active)    { game.world.player1.moveUp(); }
      game.world.enemy1.moveRandomy(); 
      game.world.enemy2.moveRandomy();
      game.world.enemy2.moveRandomx();
      scoreEl.innerHTML = game.world.score;
      timeEl.innerHTML = game.world.time;
      game.update(xmouse,ymouse);
  
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
  
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
  
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);
    window.addEventListener("mousemove", followMouse);
  
    resize();
  
    engine.start();
  
  });
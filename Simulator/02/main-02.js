// Zach Hammack March 2021

/* In part 2, I added an additional player and two enemies. I implemented basic collision detection so that players will
increase their score when they collide with enemies. */


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
  // this component is new, references score in top left for player to see 
  const scoreEl = document.querySelector('#scoreEl')
  const timeEl = document.querySelector('#timeEl');


  // additional background rectangle drawn to screen, additional player and enemies drawn to screen
  var render = function() {

    display.fill(game.world.background_color);// Clear background to game's background color.
    display.drawRectangle(game.world.enemy1.x +10, 0, 10,game.world.height, "#202830") // black box

    display.drawRectangle(game.world.enemy1.x, game.world.enemy1.y, game.world.enemy1.width, game.world.enemy1.height, game.world.enemy1.color);
    display.drawRectangle(game.world.player1.x, game.world.player1.y, game.world.player1.width, game.world.player1.height, game.world.player1.color);
    
    display.drawRectangle(game.world.enemy2.x, game.world.enemy2.y, game.world.enemy2.width, game.world.enemy2.height, game.world.enemy2.color);
    display.drawRectangle(game.world.player2.x, game.world.player2.y, game.world.player2.width, game.world.player2.height, game.world.player2.color);
    display.render();

  };
  // update function expanded to track additional button inputs, random enemy movement, and score update
  var update = function() {

    if (controller.down.active) { game.world.player1.moveDown(); }
    if (controller.up.active)    { game.world.player1.moveUp(); }
    if (controller.down1.active) { game.world.player2.moveDown(); }
    if (controller.up1.active)    { game.world.player2.moveUp(); }
    if (controller.left.active) { game.world.player2.moveLeft(); }
    if (controller.right.active)    { game.world.player2.moveRight(); }
    game.world.enemy1.moveRandomy(); 
    game.world.enemy2.moveRandomy();
    game.world.enemy2.moveRandomx();
    scoreEl.innerHTML = game.world.score;
    timeEl.innerHTML = game.world.time;
    game.update();

  };

      /////////////////
    //// OBJECTS ////
  /////////////////

  var controller = new Controller();
  var display    = new Display(document.querySelector("canvas"));
  var game       = new Game();
  var engine     = new Engine(1000/30, render, update);

      ////////////////////
    //// INITIALIZE ////
  ////////////////////

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup",   keyDownUp);
  window.addEventListener("resize",  resize);

  resize();

  engine.start();

});
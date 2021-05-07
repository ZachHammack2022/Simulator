// Hammack April 2021

/* In the first minigame, I used only one player and one enemy. here, i used two. This requires much more complex collision logic. */

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


  

const scoreEl = document.querySelector('#scoreEl');
const timeEl = document.querySelector('#timeEl');

  // rely on whether players and enemies have collied to choose whether to show them. Blocks are displayed just as in minigame 1
    var render = function() {
  
        display.fill(game.world.background_color); // Clear background to game's background color.    
        if (game.world.enemy1Done == false) {
        display.drawRectangle(game.world.enemy1.x, game.world.enemy1.y, game.world.enemy1.width, game.world.enemy1.height, game.world.enemy1.color);
        }
        if (game.world.player1Done == false) {
        display.drawRectangle(game.world.player1.x, game.world.player1.y, game.world.player1.width, game.world.player1.height, game.world.player1.color);
        }
        if (game.world.enemy2Done == false) {
        display.drawRectangle(game.world.enemy2.x, game.world.enemy2.y, game.world.enemy2.width, game.world.enemy2.height, game.world.enemy1.color);
        }
        if (game.world.player2Done == false) {
        display.drawRectangle(game.world.player2.x, game.world.player2.y, game.world.player2.width, game.world.player2.height, game.world.player2.color);
        }
        if (game.world.state ==1) {
          display.drawRectangle(game.world.block1.x, game.world.block1.y, game.world.block1.width, game.world.block1.height, game.world.block1.color);
        }
        if (game.world.state ==2) {
          display.drawRectangle(game.world.block1.x, game.world.block1.y, game.world.block1.width, game.world.block1.height, game.world.block1.color);
          display.drawRectangle(game.world.block2.x, game.world.block2.y, game.world.block2.width, game.world.block2.height, game.world.block1.color);
        }
        if (game.world.state ==3) {
          display.drawRectangle(game.world.block1.x, game.world.block1.y, game.world.block1.width, game.world.block1.height, game.world.block1.color);
          display.drawRectangle(game.world.block2.x, game.world.block2.y, game.world.block2.width, game.world.block2.height, game.world.block1.color);
          display.drawRectangle(game.world.block3.x, game.world.block3.y, game.world.block3.width, game.world.block3.height, game.world.block1.color);

        }

        display.render();
    };

  
    var update = function() {
    
      if (controller.redo.active) { game.world.bigReset(); }
      if (controller.down.active) { game.world.player1.moveDown(); }
      if (controller.up.active)    { game.world.player1.moveUp(); }
      if (controller.left.active) { game.world.player1.moveLeft(); }
      if (controller.right.active)    { game.world.player1.moveRight(); }
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

    // window.addEventListener("click", fire);
  
    resize();
  
   
    engine.start();
  
  });
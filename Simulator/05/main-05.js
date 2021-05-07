// Hammack April 2021

// this minigame requires the user to avoid blocks and collide with the stagnant enemy. Upon collision, the enemy moves.

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



  // the display logic is much more complex here. I create the blocks when the game is instantiated, but only display them once they are necessary
    var render = function() {

   
  
        display.fill(game.world.background_color); // Clear background to game's background color.    
      
       
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

        display.drawRectangle(game.world.enemy.x, game.world.enemy.y, game.world.enemy.width, game.world.enemy.height, game.world.enemy.color);
        display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);

        display.render();
    };

    var update = function() {
    
      if (controller.redo.active) { game.world.bigReset(); }
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
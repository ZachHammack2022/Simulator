// Hammack March 2021

// This is the complete ASTB-E game. It includes the ability to use dichotic listening tasks, emergency situation tasks, 
// all while simultaneously tracking multiple enemies at once

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

   var soundInput = 0;

  
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

  
  // new buttons require new updates
    var update = function() {
  
      if (controller.down.active) { game.world.player1.moveDown(); }
      if (controller.up.active)    { game.world.player1.moveUp(); }

      if (controller.listen.active) {listen.beginTask();game.world.addTime(); }
      if (controller.even.active) {listen.detectEven();}
      if (controller.odd.active) {listen.detectOdd();}

      if (controller.startEvents.active) {events.beginEmergencyTasks();game.world.addTime();}
      if (controller.fixEnemyMissiles.active) {events.enemyMissileActive();}
      if (controller.fixExplosion1.active) {events.explosion1Active();}
      if (controller.fixExplosion2.active) {events.explosion2Active();}
      if (controller.fixFire1.active) {events.fire1Active();}
      if (controller.fixFire2.active) {events.fire2Active();}

      soundInput += listen.update();
      soundInput += events.update();
    
   
      game.world.enemy1.moveRandomy(); 
      game.world.enemy2.moveRandomy();
      game.world.enemy2.moveRandomx();
      scoreEl.innerHTML = game.world.score;
      timeEl.innerHTML = game.world.time;
      game.update(xmouse,ymouse, soundInput);
      soundInput = 0;
  
    };
  
  
        /////////////////
      //// OBJECTS ////
    /////////////////
    
  
    var controller = new Controller();
    var events     = new Events();
    var listen     = new Listening();
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
  
    resize();
  
   
    engine.start();
  
  });
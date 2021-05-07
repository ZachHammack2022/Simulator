// Hammack March 2021

/* The game now takes in soundInput based on how quickly the user correctly or incorrectly identifies digits in the istening test 
and how quickly they respond to emergency situation tasks. This is added or subtracted from the game's score. */

const Game = function(height1, width1) {

    this.world = {

      background_color:"rgba(255,255,255,0.25)" ,
  
      friction:0.8,
  
      score: 0,

      state: 0,

      time: 10,

      lastHit: new Date(),

      startTime: new Date(),
  
      player1:new Game.Player(6,50),
  
      enemy1: new Game.Enemy(5,20),
  
      player2:new Game.Player2(75,50),
  
      enemy2: new Game.Enemy(90, 20),
  
  
      height:height1,
      width:width1,
  
      increaseScore:function() {
        this.score++;
        var timeNow = new Date();
        if ((timeNow-this.lastHit) > 750) {
        this.time++;
        this.lastHit = timeNow;
        }
        
      },

      addTime: function() {
          this.time = 50;
      },
  
      // collide with outside walls
      collideObject:function(object) {
  
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        // needs collision detection with black rectangle
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }
        
      },
      // collide with inner walls
      collideObject2:  function(object) {
        if (object.x < this.enemy1.x +this.enemy1.width+12) { object.x = this.enemy1.x +this.enemy1.width+12; object.velocity_x = 0; }
      },
  
      // collideEnemy: function(object1, object2) {
        collideEnemy:function(object1,object2) {
  
        var dx = object1.x - object2.x;
        var dy = object1.y - object2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < object1.width/2 + object2.width/2) {
          this.increaseScore();
        }
        
      },
  
  
      update:function(x,y, soundInput) {
  
        if ((this.time > 0)) {

            var endTime = new Date();
            if (((this.startTime - endTime) < -1000)) {
              this.time--;
              this.startTime = endTime;
            }

        this.player1.update();
        this.enemy1.update();
        this.player2.update(x,y);
        this.enemy2.update();
  
        this.player1.velocity_y *= this.friction;
        this.enemy1.velocity_y *= this.friction;
        this.enemy2.velocity_y *= this.friction;
        this.enemy2.velocity_x *= this.friction;
  
        this.collideObject(this.player1);
        this.collideObject(this.enemy1);
        this.collideObject(this.player2);
        this.collideObject2(this.player2);
        this.collideObject(this.enemy2);
        this.collideObject2(this.enemy2);
  
        this.collideEnemy(this.player1, this.enemy1);
        this.collideEnemy(this.player2, this.enemy2);

        // sound is scaled down and added or subtracted from total score
        if (soundInput != 0) {
          this.score += Math.round(soundInput/50);
        }
  
    }
      }
  
    };
    // sound input is now included in game to give points for dichotic digits test
    this.update = function(x,y, soundInput) {
  
      this.world.update(x,y, soundInput);
  
    };
  
  };
  
  Game.prototype = { constructor : Game };
  
  Game.Player = function(x, y) {
  
    this.color      = "#ff0000";
    this.height     = 6;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width      = 6;
    this.x          = x;
    this.y          = y;
  },

  Game.Player2 = function(x, y) {
  
    this.color      = "#ff0000";
    this.height     = 6;
    this.width      = 6;
    this.x          = x;
    this.y          = y;
  },
  
  Game.Enemy = function(x,y) {
    this.color      = "#d3d3d3";
    this.height     = 8;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width      = 8;
    this.x          = x;
    this.y          = y;
  };
  
  Game.Player.prototype = {
  
    constructor : Game.Player,
  
    moveLeft:function()  { this.velocity_x -= 0.5; },
    moveRight:function() { this.velocity_x += 0.5; },
    moveDown:function() { this.velocity_y += 0.5; },
    moveUp:function() { this.velocity_y -= 0.5;  },
  
    update:function() {
  
      this.x += this.velocity_x;
      this.y += this.velocity_y;
  
    }
  
  }

  Game.Player2.prototype = {
  
    constructor : Game.Player2,
  
    update:function(x,y) {
  
      this.x = x;
      this.y = y;
  
    }
  
  }
  
  Game.Enemy.prototype = {
  
    constructor : Game.Enemy,
  
  
    moveRandomy:function() { this.velocity_y += 2*Math.random()-1; },
    moveRandomx:function() { this.velocity_x += 2*Math.random()-1; },
  
  
  
    update:function() {
  
      this.x += this.velocity_x;
      this.y += this.velocity_y;
  
    }
  
  }
  
  
  
  ;
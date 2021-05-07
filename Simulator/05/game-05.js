// Hammack April 2021

/* The game now takes in soundInput based on how quickly the user correctly or incorrectly identifies digits in the istening test.
This is added or subtracted from the game's score. */

const Game = function(height1, width1) {

    this.world = {
  

      background_color:"rgba(255,255,255, 0.25)",
  
      score: 0,

      state: 0,

      time: 20,

      startTime: new Date(),
  
      player:new Game.Player(75,50),
  
      enemy: new Game.Enemy(90, 20),

      block1: new Game.Block1(),

      block2: new Game.Block2(),

      block3: new Game.Block1(),
  
      height:height1,
      width:width1,
  
      increaseScore:function() {
        this.score++;
        this.time++;
        document.getElementById('audio2').play();
      },

      // collide with outside walls
      collideObject:function(object) {
  
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        // needs collision detection with black rectangle
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }
      },

      /* if check equals one dont do anything just reset */
          collideBlock:function(object1,object2, check) {
            if ((object1.x < object2.x + object2.width &&
              object1.x + object1.width > object2.x &&
              object1.y < object2.y + object2.height &&
              object1.y + object1.height > object2.y)|| (object2.x < object1.x + object1.width &&
                object2.x + object2.width > object1.x &&
                object2.y < object1.y + object1.height &&
                object2.y + object2.height > object1.y)) {
              if (check ==1) {
                return true;
              }
              else {
                this.state = 4; 
                document.getElementById('audio4').play();
              }
              return false;
            }
          },

         collideEnemy:function(object1,object2) {
              if ((object1.x < object2.x + object2.width &&
                object1.x + object1.width > object2.x &&
                object1.y < object2.y + object2.height &&
                object1.y + object1.height > object2.y)|| (object2.x < object1.x + object1.width &&
                  object2.x + object2.width > object1.x &&
                  object2.y < object1.y + object1.height &&
                  object2.y + object2.height > object1.y)) {
                this.increaseScore();
                this.enemy.newLocation();
                this.bigReset();
                return true;
              }
              return false;
              
            },
            // move block 1
            reset1: function() {
              this.block1.color = "#" + Math.floor(Math.random() * 16777216).toString(16);// Change to random color
              this.block1.newLocation();
              var collision = this.collideBlock(this.player, this.block1, 1);
              var enemyCollision1 = this.collideBlock(this.enemy, this.block1, 1);
              while (collision || enemyCollision1) {
                this.block1.newLocation();
                var collision = this.collideBlock(this.player, this.block1, 1);
                var enemyCollision1 = this.collideBlock(this.enemy, this.block1, 1);
              }
            },
            // move block 2
            reset2: function() {
              this.block2.newLocation();
                    var collision2 = this.collideBlock(this.player, this.block2, 1);
                    var enemyCollision2 = this.collideBlock(this.enemy, this.block2, 1);
                    var blockCollision1 = this.collideBlock(this.block1, this.block2, 1);
                    while (collision2 || enemyCollision2 || blockCollision1) {
                      this.block2.newLocation();
                      collision2 = this.collideBlock(this.player, this.block2, 1);
                      enemyCollision2 = this.collideBlock(this.enemy, this.block2, 1);
                      blockCollision1 = this.collideBlock(this.block1, this.block2, 1);
                    }
            },
            // move block 3
            reset3: function() {
                    this.block3.newLocation();
                    var collision3 = this.collideBlock(this.player, this.block3, 1);
                    var enemyCollision3 = this.collideBlock(this.enemy, this.block3, 1);
                    var blockCollision2 = this.collideBlock(this.block1, this.block3, 1);
                    var blockCollision3 = this.collideBlock(this.block2, this.block3, 1);
      
      
                    while (collision3 ||  enemyCollision3 || blockCollision2 || blockCollision3) {
                      this.block3.newLocation();
                      collision3 = this.collideBlock(this.player, this.block2, 1);
                      enemyCollision3 = this.collideBlock(this.enemy, this.block3, 1);
                      blockCollision2 = this.collideBlock(this.block1, this.block3, 1);
                      blockCollision3 = this.collideBlock(this.block2, this.block3, 1);
                    }
            },
      // reset blocks to allow stuck player to move and resets when player collides with enemy
      bigReset: function() {
        if (this.state >= 1) {
          this.reset1();
         }
       if (this.state >= 2) {
        this.reset2();
   
       }
       if (this.state == 3) {
        this.reset3();
   
       }
      },
      // update function now includes state logic and checks for collisions based on state
      update:function(x,y) {
      
        this.player.update(x,y);

        if(this.time == 0) {
          this.state = 4;
        }

        if (this.state != 4) {
        var endTime = new Date();
        if ((this.startTime - endTime) < -1000) {
          this.time--;
          this.startTime = endTime;
        }
        }

        if ((this.state != 4) && (this.time != 0)) {

        if (!this.collideEnemy(this.player, this.enemy)) {

        if (this.score >= 5) {
            this.state = 1;
          }
          if (((this.score % 10 == 0) && this.score > 1)) {
            this.state = 2;
            document.getElementById('audio5').play();
          }

          if (this.score > 10) {
            this.state = 2;
          }
          if (this.score > 15) {
            this.state = 3;
          }
          if (this.state == 1) {
            this.collideBlock(this.player, this.block1, 0);
          }
          if (this.state ==2) {
            this.collideBlock(this.player, this.block1, 0);
            this.collideBlock(this.player, this.block2, 0);
          }
          if (this.state ==3) {
            this.collideBlock(this.player, this.block1, 0);
            this.collideBlock(this.player, this.block2, 0);
            this.collideBlock(this.player, this.block3, 0);
          }
          
          

        this.collideObject(this.player);
        this.collideObject(this.enemy);
        }
  
    

      }

      return this.state;
  
      }
    },
    // sound input is now included in game to give points for dichotic digits test
    this.update = function(x,y) {
  
      this.world.update(x,y);
  
    }
  
  };
  
  Game.prototype = { constructor : Game };

  Game.Player = function(x, y) {
  
    this.color      = "#ff0000";
    this.height     = 6;
    this.width      = 6;
    this.x          = x;
    this.y          = y;
    this.maxheight  = 72;
    this.maxWidth   = 128;
  },
  
  Game.Enemy = function(x,y) {
    this.color      = "#d3d3d3";
    this.height     = 8;
    this.width      = 8;
    this.x          = x;
    this.y          = y;
    this.maxheight  = 72;
    this.maxWidth   = 128;
  },
  // these blocks are tall and skinny
  Game.Block1 = function() {
    this.color      = "#800080";
    this.maxheight  = 72;
    this.maxWidth   = 128;
    this.x          = (Math.random()*(this.maxWidth-10));
    this.y          = (Math.random()*(this.maxheight-10));
    this.height     = 50 + (0.3 * Math.random()*this.maxheight);
    this.width      = 5;
  },
// these blocks are short and wide
  Game.Block2 = function() {
    this.color      = "#800080";
    this.maxheight  = 72;
    this.maxWidth   = 128;
    this.x          = (Math.random()*(this.maxWidth-10));
    this.y          = (Math.random()*(this.maxheight-10));
    this.height     = 5;
    this.width      = 60 + (0.4 * Math.random()*this.maxWidth);
  };
  

  Game.Player.prototype = {
  
    constructor : Game.Player,
  
    update:function(x,y) {
  
      this.x = x;
      this.y = y;
  
    }
  
  };
  
  Game.Enemy.prototype = {
  
    constructor : Game.Enemy,
  
    newLocation: function() {
        this.x = Math.round(Math.random()*this.maxWidth);
        this.y = Math.round(Math.random()*this.maxheight);
    }
  
  };

  Game.Block1.prototype = {
  
    constructor : Game.Block,
  
    newLocation: function() {
      this.x          = (Math.random()*(this.maxWidth-10));
      this.y          = (Math.random()*(this.maxheight-10));
      this.height     = 50 + (0.3 * Math.random()*this.maxheight);
      this.width      = 5;
    }
  
  };

  Game.Block2.prototype = {
  
    constructor : Game.Block,
  
    newLocation: function() {
      this.x          = (Math.random()*(this.maxWidth-10));
      this.y          = (Math.random()*(this.maxheight-10));
      this.height     = 5;
      this.width      = 60 + (0.4 * Math.random()*this.maxWidth);
    }
  
  };
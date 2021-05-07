// Hammack April 2021

/* The game now adds logic for a second player and a second enemy. Both players must collide with both enemies before the level 
is complete. */

const Game = function(height1, width1) {

    this.world = {

      background_color:"rgba(255,255,255, 0.25)",
  
      score: 0,

      state: 0,

      time: 10,
      
      friction: 0.8,

      player1Done: false,

      player2Done: false,

      enemy1Done: false,

      enemy2Done: false,

      startTime: new Date(),
  
      player1:new Game.Player(6,50),
  
      enemy1: new Game.Enemy(5,20),
  
      player2:new Game.Player2(75,50),
  
      enemy2: new Game.Enemy(90, 20),

      block1: new Game.Block1(),

      block2: new Game.Block2(),

      block3: new Game.Block1(),
  
      height:height1,
      width:width1,
  
      increaseScore:function() {
        this.score+=1;
        this.time+=5;
      },

    
    // reset logic becomes more complex
      bigReset: function() {
        
        this.player1Done = false;
        this.player2Done = false;
        this.enemy1Done = false;
        this.enemy2Done = false;

        this.player1.lock = false;
        this.player2.lock = false;

        this.player1.velocity_x = 0;
        this.player1.velocity_y = 0;


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

      
      reset1: function() {
        this.block1.color = "#" + Math.floor(Math.random() * 16777216).toString(16);// Change to random color
        this.block1.newLocation();
        var collision = this.collideBlock(this.player1, this.block1, 1);
        var enemyCollision1 = this.collideBlock(this.enemy1, this.block1, 1);
        var collisionA = this.collideBlock(this.player2, this.block1, 1);
        var enemyCollision1A = this.collideBlock(this.enemy2, this.block1, 1);
        while (collision || enemyCollision1 || collisionA || enemyCollision1A) {
          this.block1.newLocation();
          collision = this.collideBlock(this.player1, this.block1, 1);
          enemyCollision1 = this.collideBlock(this.enemy1, this.block1, 1);
          collisionA = this.collideBlock(this.player2, this.block1, 1);
          enemyCollision1A = this.collideBlock(this.enemy2, this.block1, 1);
        }
      },

      reset2: function() {
        this.block2.newLocation();
              var collision2 = this.collideBlock(this.player1, this.block2, 1);
              var enemyCollision2 = this.collideBlock(this.enemy1, this.block2, 1);
              var blockCollision1 = this.collideBlock(this.block1, this.block2, 1);
              var collision2A = this.collideBlock(this.player2, this.block2, 1);
              var enemyCollision2A = this.collideBlock(this.enemy2, this.block2, 1);
              while (collision2 || enemyCollision2 || blockCollision1 || collision2A || enemyCollision2A) {
                this.block2.newLocation();
                collision2 = this.collideBlock(this.player1, this.block2, 1);
                enemyCollision2 = this.collideBlock(this.enemy1, this.block2, 1);
                blockCollision1 = this.collideBlock(this.block1, this.block2, 1);
                collision2A = this.collideBlock(this.player2, this.block2, 1);
                enemyCollision2A = this.collideBlock(this.enemy2, this.block2, 1);
              }
      },

      reset3: function() {
              this.block3.newLocation();
              var collision3 = this.collideBlock(this.player1, this.block3, 1);
              var enemyCollision3 = this.collideBlock(this.enemy1, this.block3, 1);
              var collision3A = this.collideBlock(this.player2, this.block3, 1);
              var enemyCollision3A = this.collideBlock(this.enemy2, this.block3, 1);
              var blockCollision2 = this.collideBlock(this.block1, this.block3, 1);
              var blockCollision3 = this.collideBlock(this.block2, this.block3, 1);


              while (collision3 ||  enemyCollision3 || blockCollision2 || blockCollision3 || collision3A|| enemyCollision3A) {
                this.block3.newLocation();
                collision3 = this.collideBlock(this.player1, this.block2, 1);
                enemyCollision3 = this.collideBlock(this.enemy1, this.block3, 1);
                collision3A = this.collideBlock(this.player2, this.block3, 1);
                enemyCollision3A = this.collideBlock(this.enemy2, this.block3, 1);
                blockCollision2 = this.collideBlock(this.block1, this.block3, 1);
                blockCollision3 = this.collideBlock(this.block2, this.block3, 1);
              }
      },


  
      // collide with outside walls
      collideObject:function(object) {
  
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        // needs collision detection with black rectangle
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.y = this.height - object.height; object.velocity_y = 0; }
        
      },

    
      /* if check equals 1 dont do anything just reset */
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
            if (object1 == this.player1) {
                this.player1Done = true;
                this.player1.lock = true;
            }
            else if (object1 == this.player2) {
                this.player2Done = true;
                this.player2.lock = true;
            }
            if (object2 == this.enemy1) {
                this.enemy1Done = true;
                this.enemy1.newLocation();
                
            }
            else if (object2 == this.enemy2) {
                this.enemy2Done = true;
                this.enemy2.newLocation();


            }
            return true;
          }
          return false;
          
        },

 

  
  
      update:function(x,y) {

        if (this.player1Done && this.player2Done) {
            this.bigReset();
        }
        this.player1.update();
        this.player2.update(x,y);
    

        this.collideObject(this.player1);
        this.collideObject(this.enemy1);
        this.collideObject(this.player2);
        this.collideObject(this.enemy2);
     
  
       if (this.player1.lock == false) {
        this.player1.velocity_y *= this.friction;
        this.player1.velocity_x *= this.friction;
       }

        if (this.state != 4) {
        var endTime = new Date();
        if ((this.startTime - endTime) < -1000) {
          this.time--;
          this.startTime = endTime;
        }
        }

        if ((this.state != 4) && (this.time != 0)) {

        if (!this.collideEnemy(this.player1, this.enemy1) && !this.collideEnemy(this.player2, this.enemy2) 
        && !this.collideEnemy(this.player1, this.enemy2) && !this.collideEnemy(this.player2, this.enemy1)   ) {

        if (this.score >= 4) {
            this.state = 1;
          }

          if (this.score >= 8) {
            this.state = 2;
          }
          if (this.score > 12) {
            this.state = 3;
          }
          if (this.state == 1) {
            this.collideBlock(this.player1, this.block1, 0);
            this.collideBlock(this.player2, this.block1, 0);

          }
          if (this.state ==2) {
            this.collideBlock(this.player1, this.block1, 0);
            this.collideBlock(this.player2, this.block2, 0);
            this.collideBlock(this.player1, this.block1, 0);
            this.collideBlock(this.player2, this.block2, 0);
          }
          if (this.state ==3) {
            this.collideBlock(this.player1, this.block1, 0);
            this.collideBlock(this.player2, this.block2, 0);
            this.collideBlock(this.player1, this.block3, 0);
            this.collideBlock(this.player2, this.block1, 0);
            this.collideBlock(this.player1, this.block2, 0);
            this.collideBlock(this.player2, this.block3, 0);
          }
          
          

    
        }
  
    

      }

  
      }
    };
    // sound input is now included in game to give points for dichotic digits test
    this.update = function(x,y) {
  
      this.world.update(x,y);
  
    };
  
  };
  
  Game.prototype = { constructor : Game };

  Game.Player = function(x, y) {
  
    this.color      = "#ff0000";
    this.height     = 6;
    this.width      = 6;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x          = x;
    this.y          = y;
    this.maxheight  = 72;
    this.maxWidth   = 128;
    this.lock       = false;
  };


  Game.Player2 = function(x, y) {
  
    this.color      = "#0000FF";
    this.height     = 6;
    this.width      = 6;
    this.x          = x;
    this.y          = y;
    this.lock       = false;
  };
  
  Game.Enemy = function(x,y) {
    this.color      = "#d3d3d3";
    this.height     = 8;
    this.width      = 8;
    this.x          = x;
    this.y          = y;
    this.maxheight  = 72;
    this.maxWidth   = 128;
  };

  Game.Block1 = function() {
    this.color      = "#800080";
    this.maxheight  = 72;
    this.maxWidth   = 128;
    this.x          = (Math.random()*(this.maxWidth-10));
    this.y          = (Math.random()*(this.maxheight-10));
    this.height     = 50 + (0.3 * Math.random()*this.maxheight);
    this.width      = 5;
  };

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
  
    moveLeft:function()  { if (this.lock == false) this.velocity_x -= 0.5;  },
    moveRight:function() { if (this.lock == false)this.velocity_x += 0.5; },
    moveDown:function() {if (this.lock == false)this.velocity_y += 0.5; },
    moveUp:function() { if (this.lock == false)this.velocity_y -= 0.5;  },
  
    update:function() {
        if (this.lock == false){
      this.x += this.velocity_x;
      this.y += this.velocity_y;
        }
  
    }
  
  };

  Game.Player2.prototype = {
  
    constructor : Game.Player2,
  
    update:function(x,y) {
    if (this.lock == false){
      this.x = x;
      this.y = y;
        }
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
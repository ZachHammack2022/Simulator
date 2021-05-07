// Hammack March 2021

/* New buttons are added for dichotic digit test. 1 begins the test. 2 indicates an even number. 3 indicates an odd number. New 
buttons are also added for the event tasks. 0 begins the event tasks. F and space fix the fire. E and ; fix the explosion, and m
fixes the incoming enemy missiles. */

const Controller = function() {

    this.up    = new Controller.ButtonInput();
    this.down  = new Controller.ButtonInput();
    this.listen = new Controller.ButtonInput();
    this.even = new Controller.ButtonInput();
    this.odd = new Controller.ButtonInput();
    
    this.startEvents = new Controller.ButtonInput();
    this.fixFire1 = new Controller.ButtonInput();
    this.fixFire2 = new Controller.ButtonInput();
    this.fixExplosion1 = new Controller.ButtonInput();
    this.fixExplosion2 = new Controller.ButtonInput();
    this.fixEnemyMissiles = new Controller.ButtonInput();



    this.keyDownUp = function(type, key_code) {
  
      var down = (type == "keydown") ? true : false;
  
      switch(key_code) {
  
        case 83: this.down.getInput(down);   break; //down
        case 87: this.up.getInput(down);    break; // up
        case 50: this.even.getInput(down);    break; //2
        case 51: this.odd.getInput(down);    break; // 3
        case 70: this.fixFire1.getInput(down);    break; // f
        case 32: this.fixFire2.getInput(down);    break; // space
        case 69: this.fixExplosion1.getInput(down);    break;// e
        case 186: this.fixExplosion2.getInput(down);    break; //;
        case 77: this.fixEnemyMissiles.getInput(down);    break; //m
        case 48: this.startEvents.getInput(down);    break; //0
        case 49: this.listen.getInput(down);  // 1
        
      }
  
    };
  
  };
  
  Controller.prototype = {
  
    constructor : Controller
  
  };
  
  Controller.ButtonInput = function() {
  
    this.active = this.down = false;
  
  };
  
  Controller.ButtonInput.prototype = {
  
    constructor : Controller.ButtonInput,
  
    getInput : function(down) {
  
      if (this.down != down) this.active = down;
      this.down = down;
  
    }
  
  };
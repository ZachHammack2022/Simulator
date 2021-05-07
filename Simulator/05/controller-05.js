// Hammack April 2021

/* New button redo is added for when we need to reset the blocks. */

const Controller = function() {

    this.redo    = new Controller.ButtonInput();

    this.keyDownUp = function(type, key_code) {
  
      var down = (type == "keydown") ? true : false;
  
      switch(key_code) {
  
        case 32: this.redo.getInput(down);    break; // space
        
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
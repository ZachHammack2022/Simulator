// Zach Hammack March 2021

/* Several new buttons are added to allow user to control both players using buttons */

const Controller = function() {

  this.up    = new Controller.ButtonInput();
  this.down  = new Controller.ButtonInput();
  this.up1   = new Controller.ButtonInput();
  this.down1 = new Controller.ButtonInput();
  this.left  = new Controller.ButtonInput();
  this.right = new Controller.ButtonInput();

  this.keyDownUp = function(type, key_code) {

    var down = (type == "keydown") ? true : false;

    switch(key_code) {

      
      case 83: this.down.getInput(down);   break;
      case 87: this.up.getInput(down);   break;

      case 38: this.up1.getInput(down);    break;
      case 40: this.down1.getInput(down);  break;
      case 37: this.left.getInput(down);   break;
      case 39: this.right.getInput(down);  

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
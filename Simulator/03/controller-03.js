// Zach Hammack March 2021

/* Button inputs decrease as we switch to control player2 with mouse. */

const Controller = function() {

  this.up    = new Controller.ButtonInput();
  this.down  = new Controller.ButtonInput();

  this.keyDownUp = function(type, key_code) {

    var down = (type == "keydown") ? true : false;

    switch(key_code) {

      case 83: this.down.getInput(down);   break;
      case 87: this.up.getInput(down);   

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
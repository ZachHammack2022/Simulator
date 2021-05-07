// hammack March 2021

// Listening task relies on hardcoded audio file and answerkey to detect user accuracy and speed

const Listening = function() {


    var startTime = new Date();
    var endTime;
    var duration;
    var answer = 0; // 0 if if there is no answer, 2 for even, 3 for odd
    var readyToBegin = 0; // has the initial ten seconds passed?
    var taskStarted = 0; // we pressed 1
    var soundInput = 0; // we send to game function
    var clicked2 = 0; // if we clicked 2 
    var clicked3 = 0; // if we clicked 3
    var answerkey = [3,2,0,2,0];
    var counter = 0; // will go up to answer key length
    var alreadyAnswered = 0; // has the user already answered the question
    var soundInput = 0;
// When 1 is pressed, play the dichotic listening task. Start stopwatch to listen for inputs.
 this.beginTask = function() {
      
    document.getElementById('audio3').play();
    startTime = new Date();
    taskStarted = 1;

  };
  // when 2 is pressed after 1
  this.detectEven = function() {

    clicked2 = 1;
    clicked3 = 0;
 
   };

    // when 3 is pressed after 1
  this.detectOdd = function() {

    clicked3 = 1;
    clicked2 = 0;
 
   };


    // check answer logic 
   this.checkanswer = function(number) {
    var realAnswer = answerkey[counter];
    if (realAnswer == number) {
      if (number == 0) {
        soundInput = 2000;
      }
      else {soundInput = duration;
      }
    }
    else {
      soundInput = -2000;
    }
    clicked2 = 0;
    clicked3 = 0;
    alreadyAnswered = 1;
    counter++;
  }

  // update
 this.update = function() {
     soundInput = 0;
  if (taskStarted == 1) {
    endTime = new Date();
    duration = (endTime.getTime() - startTime.getTime());
    if (duration > 10000) {
      readyToBegin =1;
      startTime = new Date();
      duration = 0;
    }
    if (readyToBegin ==1) { 
        if (clicked2 == 1 && alreadyAnswered ==0) {
        answer = 2;
        if (counter < answerkey.length) {
        this.checkanswer(answer);
      }
    }
    if (clicked3 ==1 && alreadyAnswered ==0) {
      answer = 3;
      if (counter < answerkey.length) {
        this.checkanswer(answer);
        }
    }
    if (duration > 4999) {
      if (alreadyAnswered == 0) {
        if (counter < answerkey.length) {
          this.checkanswer(0);
          }
      }
      startTime = new Date();
      alreadyAnswered = 0;
      clicked2 = 0;
      clicked3 = 0;
    }
  }
}
return soundInput;
 }

};

Listening.prototype = {

   constructor : Listening
 
 };
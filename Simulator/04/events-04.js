/* Hammack March 2021
This is the events file. It keeps log of which events the user has completed and which events the user has not completed. It sends
information to the gamefile through its property soundInput. This refers to the input to the game file useed to increase score. */

const Events = function() {

    var state = 0;
    var x = document.getElementById("thing1");
    var y = document.getElementById("thing2");
    var z = document.getElementById("thing3");
    var beginEmergencyTask1 = 0; // has the first emergency task begun?
    var beginEmergencyTask2 = 0; // has the second emergency task begun?
    var beginEmergencyTask3 = 0; // has the third emergency task begun?
    var startTime2 = new Date();
    var endTime2; // endtime for emergency situations
    var duration2; // duration of emergency situation
    var fire1;
    var fire2;
    var explosion1;
    var explosion2;
    var missile1;
    var soundInput = 0;

    
  
  // when something is pressed, begin emergency tasks
  this.beginEmergencyTasks = function () {
    beginEmergencyTask1 = 1;
    startTime2 = new Date();
  };



      // when f is pressed
  this.fire1Active = function() {

    fire1 = 1;
 
   };

      // when space is pressed
  this.fire2Active = function() {

    fire2 = 1;
 
   };

     // when e is pressed
  this.explosion1Active = function() {

    explosion1 = 1;
 
   };
   // when ; is pressed
  this.explosion2Active = function() {

    explosion2 = 1;
 
   };

  // when m is pressed
  this.enemyMissileActive = function() {

   missile1 = 1;

  };

    // when m is pressed
    this.resetEmergencyTasks = function() {

      beginEmergencyTask3 = 0;
      beginEmergencyTask2 = 0;
      beginEmergencyTask1 = 0;
      fire1 = 0;
      fire2 = 0;
      explosion1 = 0;
      explosion2 = 0;
      missile1 = 0;
 
     };

     this.update = function() {
         soundInput = 0;
        if (beginEmergencyTask3 ==1) {
            endTime2 = new Date();
            duration2 = (endTime2.getTime() - startTime2.getTime());
            if (duration2 > 10000) {
              soundInput = -2000;
              resetEmergencyTasks();
            }
            else if (missile1 ==1) {
              soundInput = 2000;
              this.resetEmergencyTasks();
            }
            else {
              document.getElementById('audio7').play();
            }
          }
          if (beginEmergencyTask2 ==1) {
            endTime2 = new Date();
            duration2 = (endTime2.getTime() - startTime2.getTime());
            if (duration2 > 10000) {
              soundInput = -2000;
              beginEmergencyTask2 = 0;
              beginEmergencyTask3 = 1;
              startTime2 = new Date();
            }
            
            else if (explosion1 ==1 && explosion2==1) {
              soundInput = 2000;
              beginEmergencyTask2 = 0;
              beginEmergencyTask3 = 1;
              startTime2 = new Date();
            }
            else {
              document.getElementById('audio6').play();
            }
          }
          if (beginEmergencyTask1 ==1) {
            endTime2 = new Date();
            duration2 = (endTime2.getTime() - startTime2.getTime());
            if (duration2 > 10000) {
              soundInput = -2000;
              beginEmergencyTask1 = 0;
              beginEmergencyTask2 = 1;
              startTime2 = new Date();
            }
            
            else if (fire1 ==1 && fire2==1) {
              soundInput = 2000;
              beginEmergencyTask1 = 0;
              beginEmergencyTask2 = 1;
              startTime2 = new Date();
            }
            else {
              document.getElementById('audio1').play();
            }
          }
          // every 30ms, we will flash the required text if necessary. Any faster could have negative effects on users
          // who are prone to seizures 
          state++;
          if ((state%30) == 1) {
              if (beginEmergencyTask1 ==1) {
                x.classList.remove("fadeout1");
                x.classList.add("fadein1");
              }
              if (beginEmergencyTask2 ==1) {
                y.classList.remove("fadeout2");
                y.classList.add("fadein2");
              }
              if (beginEmergencyTask3 ==1) {
                z.classList.remove("fadeout3");
                z.classList.add("fadein3");
              }
            }
            else if ((state%15) == 1) {
              if (beginEmergencyTask1 ==1) {
                x.classList.remove("fadein1");
                x.classList.add("fadeout1");
              }
              if (beginEmergencyTask2 ==1) {
                y.classList.remove("fadein2");
                y.classList.add("fadeout2");
              }
              if (beginEmergencyTask3 ==1) {
                z.classList.remove("fadein3");
                z.classList.add("fadeout3");
              }
            }
            if (beginEmergencyTask1 ==0) {
              x.classList.remove("fadein1");
              x.classList.add("fadeout1");
            }
            if (beginEmergencyTask2 ==0) {
              y.classList.remove("fadein2");
              y.classList.add("fadeout2");
            }
            if (beginEmergencyTask3 ==0) {
              z.classList.remove("fadein3");
              z.classList.add("fadeout3");
            }
          return soundInput;
     }

   
     };

     Events.prototype = {
  
        constructor : Events
      
      };
/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var key = {
    left: 37,
    right: 39,
    up: 38,
    down: 40
  }
  var walker = {
    xcord: 5,
    ycord: 5,
    xspeed: 0,
    yspeed: 0
  }
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                        // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    wallCollision()
    redrawGameItem()
  }
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === key.left) {
      walker.xspeed = -5
    }
    if (event.which === key.right) {
      walker.xspeed = 5
    }
    if (event.which === key.up) {
      walker.yspeed = -5
    }
    if (event.which === key.down) {
      walker.yspeed = 5
    }
  }

  function handleKeyUp() {
    if (walker.xspeed === 5) {
      walker.xspeed = 0
    }
    if (walker.xspeed === -5) {
      walker.xspeed = 0
    }
    if (walker.yspeed === 5) {
      walker.yspeed = 0
    }
    if (walker.yspeed === -5) {
      walker.yspeed = 0
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }


  function repositionGameItem() {
    walker.xcord += walker.xspeed
    walker.ycord += walker.yspeed
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.xcord);
    $("#walker").css("top", walker.ycord);
  }
  function wallCollision() {
    if (walker.xcord <= 0) {
      walker.xcord = 0
    }
    if (walker.xcord >= ($("#board").width() - 50)) {
      walker.xcord = $("#board").width() - 50
    }
    if (walker.ycord <= 0) {
      walker.ycord = 0
    }
    if (walker.ycord >= ($("#board").height() -50)) {
      walker.ycord = $("#board").height() - 50
    }
  }
}
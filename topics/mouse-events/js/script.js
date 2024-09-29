/**
 * Art Jam
 * Nat Nina
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/

//setup function
function setup() {
  createCanvas(500, 500);
}

//draw function
function draw() {
  //change the entire canvas to black if mouseX is at the far right end
  if (mouseX >= 480) {
    background(0); // black background
    return; // exit draw to prevent drawing other shapes
  } else {
    background(135, 206, 235);
  }
}
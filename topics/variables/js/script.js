/**
 * Introducing variables
 * Nat Nina
 * 
 * Learning variables
 * 
 */

"use strict";

/**
 * Create canvas
*/
function setup() {
createCanvas  (640,640)
}


/**
 * Draws a circle in center of canvas
*/
function draw() {
    background(0)

    //Draw the circle
    push()
    fill (255,255,0)
    noStroke()
    ellipse(width / 2,height / 2,100,100)
    pop ()

}
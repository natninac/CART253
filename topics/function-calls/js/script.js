/**
 * Function calls work
 * Nat Nina
 * 
 * Learning about function calls by doing a lil project
 * 
 */

"use strict";

/**
 * Setup is this format because that was the instruction
*/
function setup() {
createCanvas(640,480)
}


/**
 * Tried to make a face with the rectangles
*/
function draw() {
background(255,200,100)

push()
noStroke()
fill(255,255,255)
rect(80,50,240,350)
pop()

noStroke()
rect(380,50,240,200)
noStroke()
rect(80,420,500,40)
}
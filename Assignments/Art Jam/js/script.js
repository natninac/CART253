/**
 * Death of The Sun
 * Nat Nina
 * 
 * Nat's art jam assignment.
 * 
 */

"use strict";

/**
 * Setup is this format because that was the instruction
*/
function setup() {
createCanvas(500,500)
}

//draw function
function draw () {
    //change the entire canvas to black if mouseX is at the far right end
    if (mouseX >= 480) {
        background (0); // black background
        return; //stop drawing other shapes
    } else  {
        background (135, 206, 235);
    }
    //custom variable for sun color
    let sunRed = map(mouseX, 0, 500, 255, 255);
    let sunGreen = map(mouseX, 0, 500, 255, 0);
    //draws sun
    fill (sunRed, sunGreen, 0)
    noStroke ()
    circle (400, 125, 100 + mouseX * 2)
}

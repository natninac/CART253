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
    //sun
  let Sun = {
    x: 400,
    y: 125,
    size: 100 + mouseX * 2,
    fill: {
      r: sunRed,
      g: sunGreen,
      b: 0
    },
    death:mouseY / 5
    };
    //shaking
    Sun.death = constrain(Sun.death, 0, 15);
    const x = Sun.x + random(-Sun.death,Sun.death);
    const y = Sun.y + random(-Sun.death,Sun.death);
    //size constrain
    Sun.size = constrain (Sun.size, 100, 800);

     //draws sun
     fill(Sun.fill.r, Sun.fill.g, Sun.fill.b);
     noStroke();
     circle(x, y, Sun.size);
//draws grassy meadow
fill(175, 225, 175);
noStroke();
ellipse(250, 450, 800, 250);

//draws cloud one 
fill(255, 255, 255);
noStroke();
ellipse(mouseX, 100, 400, 100);

fill(255, 255, 255);
noStroke();
ellipse(mouseX, 40, 200, 100);

//draws cloud two
fill(255, 255, 255);
noStroke();
ellipse(mouseX + 200, 190, 150, 20);

//draws cloud three
fill(255, 255, 255);
noStroke();
ellipse(mouseX - 40, 250, 100, 20);

fill(255, 255, 255);
noStroke();
ellipse(mouseX - 40, 240, 80, 25);
}


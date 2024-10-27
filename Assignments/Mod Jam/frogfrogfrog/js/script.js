/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";
var health = 50;
var maxHealth = 400;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    //And eyes
    eyeL: {
        x:undefined,
        y:450,
        size:40
    },
    eyeR: {
        x:undefined,
        y:450,
        size:40
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random 
    startY: 200,
    size: 10,
    speed: { x:3,
        y:3}
};

const poison = {
    x: 0,
    y: 200, // Will be random 
    startY: 100,
    size: 7,
    speed: { x:3,
        y:3}
};


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
    resetPoisonFly();
}


function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    drawEyes();
    drawCoordinates()
    drawHealthBar()
    drawPoisonFly()
    movePoisonFly()
}



/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed.x;
    fly.y += fly.speed.y;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
    // keeps fly in constrained y path
    if ( (fly.y > fly.startY + 50)  ||(fly.y < fly.startY - 50))  // if velocity less than height - the radius or
    //velocity greater than radius
  {
    fly.speed.y = - fly.speed.y;
    }

}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
    fly.startY = fly.y
}

//Draws poison fly
function drawPoisonFly() {
    push ()
    noStroke ()
    fill ("#00FF00")
    ellipse(poison.x, poison.y, poison.size)
    pop()
}
function movePoisonFly() {
    // Move the fly
    poison.x += poison.speed.x;
    poison.y += poison.speed.y;
    // Handle the fly going off the canvas
    if (poison.x > width) {
        resetPoisonFly();
    }
    // keeps fly in constrained y path
    if ( (poison.y > poison.startY + 70)  ||(poison.y < poison.startY - 70))  // if velocity less than height - the radius or
    //velocity greater than radius
  {
    poison.speed.y = - poison.speed.y;
    }

}
function resetPoisonFly() {
    poison.x = 0;
    poison.y = random(0, 300);
    poison.startY = poison.y
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}
/**
 * Moves the frog to the mouse position on x
 */
function drawEyes() {
    frog.eyeL.x = mouseX-50;
    frog.eyeR.x = mouseX+50;
}
//Draw coordinates of the cursor to correctly place things 
function drawCoordinates(){
text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
stroke(0);
textAlign(CENTER);
  textSize(16)
noFill();
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
    // Draw frog's left eye
    push ()
    fill("#ffffff");
    noStroke()
    ellipse(frog.eyeL.x, frog.eyeL.y, frog.eyeL.size)
    pop()
    // Draw frog's right eye
    push ()
    fill("#ffffff");
    noStroke()
    ellipse(frog.eyeR.x, frog.eyeR.y, frog.eyeR.size)
    pop()

     // Draw left pupil
     push();
     fill("#000000");
     noStroke();
     ellipse(frog.eyeL.x, frog.eyeL.y - 10, frog.eyeL.size / 2);
     pop();
 
     // Draw right pupil
     push();
     fill("#000000");
     noStroke();
     ellipse(frog.eyeR.x, frog.eyeR.y - 10, frog.eyeL.size / 2);
     pop();
}


  

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

function drawHealthBar() {

  
    health = min(maxHealth, ++health);
    
    noStroke();
    fill(255, 0, 0);
    rect(10, 10, map(health, 0, maxHealth, 0, 200), 20);
    
  }


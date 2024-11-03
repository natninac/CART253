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

//Health 
let health = 50;
const maxHealth = 400;
//Is the game over?
let gameOver = false;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    //And eyes
    eyes: [
        { x: undefined, y: 450, size: 40 }, // Left eye
        { x: undefined, y: 450, size: 40 }  // Right eye
    ],
    
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
    y: 50, // Will be random 
    startY: 200,
    size: 10,
    speed: { x:3,
        y:3}
};

const poison = {
    x: 0,
    y: 200, // Will also be random 
    startY: 100,
    size: 7,
    speed: { x:1,
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

    //puts health at max in the beginning
    health = maxHealth;
}


function draw() {
    if (gameOver) {
        endScreen();
        return;
    }
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    checkTonguePoisonOverlap();
    drawEyes();
    drawCoordinates()
    drawHealthBar()
    drawPoisonFly()
    movePoisonFly()

    // Check if health is below a number and draw the third eye
    if (health < 200) {
        drawThirdEye();

    }

    if (health <= 0) {
        gameOver = true;
    }

    

}

//End screen if game is over
function endScreen() {
    if (gameOver);
        push();
        background ("#FF0000")
        textSize(30);
        fill ('#00FF00')
        textStyle(BOLD)
        text ("YOU HAVE DIED OF...", width/2, height/3)
        textSize(48);
        fill ('#00FF00')
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("RADIATION POISONING!!!", width/2, height/2);
    pop();

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
    frog.eyes[0].x = mouseX-50;
    frog.eyes[1].x = mouseX+50;
    // Draw left eye
    fill("#ffffff");
    noStroke();
    ellipse(frog.eyes[0].x, frog.eyes[0].y, frog.eyes[0].size); // Left eye

    // Draw right eye
    fill("#ffffff");
    noStroke();
    ellipse(frog.eyes[1].x, frog.eyes[1].y, frog.eyes[1].size); // Right eye

    // Draw left pupil
    fill("#000000");
    ellipse(frog.eyes[0].x, frog.eyes[0].y - 10, frog.eyes[0].size / 2); // Left pupil

    // Draw right pupil
    fill("#000000");
    ellipse(frog.eyes[1].x, frog.eyes[1].y - 10, frog.eyes[1].size / 2); // Right pupil
}
// Function to draw the third eye on the frog's forehead
function drawThirdEye() {
    push();
    fill("#ffffff");
    noStroke();
    ellipse(frog.body.x, frog.body.y - 100, frog.eyes[1].size); // Position the third eye
    fill("#000000");
    ellipse(frog.body.x, frog.body.y - 110, frog.eyes[1].size / 2); // Draw the pupil
    pop();
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

    //Frog gets darker as it gets more poisoned
    let fullHealth = color ("#00ff00");
    let lowHealth = color("#000000");
    let healthFactor = map(health, 0, maxHealth, 0, 1);
    let frogColor = lerpColor(lowHealth,fullHealth,healthFactor);

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
    fill(frogColor);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
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
        health = min(maxHealth,health + 10)
    }
}
/**
 * Handles the tongue overlapping the poison fly
 */
function checkTonguePoisonOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, poison.x, poison.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + poison.size/2);
    if (eaten) {
        // Reset the fly
        resetPoisonFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        health = max(0,health - 100)
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
    
    noStroke();
    fill(255, 0, 0);
    rect(10, 10, map(health, 0, maxHealth, 0, 200), 20);
    
  }
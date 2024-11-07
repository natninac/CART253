/**
 * Radiation Frog
 * Nat Nina
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch black flies
 * - Avoid green radiation flies... Or die!
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//Health 
let health = 50;
const maxHealth = 405;

//Is the game over?
let gameOver = false;

// Our frog
const frog = {
    // The frog's body with its position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    //The frog's two eyes array
    eyes: [
        { x: undefined, y: 450, size: 40 }, // Left eye
        { x: undefined, y: 450, size: 40 },  // Right eye
    ],
    
    // The frog's tongue with its position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Fly has a position, size, speed of horizontal and vertical movement, fill and health effect
let fly = {
    x: 0,
    y: 50, // Will be random 
    startY: 200, // Stores the start position
    size: 10,
    fill: ("#000000"), //Black fly
    speed: { x:3,
        y:3},
     healthEffect: + 10 //Add 10 health points when injested
};

let poison = {
    x: 0,
    y: 200, // Will also be random 
    startY: 100, // Stores the start position
    size: 7,
    fill: ("#00FF00"), //Green fly
    speed: { x:1,
        y:3}, //Speed on x and y axis
    healthEffect: - 100, //Removes 100 health if injested
};

//Creates the canvas, initializes the fly and health
function setup() {
    createCanvas(640, 480);

    // Give the flies their first random position
    resetFly(fly);
    resetFly(poison);
   
    //Puts health at max in the beginning
    health = maxHealth;
}


function draw() {

    //Stops drawing if the game is over
    if (gameOver) {
        endScreen();
        return;
    }

    //Functions
    background("#87ceeb");
    
    //Moves the flies
    moveFly (fly);
    moveFly(poison);

    drawFly(fly);
    drawFly(poison);

    drawFrog();
    drawEyes();
    drawHealthBar();

    moveFrog();
    moveTongue();
   
    checkTongueFlyOverlap(fly);
    checkTongueFlyOverlap(poison);

    // Check if health is below a number and draw the third eye
    if (health < 200) {
        drawThirdEye();
    }

    //Game over if health is 0 or under
    if (health <= 0) {
        gameOver = true;
    }
}


//End screen if game is over
function endScreen() {
        push();
        background ("#FF0000")

        //First line
        textSize(30);
        fill ('#00FF00')
        textStyle(BOLD)
        text ("YOU HAVE DIED OF...", width/2, height/3);
        
        //Second line
        textSize(48);
        fill ('#00FF00')
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text("RADIATION POISONING!!!", width/2, height/2);
        pop();
}


 //Moves the fly according to its speed
 //Resets the fly if it gets all the way to the right
 
function moveFly(element) {
    // Move the flies
    element.x += element.speed.x;
    element.y += element.speed.y;
    // Handle the flies going off the canvas
    if (element.x > width) {
        resetFly(element);
    }
    // Keeps flies in constrained y path
    if ( (element.y > element.startY + 50)  ||(element.y < element.startY - 50))
   
// Make flies change directions
  {
    element.speed.y = - element.speed.y;
    }
}

//Draws both flies
function drawFly(element) {
    push();
    noStroke();
    fill (element.fill);
    ellipse(element.x, element.y, element.size);
    pop();
}

 //Moves the frog to the mouse position on x
function moveFrog() {
    frog.body.x = mouseX;
}

//Draws eyes 
function drawEyes() {
    frog.eyes[0].x = mouseX-50; //Array for left eye
    frog.eyes[1].x = mouseX+50; //Array for right eye
    
    // Draw left eye
    fill("#ffffff");
    noStroke();
    ellipse(frog.eyes[0].x, frog.eyes[0].y, frog.eyes[0].size); 

    // Draw right eye
    fill("#ffffff");
    noStroke();
    ellipse(frog.eyes[1].x, frog.eyes[1].y, frog.eyes[1].size);

    // Draw left pupil
    fill("#000000");
    ellipse(frog.eyes[0].x, frog.eyes[0].y - 10, frog.eyes[0].size / 2); 

    // Draw right pupil
    fill("#000000");
    ellipse(frog.eyes[1].x, frog.eyes[1].y - 10, frog.eyes[1].size / 2);
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

 //Handles moving the tongue based on its state
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

 //Displays the tongue (tip and line connection) and the frog (body)
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

//Handles the tongue overlapping the fly
function checkTongueFlyOverlap(element) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, element.x, element.y);
    if (d < frog.tongue.size/2 + element.size/2) {
        // Reset the fly
        resetFly(element);
        // Bring back the tongue
        frog.tongue.state = "inbound";
        //Health effect
        health = health + element.healthEffect;
        health = constrain(health, 0, maxHealth);
    }
}


//Resets the fly to the left with a random y
function resetFly(element) {
    element.x = 0;
    element.y = random(0, 300);
    element.startY = element.y
}

//Launch the tongue on click (if it's not launched yet) 
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

// Draw the health bar
function drawHealthBar() {   
    noStroke();
    fill(255, 0, 0);
    rect(10, 10, map(health, 0, maxHealth, 0, 200), 20);
    
  }
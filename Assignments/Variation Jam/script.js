/**
 * Hangman
 * Nat Nina
 * 
 * Guess the word!
 * 
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//Array for the words to guess
let words = ["test", "hangman" ]

//Array for all the hangman parts
let hangmanParts = [
    {type: "circle", cx: 250, cy: 170, r: 20}, //Head
    { type: "line", x1: 250, y1: 190, x2: 250, y2: 270 }, // Body
]

//Setup
function setup() {
    createCanvas(600, 600);
}


//Draw
function draw() {
    background(240);
}
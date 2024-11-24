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
let words = ["test", "hangman" ];
let word; //Random word in the list
let guessedWord; //Tracks the progress of the user
//Store correct guesses and wrong guesses
let correctGuesses = []; //Guessed letters
let wrongGuesses = [];

//Maximum guesses
let maxGuesses = 10;
let guessedLetters;
let guessesLeft = maxGuesses; //Max guesses before starting


//Array for all the hangman parts
let hangmanParts = [
    {type: "line", x1: 200, y1: 400, x2: 400, y2: 400}, //Base
    {type: "line", x1: 300, y1: 400, x2: 300, y2: 200}, //Pole
    {type: "line", x1: 300, y1: 200, x2: 400, y2: 200}, //Top beam
    {type: "line", x1: 400, y1: 200, x2: 400, y2: 230}, //Rope
    {type: "circle", cx: 400, cy: 250, r: 20},         //Head
    {type: "line", x1: 400, y1: 270, x2: 400, y2: 330}, //Body
    {type: "line", x1: 400, y1: 290, x2: 380, y2: 310}, //Left arm
    {type: "line", x1: 400, y1: 290, x2: 420, y2: 310}, // Right arm
    {type: "line", x1: 400, y1: 330, x2: 380, y2: 360}, //Left leg
    {type: "line", x1: 400, y1: 330, x2: 420, y2: 360}, //Right leg
]
//Setup
function setup() {
    createCanvas(600, 600);
    textAlign(CENTER, CENTER);
    startNewGame();
}


//Draw
function draw() {
    background(240);

    //Draw guessed word
  textSize(32);
  text(guessedWord.join(" "), width / 2, height / 2 - 200);

  //Draw guessed letters
  textSize(16);
  text(`Guessed letters: ${guessedLetters.join(', ')}`, width / 2, height - 40);

  //Draw remaining attempts
  text(`Attempts left: ${maxGuesses - wrongGuesses}`, width / 2, height - 20);

  //Draw hangman parts
  drawHangman();

  //Check for win/loss
  if (wrongGuesses >= maxGuesses) {
    gameOver(false); //Loss
  } else if (!guessedWord.includes('_')) {
    gameOver(true); //Win
  }
}
//Start a new game
function startNewGame() {
    word = random(words).split(''); //Choose a random word
    guessedWord = Array(word.length).fill('_'); //Start with underscores
    guessedLetters = []; //Reset guessed letters
    wrongGuesses = 0; //Reset wrong guesses
  }
  
  //Keys pressed
  function keyPressed() {
    if (keyCode === ENTER) {
      startNewGame(); //Restart game on ENTER
      return;
    }
    let letter = key.toLowerCase();
    if (letter >= 'a' && letter <= 'z' && !guessedLetters.includes(letter)) {
      guessedLetters.push(letter); //Add to guessed letters
      checkGuess(letter);
    }
  }
  
  //Check if guessed letter is correct
  function checkGuess(letter) {
    let correct = false;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        guessedWord[i] = letter; //Update guessed word
        correct = true;
      }
    }
    if (!correct) {
      wrongGuesses++; //Increment wrong guesses if incorrect
    }
  }
  
  //Draw the hangman based on wrong guesses
  function drawHangman() {
    stroke(0);
    strokeWeight(2);
  
  
    //Draw parts based on wrong guesses
    for (let i = 0; i < wrongGuesses; i++) {
      let part = hangmanParts[i];
      if (part.type === "circle") {
        ellipse(part.cx, part.cy, part.r * 2);
      } else if (part.type === "line") {
        line(part.x1, part.y1, part.x2, part.y2);
      }
    }
  }
  
  //Display game over message
  function gameOver(won) {
    textSize(32);
    fill(won ? 'green' : 'red');
    text(won ? "You Win!" : `Game Over! The word was "${word.join('')}"`, width / 2, height / 2);
    textSize(16);
    text("Press ENTER to play again", width / 2, height / 2 + 40);
    noLoop(); //Stop draw loop
  }



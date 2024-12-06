/**
 * Hangman
 * Nat Nina
 * 
 * WARNING: Flashing lights
 * 
 * A simple hangman game.
 * Guess the word!
 * 
 * Controls:
 * - Type the word
 * - Press enter to start next game
 * 
 * Uses:
 * p5.js
 */


"use strict";

/**
 * Array of phrases that flash randomly
 */
let randomPhrases = [
  "YOU DESERVE IT",
  "ARE YOU SURE ABOUT THIS?",
  "DO YOU FEEL GUILTY?",
  "YOU CAN'T WIN",
  "THIS ISN'T FAIR"
];


/**
 * Arrays for words appearing at different game states
 */
let words = ["cat", "truth", "once", "memory", "justice", "silence"];
let inmates = ["cameron", "earl", "jesse", "anthony", "kirk"];

// Array for inmate stories that display after games
let inmateStories = [
   "Cameron Willingham was executed in 2004 for arson that killed his children. Fire experts later proved the investigation used outdated methods and the fire was likely accidental.", 
   "Earl Washington Jr., an intelectually disabled man, gave a false confession in 1984. This led to his death row sentence, and he spent 17 years in prison, before being exonerated. He once came within nine days of execution.",
   "Jesse Tafero was executed for murder in 1990 despite evidence suggesting he was innocent. His execution by electric chair was botched, leading to a very painful death. The key witness, Walter Rhodes, later confessed to committing the crime. His co-defendant, Sunny Jacobs, was eventually exonerated.",
   "Anthony Porter came within 50 hours of execution before exoneration in 1999 after 16 years. His case helped suspend Illinois executions",
   "Kirk Bloodsworth was the first death row inmate to be exonerated by DNA in 1993 after 8 years imprisoned. The real killer was found in 2003."
];

//Game variables
let secretWord = Array(6).fill('_'); //Last secret word
let showGuiltyLetters = false; //When to show the secret letters
let word; //Word in the list
let guessedWord; // Tracks the progress of the user
let currentWordIndex = 0; // Tracks the index of the current word
let guessedLetters = []; // Letters already tried
let wrongGuesses = 0; // Incorrect guesses
let games = 0; // Total games played
let gamesWon = 0; // Total games won
let gameEnded = false; // Track if the game has already ended
let state = "niceHangman"; // Starts with nice hangman game
const maxGuesses = 10; // How many chances do you get at guessing the word?
let finalStateLosses = 0; // How many lost games at final state

// Handle random flashing phrase
let currentPhrase = ""; // The phrase currently being displayed
let showRandomText = false; // Do not show the text
let randomTextTimer = 0; // Timer for how long to display the text

/**
 * Array storing hangman parts
 */
let hangmanParts = [
    {type: "line", x1: 200, y1: 400, x2: 400, y2: 400}, // Base
    {type: "line", x1: 300, y1: 400, x2: 300, y2: 200}, // Pole
    {type: "line", x1: 300, y1: 200, x2: 400, y2: 200}, // Top beam
    {type: "line", x1: 400, y1: 200, x2: 400, y2: 230}, // Rope
    {type: "circle", cx: 400, cy: 250, r: 20},         // Head
    {type: "line", x1: 400, y1: 270, x2: 400, y2: 330}, // Body
    {type: "line", x1: 400, y1: 290, x2: 380, y2: 310}, // Left arm
    {type: "line", x1: 400, y1: 290, x2: 420, y2: 310}, // Right arm
    {type: "line", x1: 400, y1: 330, x2: 380, y2: 360}, // Left leg
    {type: "line", x1: 400, y1: 330, x2: 420, y2: 360}  // Right leg
];

/**
 * Setup
 */
function setup() {
    createCanvas(600, 600);
    textAlign(CENTER, CENTER);
    startNewGame(); // New game at start
}

/**
 * Draw
 */
function draw() {
    background(240);
    fill('black');
    // If game ended, only draw the game over screen
    if (gameEnded) {
        drawGameOver();
        return;  // Exit draw() here if game is over
    }

    // Draw secret word in middle when letters are guessed
    if (state === "finalHangman" && showGuiltyLetters) {
        textSize(72);
        fill('red');
        text(secretWord.join(" "), width / 2, height / 2);
        fill('black');
    }

    // Draw normal guessed word
    textSize(32);
    text(guessedWord.join(" "), width / 2, height / 2 - 200);

    // Draw guessed letters
    textSize(16);
    text(`Guessed letters: ${guessedLetters.join(', ')}`, width / 2, height - 40);
    text(`Attempts left: ${maxGuesses - wrongGuesses}`, width / 2, height - 20);

    // Draw hangman parts
    drawHangman();
 
    // Check win/loss conditions
    checkGameStatus();
    
    // Handle random phrase display
    if (!gameEnded) {
        handleRandomPhrases();
    }
}


/**
 * Handles game over screen display
 */
function drawGameOver() {
    // Draw game over message
    fill(255);
    rectMode(CENTER);
    rect(width / 2, height / 2, 570, 300); // Rectangle containing text
    textSize(32);
    textAlign(CENTER);

    // Game over message


    if (state === "finalHangman") { //Final state
        if (!secretWord.includes('_')) {
            fill('green');
            text("You are guilty. Try again.", width / 2, height / 2);
        } else {
            fill('red');
            text("Game Over! You are not 'INNOCENT!'", width / 2, height / 2);

        }
    } else if (state === "inmateHangman"){
        // Regular win/loss messages for non-final state
        if (!guessedWord.includes('_')) {
            fill('green');
            text("You Win!", width / 2, height / 3);
        } else {
            fill('red');
            text(`Game Over! His name is "${word.join('')}"`, width / 2, height / 3);
        }

    textSize(16);
    let currentInmate = inmates[currentWordIndex];
    let storyIndex = (currentWordIndex - 1 + inmates.length) % inmates.length;
    text(inmateStories[storyIndex], width / 2, height / 2, 550, 280);
    } else {
        // Regular win/loss messages for non-final state
        if (!guessedWord.includes('_')) {
            fill('green');
            text("You Win!", width / 2, height / 2);
        } else {
            fill('red');
            text(`Game Over! The word was "${word.join('')}"`, width / 2, height / 2);
        }
    }
    textSize(16);
    text("Press ENTER to play again", width / 2, height / 2 + 60);
}

/**
 * Resets the game state and starts a new game
 * Handles progression through different game states based on wins
 */
function startNewGame() {
    gameEnded = false; // Reset gameEnded to allow starting a new game
    secretWord = Array(6).fill('_');
    showGuiltyLetters = false;

    console.log(`Games Won: ${gamesWon}, Current State: ${state}`);
    //Final hangman when 11 games won
    if (gamesWon >= 11) {
        state = "finalHangman";
        word = "innoc nt".split(''); // Show this word
        guessedWord = Array(word.length).fill('_'); // Array with underscores for "guilty" letters
    //Nice hangman to inmate hangman after 6 games won
    } else if (gamesWon >= 6 && state === "niceHangman") {
        state = "inmateHangman";
        currentWordIndex = 0;
    }
    
    //For regular and inmate states
    if (state !== "finalHangman") {
        let wordList = state === "niceHangman" ? words : inmates; // Assigns an array for both states
        word = wordList[currentWordIndex].split(''); //Split words into letters
        currentWordIndex = (currentWordIndex + 1) % wordList.length; // Cycles through the word array
        guessedWord = Array(word.length).fill('_'); // Array of underscores for each word
    }

    //Store guesses and games
    guessedLetters = [];
    wrongGuesses = 0;
    games++;
}

/**
 * Keyboard input
 */
function keyPressed() {
    if (keyCode === ENTER) {
        startNewGame();  // Restart game on ENTER
        return;
    }

    let letter = key.toLowerCase(); // Pressed key becomes lowercase

    // Letter checks
    if (letter >= 'a' && letter <= 'z' && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter); // Add to guessed letters

        if (state === "finalHangman") {
            // Special events for "finalHangman" state
            checkGuessFinalHangman(letter);
        } else {
            checkGuess(letter);
        }
    }
}

/**
 * Check if guessed letter is part of the word
 */
function checkGuess(letter) {
    let correct = false;

    // Check if the letter is part of the current word
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            guessedWord[i] = letter; // Update guessed word
            correct = true;
        }
    }

    // Only increment wrong guesses once if the letter is wrong
    if (!correct) {
        wrongGuesses++;
    }
}

/**
 * Special guess checking for final hangman state
 * Innocent/guilty word mechanics
 */
function checkGuessFinalHangman(letter) {
    let correct = false;

    // Check for letters in "innoc nt"
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            guessedWord[i] = letter;
            correct = true;
        }
    }

    // Enable showing guilty letters if user lost once
    if (!guessedWord.includes('_') || finalStateLosses > 0) {
        showGuiltyLetters = true;
    }

    // Only allow guilty letters to be guessed if showGuiltyLetters is true
    if (showGuiltyLetters && "guilty".includes(letter)) {
        for (let i = 0; i < "guilty".length; i++) {
            if ("guilty"[i] === letter) {
                secretWord[i] = letter;
                correct = true;
            }
        }
    }

    // Wrong guess increments if guess is not correct
    if (!correct) {
        wrongGuesses++;
    }
}

/**
 * Draws the hangman figure with wrong guesses
 */
function drawHangman() {
    let partIndex = wrongGuesses;
    for (let i = 0; i < partIndex; i++) {
        let part = hangmanParts[i];
        if (part.type === "line") {
            line(part.x1, part.y1, part.x2, part.y2);
        } else if (part.type === "circle") {
            ellipse(part.cx, part.cy, part.r * 2, part.r * 2);
        }
    }
}

/**
 * Display of random phrases
 */
function handleRandomPhrases() {
    if (state === "inmateHangman" || state === "finalHangman") {
        // Dynamic probability based on game progress
        let dynamicChance = 0.001 + (gamesWon * 0.00005) + (wrongGuesses * 0.0005);

        // Random text events
        if (!showRandomText && random(1) < dynamicChance) {
            showRandomText = true; // Display
            randomTextTimer = 120; // Show for 120 frames 
            currentPhrase = random(randomPhrases); // Pick a random phrase
        }

        // Random phrase display
        if (showRandomText) {
            textSize(36);
            if(frameCount % 30 == 0) { //Flashing effect
                background("black");
                fill(random(255), random(255), random(255));
            } else if (frameCount % 2 == 0) {
                background(240);
                fill('red');
            }
            text(currentPhrase, width / 2, height / 2 + 100);
            fill('black');

            randomTextTimer--;
            if (randomTextTimer <= 0) {
                showRandomText = false;
            }
        }
    }
    else if (state === "niceHangman" && currentWordIndex >= 5) {
        if (!showRandomText) {  
            randomTextTimer = 60;
            showRandomText = true;
        }
        
        if (randomTextTimer > 0) { 
            if (frameCount % 30 == 0) { 
                background("black");
            } else if (frameCount % 2 == 0) { 
                background(240);
            }
            randomTextTimer--; 
        }
    }
}

/**
 * Checks current game status for win/loss 
 */
function checkGameStatus() {
    if (wrongGuesses >= maxGuesses && !gameEnded) {
        gameEnded = true;
        if (state === "finalHangman") {
            finalStateLosses++;
            showGuiltyLetters = true;
        }
    } else if (state === "finalHangman" && !secretWord.includes('_') && !gameEnded) {
        gameEnded = true;
        gamesWon++;
    } else if (!guessedWord.includes('_') && state !== "finalHangman" && !gameEnded) {
        gameEnded = true;
        gamesWon++;
    }
}

/**
 * Death of The Sun
 * Nat Nina
 * 
 * Nat's art jam assignment!
 * 
 */

"use strict";
//radiohead song
let song;
function preload() {
    song = loadSound('assets/sounds/Fitter Happier.mp3');
}

// a bunch of words
let words = ['believe', 'hoax', 'fear-mongering', 'myth', 'skepticism', 'manipulation', 'funding',
    'not an emergency', 'censorship', 'indoctrination', 'narrative', 'truth', 'unproven', 'freedom', 'exaggeration', 'alarmism',
    'panic', 'agenda', 'control', 'scam', 'bureaucracy', 'unproven', 'funding',
    'fact', 'evidence', 'skeptic', 'hysteria', 'media', 'perspective', 'globalization', 'overreaction', 
    'flawed', 'independence', 'unreliable', 'distortion', 'liberal', 'conspiracy', 'driven', 'regulations', 'excessive',
    'denier', 'influence', 'misrepresentation', 'everyone', 'Using', 'the', 'metaphor',
    'trends', 'tax', 'jobs', 'data', 'fear', 'solutions', 'resources', 'economy', 'cycles',
    'consequences', 'activism', "outcomes", 'consensus', 'freedom', 'liberty', 'taxes',
    'policy', 'fear', 'predictions', 'coercion', 'dystopia', 'dogma', 'intervention', 'hegemony', 'lobbying',
    'anthropogenic', 'global', 'believe', 'problem', 'scientists', 'paradigm shift', 'rhetoric', 'uncertainty', 'compliance',
    'nonpartisan', 'posturing', 'engagement', 'efficacy', 'viability'];
    
//store words shown on canvas
let theWord = "";

/**
 * Setup contains canvas and the text alignment
*/
function setup() {
createCanvas(500,500)
textAlign(CENTER);
song = loadSound ('assets/sounds/Fitter Happier.mp3')
}

//draw function
function draw () {
    //change the entire canvas to black if mouseX is at the far right end
    if (mouseX >= 500) {
        background (0); // black background
        return; //stop drawing other shapes
    } else  {
        background (135, 206, 235); // regular background
    }

    //custom variable for sun color
    let sunRed = map(mouseX, 0, 500, 255, 255); //mouse changes color of sun on x-axis
    let sunGreen = map(mouseX, 0, 500, 255, 0); //green goes to 0 to make red
    //sun object
  let Sun = {
    x: 400,
    y: 125,
    size: 100 + mouseX * 2, //mouse x-axis makes sun bigger
    fill: {
      r: sunRed,
      g: sunGreen,
      b: 0
    },
    //code from mr furious, mouse on y axis makes the sun shake
    death:mouseY / 5
    };
    //shaking
    Sun.death = constrain(Sun.death, 0, 15); // constrain amount of shaking
    const x = Sun.x + random(-Sun.death,Sun.death); //random movement on x
    const y = Sun.y + random(-Sun.death,Sun.death); //random movement on y
    //size constrain
    Sun.size = constrain (Sun.size, 100, 950);

     //draws sun
     fill(Sun.fill.r, Sun.fill.g, Sun.fill.b);
     noStroke();
     circle(x, y, Sun.size);
//draws grassy meadow
push ()
fill(175, 225, 175);
noStroke();
ellipse(250, 450, 800, 250);
pop ()

//draws cloud one
push () 
fill(255, 255, 255);
noStroke();
ellipse(mouseX, 100, 400, 100);

fill(255, 255, 255);
noStroke();
ellipse(mouseX, 40, 200, 100);
pop()

//draws cloud two
push()
fill(255, 255, 255);
noStroke();
ellipse(mouseX + 200, 190, 150, 20);
pop()

//draws cloud three
push()
fill(255, 255, 255);
noStroke();
ellipse(mouseX - 40, 250, 100, 20);


fill(255, 255, 255);
noStroke();
ellipse(mouseX - 40, 240, 80, 25);
pop()

//random words at the bottom center of the canvas
if(frameCount % 60 == 0){
    theWord = random(words); 
}
//word formatting
fill(0); //black tecxt
textSize(24); //size 24 text
text(theWord, width / 2, height - 30); //words show up at the middle in the bottom
}

//code taken from p5 sketch, it plays/stops the song when the mouse is pressed
function mousePressed() {
    if (song.isPlaying()) {
      song.stop();
    } else {
      song.play();
    }
}
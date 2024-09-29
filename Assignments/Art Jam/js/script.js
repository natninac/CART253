/**
 * Death of The Sun
 * Nat Nina
 * 
 * Nat's art jam assignment.
 * 
 */

"use strict";
// a bunch of words
let words = ['believe', 'hoax', 'fear-mongering', 'myth', 'skepticism', 'manipulation', 'funding',
    'not an emergency', 'censorship', 'indoctrination', 'narrative', 'truth', 'unproven', 'freedom', 'exaggeration', 'alarmism',
    'panic', 'agenda', 'control', 'scam', 'bureaucracy', 'unproven', 'funding',
    'fact', 'evidence', 'skeptic', 'hysteria', 'media', 'perspective', 'globalization', 'overreaction', 
    'flawed', 'independence', 'unreliablie', 'distortion', 'liberal', 'conspiracy', 'driven', 'regulations', 'excessive',
    'deniers', 'influence', 'misprepresentation', 'to', 'everyone', 'Using', 'the', 'metaphor',
    'trends', 'a', 'tax', 'jobs', 'data', 'fear', 'solutions', 'resources', 'economy', 'cycles',
    'consequences', 'activism', "outcomes", 'consensus', 'freedom', 'liberty', 'taxes',
    'policy', 'fear', 'predictions', 'coercion', 'dystopia', 'dogma', 'intervention', 'hegemony', 'lobbying',
    'anthropogenic', 'global', 'believe', 'problem', 'scientists', 'paradigm shift', 'retoric', 'uncertainty', 'compliance',
    'nonpartisan', 'posturing', 'engagement', 'efficacy', 'viability'];
    
//store word shown on canvas
let theWord = "";

/**
 * Setup contains canvas and the text alignment
*/
function setup() {
createCanvas(500,500)
textAlign(CENTER);
}

//draw function
function draw () {
    //change the entire canvas to black if mouseX is at the far right end
    if (mouseX >= 500) {
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
    Sun.size = constrain (Sun.size, 100, 950);

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

//random words at the bottom center of the canvas
if(frameCount % 60 == 0){
    theWord = random(words); 
}

fill(0); 
textSize(24);
text(theWord, width / 2, height - 30);
}

// free sounds https://pixabay.com/sound-effects/search/8-bit/?pagi=4
//https://editor.p5js.org/tstannard64/sketches/w2HqCzKVr https://editor.p5js.org/tstannard64/sketches/57ki_TE28
//https://editor.p5js.org/davidbouchard/sketches/5PQSc_RXf
//https://editor.p5js.org/davidbouchard/sketches/aBMzUPDmF for p5js collisions and health
//https://editor.p5js.org/GDD140-M_C_Merritt/sketches/Dp0wTkP3p

let state = "game1"; //intro, level select, game1, game2, question1, gameover

//enemies

let goblins = [];
let goblinAni;
let newGoblinCounter = 0;

let slimes;
let slimeani;

//game1 variables
let player;
let bullets = [];
let playerAni;

let playerIdle = [];
let playerMove = [];
let moveAni, idleAni;
let timer = 30;
let highScore = 0;
let lastshotpos;
var score = 0;

//game2/killgame variables
let bubbles = [];
let bubbleCount;
let startTime;
let finalTime = 0;
let gameOver = false;
let completionMessage = "Well done! You popped all the bubbles!";
let gameState;
var timescore = 0;

//backgrounds, font, music, etc
let isPlaying = false;
let titlebg;
let titlebgm;
let myfont;
let goodsound;
let levelselectbg;
let sparkle;
let floorbg;
let levelstartbgm;
let shootbgm;
let shootsound;
let questionbgm;
let treasuresound;
let gameoverbg;
let victorybg;

//borders to keep sprites in frame
let floor;
let wall1;
let wall2;
let ceiling;

////////////////////////////////////////////////////////////////////////////

function preload() {
  titlebg = loadImage("assets/backgrounds/titlescreen.gif");
  treasuresound = loadSound("assets/music/treasure.wav");
  victorybg = loadImage("assets/backgrounds/dragon.gif");
  sparkle = loadImage("assets/images/navy.gif");
  myfont = loadFont("assets/DungeonFont.ttf");
  titlebgm = loadSound("assets/music/titlebgm.wav");
  goodsound = loadSound("assets/music/goodsound.wav");
  levelselectbg = loadImage("assets/backgrounds/levelselect.gif");
  floorbg = loadImage("assets/backgrounds/tile.PNG");
  levelstartbgm = loadSound("assets/music/levelstart.wav");
  shootsound = loadSound("assets/music/shootsound.mp3");
  shootbgm = loadSound("assets/music/shootbg.wav");
  gobsbg = loadImage("assets/backgrounds/gobs.gif");
  questionbgm = loadSound("assets/music/bitty-boss-54953.mp3");
  gameoverbg = loadImage("assets/backgrounds/end.gif");
  victorysound = loadSound("assets/music/victory.wav");
  arrowimg = loadImage("assets/images/Arrow.png");
  failuresound = loadSound("assets/music/failure.wav");
  healthhud = loadImage("assets/images/health_ui.png");

  slimes = loadAnimation(
    "assets/enemies/slime_run_anim_f0.png",
    "assets/enemies/slime_run_anim_f1.png",
    "assets/enemies/slime_run_anim_f2.png",
    "assets/enemies/slime_run_anim_f3.png",
    "assets/enemies/slime_run_anim_f4.png",
    "assets/enemies/slime_run_anim_f4.png"
  );

  slimes.w = 10;
  slimes.h = 15;
  slimes.rotationLock = true;

  

  goblinAni = loadAnimation(
    "assets/enemies/goblin_run_anim_f0.png",
    "assets/enemies/goblin_run_anim_f1.png",
    "assets/enemies/goblin_run_anim_f2.png",
    "assets/enemies/goblin_run_anim_f3.png",
    "assets/enemies/goblin_run_anim_f4.png",
    "assets/enemies/goblin_run_anim_f5.png"
  );

  player = new Sprite(400, 400, 10);
  player.health = 10;
  player.w = 15;
  player.h = 15;
  player.scale = 3;
  //player.rotationLock = true

  bullets = new Group();
  bullets.x = () => player.x;
  bullets.y = () => player.y;
  bullets.image = arrowimg;
  bullets.rotation = () => player.rotation - 30;
  bullets.speed = 0.01;
  bullets.life = 200;
  bullets.w = 20;
  bullets.h = 5;
  //bullets.rotationLock = true;
  bullets.overlaps(player);
  bullets.collider = "kinematic";
  bullets.scale = 2;

  goblins = new Group();
  goblins.addAni(goblinAni);
  goblins.w = 10;
  goblins.h = 10;
  goblins.x = () => random(width);
  goblins.y = () => random(height);
  goblins.diameter = goblinAni.width * 0.5;
  goblins.direction = () => player.x;
  goblins.speed = () => random(2, 4);
  goblins.health = 5;
  //goblins.overlaps(goblins); // turns off collision between goblins, optional
  goblins.collides(bullets, goblinHit);
  goblins.collides(player, playerHit);
  // testing
  // goblins.amount = 10;
  goblins.scale = 3;

  player.addAni(
    "idle",
    "assets/player/Hobbit - Idle0.png",
    "assets/player/Hobbit - Idle1.png",
    "assets/player/Hobbit - Idle2.png",
    "assets/player/Hobbit - Idle3.png"
  );

  player.addAni(
    "move",
    "assets/player/Hobbit - run1.png",
    "assets/player/Hobbit - run2.png",
    "assets/player/Hobbit - run3.png",
    "assets/player/Hobbit - run4.png",
    "assets/player/Hobbit - run5.png",
    "assets/player/Hobbit - run6.png",
    "assets/player/Hobbit - run7.png",
    "assets/player/Hobbit - run8.png",
    "assets/player/Hobbit - run9.png",
    "assets/player/Hobbit - run10.png"
  );

  player.addAni(
    "attack",
    "assets/player/Hobbit - attack1.png",
    "assets/player/Hobbit - attack2.png",
    "assets/player/Hobbit - attack3.png",
    "assets/player/Hobbit - attack4.png",
    "assets/player/Hobbit - attack5.png",
    "assets/player/Hobbit - attack6.png",
    "assets/player/Hobbit - attack7.png",
    "assets/player/Hobbit - attack8.png",
    "assets/player/Hobbit - attack9.png",
    "assets/player/Hobbit - attack10.png",
    "assets/player/Hobbit - attack11.png",
    "assets/player/Hobbit - attack12.png",
    "assets/player/Hobbit - attack13.png",
    "assets/player/Hobbit - attack14.png",
    "assets/player/Hobbit - attack15.png",
    "assets/player/Hobbit - attack16.png",
    "assets/player/Hobbit - attack17.png"
  );

  player.addAni(
    "hit",
    "assets/player/Hobbit - hit1.png",
    "assets/player/Hobbit - hit2.png",
    "assets/player/Hobbit - hit3.png",
    "assets/player/Hobbit - hit4.png"
  );
  
  ceiling = new Sprite(width, 5, 1600, 15, STA);
  ceiling.color = "black";
  ceiling.stroke = 0;

  floor = new Sprite(width, 795, 1600, 15, STA);
  floor.color = "black";
  floor.stroke = 0;

  wall1 = new Sprite(0, height, 15, 1600, STA);
  wall1.color = "black";
  wall1.stroke = 0;
  wall2 = new Sprite(795, height, 15, 1600, STA);
  wall2.color = "black";
  wall2.stroke = 0;
  
}

////////////////////////////////////////////////////////////////////////////

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("gameCanvas"); // div id from HTML
  
  outputVolume(0.2);
  //allSprites.debug = true;
  
  
}

////////////////////////////////////////////////////////////////////////////
//try setting a call for resets in draw functions??
function draw() {
  if (state == "title") {
    title();
  } else if (state == "levelselect") {
    levelselect();
  } else if (state == "game1") {
    game1();
  } else if (state == "game2") {
    game2();
  } else if (state == "question1") {
    question1();
  } else if (state == "gameover") {
    gameover();
  } else if (state == "victory") {
    victory();
  }
}

////////////////////////////////////////////////////////////////////////

function title() {
  background(titlebg);
  if (!titlebgm.isPlaying()) {
    titlebgm.play();
  }
  questionbgm.stop();
  shootbgm.stop();
  allSprites.visible = false;

  textFont(myfont);
  textSize(120);
  fill(205);
  stroke(255, 223, 0);
  strokeWeight(1);
  text("Dunces \n& Dragons", width / 2 - 180, height / 2 - 40);

  //fill(124, 166, 177),
  //rect(300,570, 230, 45 )
  fill(255);
  textSize(55);
  text("Press Start", 300, 620);

  if (mouse.presses()) {
    cursor("assets/images/Hit.png");
  } else {
    cursor("assets/images/Interact.png");
  }

  if (
    mouseX >= 300 &&
    mouseX <= 530 &&
    mouseY >= 500 &&
    mouseY <= 600 &&
    mouseIsPressed == true
  ) {
    state = "levelselect";
    goodsound.play();
  }
}

////////////////////////////////////////////////////////////////////////

function levelselect() {
  /////\\\\\ map state \\\\\/////
  background(levelselectbg);
  shootbgm.stop();
  if (!titlebgm.isPlaying()) {
    titlebgm.play();
  }

  allSprites.visible = false;

  textFont(myfont);
  textSize(80);
  fill(205);
  text("dungeon floors", width / 2 - 190, height / 2 - 270);
  stroke(255, 223, 0);
  strokeWeight(1);
  //rect(70, 200, 100, 150, 10);
  image(sparkle, 30, 200);
  textSize(40);
  text("Stage One", 60, 180);

  image(sparkle, 400, 250);
  textSize(40);
  text("Stage Two", 400, 180);

  if (mouse.presses()) {
    cursor("assets/images/Hit.png");
  } else {
    cursor("assets/images/Interact.png");
  }

  if (
    state == "levelselect" &&
    mouseX >= 60 &&
    mouseX <= 220 &&
    mouseY >= 135 &&
    mouseY <= 285 &&
    mouse.presses()
  ) {
    state = "game1";
    goodsound.play();
    titlebgm.stop();
  }

  if (
    state == "levelselect" &&
    mouseX >= 400 &&
    mouseX <= 520 &&
    mouseY >= 250 &&
    mouseY <= 385 &&
    mouse.presses()
  ) {
    state = "game2";
    goodsound.play();
    titlebgm.stop();
    startTime = millis();
    bubbleCount = int(random(10, 50)); // Random count from 10 to 25

    for (let i = 0; i < bubbleCount; i++) {
      let x = random(width);
      let y = random(height);
      let r = random(20, 40);
      bubbles.push(new Bubble(x, y, r));
    }
  }
}

////////////////////////////////////////////////////////////////////////

function game1() {
  background(floorbg);
  if (!shootbgm.isPlaying()) {
    shootbgm.play();
  }
  titlebgm.stop();
  questionbgm.stop();
  GUI();

  image(healthhud, 20, 20, 200, 20);
  allSprites.visible = true;

  textFont(myfont);
  textSize(50);
  fill(255);
  stroke(255, 223, 0);
  strokeWeight(1);
  text(" Avoid the Goblins to survive", 150, 70);

  text(timer, 400, 180); //https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
  textSize(30);
  text("Score: " + score, 20, 150);
  if (frameCount % 60 == 0 && timer > 0) {
    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer--;
  }
  if (timer == 0 && state === "game1") {
    state = "question1";
  }

  if (mouse.presses()) {
    cursor("assets/images/crosshair_1.png");
    shootsound.play();

    bullets.amount++;
  } else {
    cursor("assets/images/crosshair_2.png");
  }

  // add gobs every 60 frame (1 second)
  newGoblinCounter++;
  if (newGoblinCounter > 30) {
    newGoblinCounter = 0;
    let newGob = new goblins.Sprite();
    // prevent new goblins from spawning on top of the player!
    while (dist(newGob.x, newGob.y, player.x, player.y) < 100) {
      newGob.remove();
      newGob = new goblins.Sprite();
    }
  }

  // goblins
  for (let g of goblins) {
    // face the correct way!
    if (g.vel.x > 0) g.scale.x = 3;
    if (g.vel.x < 0) g.scale.x = -3;
    g.moveTowards(player, 0.01);

    // wrap around the edges of the screen
    if (g.x < -100) g.x = width + 100;
    if (g.x > width + 100) g.x = -100;
    if (g.y < -100) g.y = height + 100;
    if (g.y > height + 100) g.y = -100;

    // random direction change
    if (random(1) < 0.01) {
      g.vel.x = random(-2, 2);
      g.vel.y = random(-2, 2);
    }

    for (let b of bullets) {
      b.velocity.x = (mouseX - player.x)*.05;
      b.velocity.y = (mouseY - player.y)*.05;
    } //need's work

    if (keyIsPressed === true && state === "game1") {
      if (kb.pressing("up")) {
        player.ani = "move";
        player.vel.x = 0;
        player.vel.y = -4;
      } else if (kb.pressing("right")) {
        player.ani = "move";
        player.vel.x = 4;
        player.vel.y = 0;
      } else if (kb.pressing("down")) {
        player.ani = "move";
        player.vel.x = 0;
        player.vel.y = 4;
      } else if (kb.pressing("left")) {
        player.ani = "move";
        player.vel.x = -4;
        player.vel.y = 0;
      }
    } else {
      player.ani = "idle";
      player.vel.x = 0;
      player.vel.y = 0;
    }

    if (mouseIsPressed === true && state === "game1") {
      player.changeAni("attack");
    }

    if (pmouseX > mouseX) player.scale.x = -3;
    if (pmouseX < mouseX) player.scale.x = 3;

    // draw the player's health bar
    let healthWidth = map(player.health, 0, 10, 0, 200);
    //add health hud later as an image overlapping this
    fill("red");
    rect(20, 20, healthWidth, 20);
    stroke("white");
    noFill();
    rect(20, 20, 200, 20);
    noStroke();
  }

  if (keyCode == ESCAPE && state == "game1") {
    state = "title";
    reset();
  }
}

class Bullet {
  constructor(tempX, tempY, tempSpeed) {
    this.x = tempX;
    this.y = tempY;
    this.r = 5;
    this.speed = tempSpeed;
  }

  show() {
    fill(200, 150, 0);
    ellipse(this.x, this.y, this.r * 2);
  }

  move() {
    this.y -= this.speed;
  }
}

function GUI() {
  fill(255);
  textSize(35);
  textAlign(LEFT);
  text(
    "wasd to Move press esc to return to menu",
    (width / 2) * 0.15,
    height - 40
  );
}

function goblinHit(goblin, bullet) {
  //add a sound
  goblin.health--; // take off one health

  let h = map(goblin.health, 0, 5, 0.2, 1);
  goblin.scale = h;

  if (goblin.health <= 0) goblin.remove();
goblin.remove(); score += 1;
  // if that was the last goblin, we win!
  if (goblins.length == 0) {
    state = "victory";

  
  }
}

////////////////////////////////////////////////////////////
function playerHit(goblin, player) {
  //add sound
  player.changeAni("hit");

  if (player.health > 0) player.health--;
  else state = "gameover";
  if (keyCode == ESCAPE) {
    state = "title";
    reset();
  }
}

////////////////////////////////////////////////////////////////////////

function game2() {
  background(floorbg);
  if (!shootbgm.isPlaying()) {
    shootbgm.play();
  }
  GUI();
  allSprites.visible = true;

  player.x = mouse.x;
  player.y = mouse.y;

  //player controls
  player.moveTowards(mouse, 1);
  // set the player orientation
  if (pmouseX > mouseX) player.scale.x = -3;
  if (pmouseX < mouseX) player.scale.x = 3;
  player.ani = "move";

  noCursor();
  // Show current time
  fill(255);
  textSize(40);
  stroke(2);
  text("Time: " + ((millis() - startTime) / 1000).toFixed(2) + "s", 60, 90);

  if (!gameOver) {
    // Draw custom cursor
    fill(255, 100, 100);
    noStroke();
    //ipse(mouseX, mouseY, 20);

    for (let i = bubbles.length - 1; i >= 0; i--) {
      let b = bubbles[i];
      b.show();
      b.move();

      if (b.rollover(mouseX, mouseY)) {
        bubbles.splice(i, 1);
      }
    }
    // Check if all bubbles are popped
    if (bubbles.length === 0) {
      finalTime = (millis() - startTime) / 1000;
      gameOver = true;
      victorysound.play();
    }
  } else {
    // Game over screen with message
    background(gameoverbg);

    textSize(60);
    text("All bubbles popped!", width / 2 - 100, height / 2 - 40);
    textSize(30);
    text(
      "Final Time: " + finalTime.toFixed(2) + " seconds",
      width / 2 - 100,
      height / 2 + 40
    );
    textSize(35);
    fill(255);
    stroke(2);
    text(
      "Try for a better timescore next time",
      width / 2 - 100,
      height / 2 + 70
    );
    text(" or press ESC to return to menu", width / 2 - 100, height / 2 + 100);
    //need to align text without it affecting the other functions or states

    if (mouse.presses()) {
      gameOver = false;
      state = "game2";
      goodsound.play();
      titlebgm.stop();
      startTime = millis();
      bubbleCount = int(random(10, 50)); // Random count from 10 to 25

      for (let i = 0; i < bubbleCount; i++) {
        let x = random(width);
        let y = random(height);
        let r = random(20, 40);
        bubbles.push(new Bubble(x, y, r));
      }
      reset();
      gameOver = false;
    }
  }

  if (keyCode == ESCAPE && state == "game2") {
    state = "title";
    reset();
  }
}

function reset() {
  timescore = 0;
  score = 0;
  gameOver = false;
  //clear();
  allSprites.visible = false;
  state = "title";
} //maybe remove?

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  rollover(px, py) {
   let d = dist(px, py, this.x, this.y);
   return d < this.r + 10;
  }

  move() {
   this.x = constrain(this.x + random(-2, 2), this.r, width - this.r);
   this.y = constrain(this.y + random(-2, 2), this.r, height - this.r);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(100, 150, 255, 150);
    animation(slimes, this.x, this.y, this.r * 2);
    slimes.scale = 2;
  }
}

////////////////////////////////////////////////////////////////////////

function question1() {
  background(gobsbg);
  shootbgm.stop();
  if (!questionbgm.isPlaying()) {
    questionbgm.play();
  }
  allSprites.visible = false;
  if (mouse.presses()) {
    cursor("assets/images/Hit.png");
    shootsound.play();
  } else {
    cursor("assets/images/Interact.png");
  }

  textFont(myfont);
  fill(255);
  stroke(255, 223, 0);
  strokeWeight(1);

  textSize(35);

  stroke(0);
  fill(234, 221, 202);
  strokeWeight(3);
  rectMode(CORNER);
  rect(30, 120, 730, 200, 7); //big question box
  rect(70, 340, 200, 100, 10); //wrong get game over
  rect(290, 340, 200, 100, 10); //right, go back to game
  rect(510, 340, 200, 100, 10); //wrong get game over

  //words for boxes
  text("you've been jumped! quick! answer their question", 60, 100);
  text(
    "Bwahaha we got you now! Unless you can guess our \n favorite meal? We might let you live...",
    60,
    210
  );
  textSize(45);
  text("dogs?", 120, 410); //wrong
  text("humans?", 310, 410); //right, go back to game
  text("snails?", 550, 410); //wrong

  if (
    state == "question1" &&
    mouseX >= 70 &&
    mouseX <= 270 &&
    mouseY >= 340 &&
    mouseY <= 440 &&
    mouseIsPressed
  ) {
    state = "gameover";
    failuresound.play();
    timer = 30;
  } else if (
    state == "question1" &&
    mouseX >= 290 &&
    mouseX <= 490 &&
    mouseY >= 340 &&
    mouseY <= 440 &&
    mouseIsPressed
  ) {
    state = "game1";
    treasuresound.play();
    timer = 30;
  } else if (
    state == "question1" &&
    mouseX >= 510 &&
    mouseX <= 710 &&
    mouseY >= 200 &&
    mouseY <= 440 &&
    mouseIsPressed
  ) {
    state = "gameover";
    failuresound.play();
    timer = 30;
  }
}
////////////////////////////////////////////////////////////////////////

function gameover() {
  background(gameoverbg);
  if (!titlebgm.isPlaying()) {
    titlebgm.play();
  }
  shootbgm.stop();
  allSprites.visible = false;
  questionbgm.stop();
  if (mouse.presses()) {
    cursor("assets/images/Hit.png");
    shootsound.play();
  } else {
    cursor("assets/images/Interact.png");
  }

  textFont(myfont);
  textSize(80);
  fill(255);
  stroke(255, 223, 0);
  strokeWeight(1);
  text("GAME OVER!!!", 200, height / 2 - 100);

  textSize(72);

  textSize(40);

  text("Click to try again", 300, height / 2);

  if (state == "gameover" && mouse.presses()) {
    state = "title";
    goodsound.play();
    player.health = 10;
    goblins.removeAll();
    goblins.amount = 0;
    reset();
  }
}
////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
function victory() {
  background(victorybg);
  allSprites.visible = false;
  if (!titlebgm.isPlaying()) {
    titlebgm.play();
  }
  shootbgm.stop();

  textAlign(CENTER);
  textSize(40);
  stroke("black");
  fill("white");
  text(" Good job! But more adventures await...", width / 2, height / 2 - 50);
  text("Press 'esc' to try again!", width / 2, height / 2 + 50);
  
  if (state == "victory" && mouse.presses()) {
    state = "title";
    goodsound.play();
    player.health = 10;
    goblins.removeAll();
    goblins.amount = 0;
  }

}

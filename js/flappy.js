// the Game object used by the phaser.io library
//--------------------------------------------------------------------------------------------------------------------
var stateActions = { preload: preload, create: create, update: update };// Phaser parameters:game width,game height, renderer (go for Phaser.AUTO),element where the game will be drawn ('game'),actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400 , Phaser.AUTO, 'game', stateActions); // creates the size of the game screen and makes sure that the game is a game
var player; // defines the player as a thing that can change (move and stuff) throughout the game
var pipes = []; //pipes creates an array of all the pipes that have been placed so ou can check for overlaps later with the players item
var score; // means that score can be changed throughout the game
  score = 0; // initialises score
var labelScore; // means the thing that displays score can change through the game, we define
var balloons = [];
var weight = [];
var width = 790;
var height = 400;

//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
function preload() { // initialises the game, only called once

game.load.image("falling", "../assets/flappy.png"); //loads the frog as our image and saves it as playerImg

game.load.image("jumping", "../assets/IMG_1260.png");

game.load.image("background", "../assets/newbackground.png" ); //we have the backgroud
game.load.audio("frog", "../assets/point1.ogg"); // the click noise
game.load.image("block", "../assets/pipebrownactual.png");
game.load.image("balloons", "../assets/balloons.png");
game.load.image("weight", "../assets/weight.png");
}
//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
function create() { //creates the layout of the screen so that things are displayed

game.add.image(0,-80, "background" ); // adds background and initialises position of background
game.add.text(690,25, "Score:", {font: "16px Times", fill: "#D16C06"}); //adds text and position and font and colour
labelScore = game.add.text(740, 25, score, {font: "28px Times", fill:"#D16C06"}); // displays the score a specific place with colour and font

player = game.add.sprite(350,40, "falling"); // says that the frog is the player an da sprite so does stuff in game



game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump); //spacebar means that you jump
game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);
game.physics.startSystem(Phaser.Physics.ARCADE); // enable items to move in the game, with physics
game.physics.arcade.enable(player); // enable the player physics
player.body.velocity.y = 200; // inital speed for y
player.body.gravity.y = 300; // gravity for y (goes down)

var pipeInterval = 1.83 * Phaser.Timer.SECOND;// change how often pipes appear adn loops that
game.time.events.loop(
  pipeInterval,
  generate);
}
// -------------------------------------------------------------------------------------------------------------------
function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}
//--------------------------------------------------------------------------------------------------------------------
function changeScore() { //changes the score each time you go past a pipe
  score = score + 1; // adds 1 to the score each time
  labelScore.setText(score.toString()); // changes the numbrer of the score to text so you can print in
}
//--------------------------------------------------------------------------------------------------------------------
function generateBalloons(){
    var bonus = game.add.sprite(width, height, "balloons");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}
//--------------------------------------------------------------------------------------------------------------------
function generateWeight(){
    var bonus = game.add.sprite(width, height, "weight");
    weight.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);

    var arr = ["zero", "one", "two", "three", "four"];
    for(var i = 0; i < arr.length; i++){
        console.log(arr + " " + i + "th is " + arr[i]);
        arr.splice(i, 1);
    }
     //["zero", "one", "two", "three", "four"] 0th is "zero"
    // ["one", "two", "three", "four"] 1th is "two"
    // ["one", "three", "four"] 2th is "four"
}
//--------------------------------------------------------------------------------------------------------------------
function Generatepipe(){
  var gap = game.rnd.integerInRange(1,5); // generate a random number so that different pipes are missing each time
  for(var count = 0 ; count < 8; count = count + 1){ // only prints pipes in the screen, not further
    if(count != gap && count != gap + 1){ // if the gap and the gap + 1 count, then make thpse pipes disappear
      addPipeBlock(750,count * 50); // call this function with these coordinates, generate a new pipe at the end of the board each time
    }
  }
  changeScore();
}// each time a pipe is generated an old pipes goes off screen so score is increased
//--------------------------------------------------------------------------------------------------------------------
function generatePipe() {
    var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart - pipeEndHeight);
    for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
        addPipeBlock(width, y - blockHeight);
    }

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
    for(var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }

    changeScore();
}
//--------------------------------------------------------------------------------------------------------------------
function addPipeBlock(x,y) {
  var block = game.add.sprite(x, y, "block"); //make it so block can be changed throughout the game, sprite so add the block item, is ca
  pipes.push(block); //forcably inserts the block this way
  game.physics.arcade.enable(block); //enable game physics for blocks
  block.body.velocity.x = -200; //so that the block moves to the left each time
}
//--------------------------------------------------------------------------------------------------------------------
function generate() {
    var diceRoll = game.rnd.integerInRange(1, 6);
    if(diceRoll==1) {
        generateBalloons();
    } else if(diceRoll==2) {
        generateWeight();
    } else {
        Generatepipe();
    }
}
//--------------------------------------------------------------------------------------------------------------------
var arr = ["zero", "one", "two", "three", "four"];
console.log(arr[3]); // arr[3] is "three"
arr.splice(2, 1); // remove 1 element starting at index 2
console.log(arr[3]); // arr[3] is "four"
console.log(arr[2]); // arr[2] is "three"
console.log(arr); // arr is ["zero", "one", "three", "four"];

//--------------------------------------------------------------------------------------------------------------------
var arr = ["zero", "one", "two", "three", "four"];
for(var i = 0; i < arr.length; i++){
    console.log(arr + " " + i + "th is " + arr[i]);
    arr.splice(i, 1);
}
// ["zero", "one", "two", "three", "four"] 0th is "zero"
// ["one", "two", "three", "four"] 1th is "two"
// ["one", "three", "four"] 2th is "four"
//--------------------------------------------------------------------------------------------------------------------
function playerJump() {
  player.body.velocity.y = -200;
}
//--------------------------------------------------------------------------------------------------------------------
// function changeplayer(){
// if (player.body.velocity.y < 0){
//   player.destroy();
//   player = game.add.sprite(player.body.x, player.body.y, "jumping");}
//   else{
//     player.destroy();
//     player = game.add.sprite(player.body.x, player.body.y, "falling");}
//   }
//--------------------------------------------------------------------------------------------------------------------
function update(){ //
  game.physics.arcade.overlap(player,pipes,gameOver);
  //changeplayer();
}
//--------------------------------------------------------------------------------------------------------------------
function spaceHandler() {
    game.sound.play("score");
}
//--------------------------------------------------------------------------------------------------------------------
function gameOver(){ // game over restarts the game
  //location.reload(); //reloades the game
 registerScore(score);
game.state.restart();
gameGravity = 200;
}
//--------------------------------------------------------------------------------------------------------------------

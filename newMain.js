"use strict"
//creating a canvas
let canvas = document.querySelector('canvas');
let painter = canvas.getContext('2d');

//setting up sizes
//if the width of the window is above 700px then it will automatically be 700px
//else it's going to take the whole width of the canvas
if(window.innerWidth > 700){
    var width = canvas.width = 700;
} else{ var width = canvas.width = window.innerWidth; };
let height = canvas.height = window.innerHeight;

//https://gist.github.com/Xordal/9bf24bc6cbc5a39f62cd
//used this code to make the border
function invert(rgb) {
    rgb = [].slice.call(arguments).join(",").replace(/rgb\(|\)|rgba\(|\)|\s/gi, '').split(',');
    for (var i = 0; i < rgb.length; i++) rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
    return 'rgb('+rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

//function to generate a random number from x to y
function random(min, max){
    //flooring a number means making the number the next whole number that is above
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

//shape object and constructor made
class Shape{
    constructor(x, y, velX, velY, exists){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
}

//Ball is a shape and inherits the constructor from Shape
class Ball extends Shape{
    constructor(x, y, velX, valY, exists, color, size){
        //supering something means that it's using it's father's constructor
        super(x, y, velX, valY, exists);
        this.color = color;
        this.size = size;
        this.InvertedColor = invert(color);
    }
    //making a draw function that draws itself
    draw(){
        //draw itself
        painter.beginPath();
        painter.fillStyle = this.color;
        //making the object that is about to be painted
        painter.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        //filling said object with x color
        painter.fill();
        painter.strokeStyle = this.InvertedColor;
        //stroking only draws the borders of object x
        painter.stroke();
    }
    //update self code
    update(){
        //basically what all this does is checks if the circle has hit the borders of the canvas
        //and if so then it just reverses the x value and so it keeps the momentum and angle
        //if you make it something like `this.velX = -(this.velX - 0.1);` then it will resault in loss of momentum
        if((this.x + this.size) >= width) {
            this.velX = -(this.velX);
          }
        
          if((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
          }
        
          if((this.y + this.size) >= height) {
            this.velY = -(this.velY);
          }
        
          if((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
          }
        
          this.x += this.velX;
          this.y += this.velY;
        }
    //if something comes in contact with the ball and it still exists then it will change color 
    collisionDetect(){
        //selects the current ball and then gets all the values needed
        for(let CurrentBall of balls){
            if(!(this === CurrentBall)){
                //finds the "default" current value of the ball a.k.a position
                //then find the distance between all the other balls and itself
                let dx = this.x - CurrentBall.x;
                let dy = this.y - CurrentBall.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
            
                //if it comes in contact with another ball it will randomise it's own color again and again until it doesn't come in contact with it.
                if(distance < this.size + CurrentBall.size && CurrentBall.exists){
                    CurrentBall.color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
                }
            }
        }
    }
}

class Player{
    constructor(x , y, size, color, speed, life = 3){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.InvertedColor = invert(color);
        this.speed = speed;
        this.life = life;
        //movement indicators
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
    }
    draw(){
        //same as the Circle draw
        painter.beginPath();
        painter.lineWidth = 3;
        painter.fillStyle = this.color;
        painter.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        painter.fill();
        painter.strokeStyle = this.InvertedColor;
        painter.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        painter.stroke();
    }
    setControls(){
        let cthis = this;
        //detects if they key is pressed and if so makes a certain variable true
        window.onkeydown = function(e){
            switch(e.keyCode){
                case 65:
                    cthis.moveLeft = true;
                    break;
                case 68:
                    cthis.moveRight = true;
                    break;
                case 87:
                    cthis.moveUp = true;
                    break;
                case 83:
                    cthis.moveDown = true;
                    break;
            }
        }
        //detects if you let go of the key or not and if so sets that variable back to false 
        //basically if you let go the variable is false and you are no longer moving in said direction
        window.onkeyup = function(e){
            switch(e.keyCode){
                case 65:
                    cthis.moveLeft = false;
                    break;
                case 68:
                    cthis.moveRight = false;
                    break;
                case 87:
                    cthis.moveUp = false;
                    break;
                case 83:
                    cthis.moveDown = false;
                    break;
            }
        }

        //if x is true then you move on your x or y coord by x amount which is the player's speed value
        if(this.moveUp){this.y -= this.speed}
        if(this.moveDown){this.y += this.speed}
        if(this.moveLeft){this.x -= this.speed}
        if(this.moveRight){this.x += this.speed}
    }
    BorderCollision(){
        //if it comes in contact with the border then it should push itself out of it
        //basically adds their size values until they are no longer in the border
        if((this.x + this.size) >= width) {
            this.x -= this.size;
        }

        if((this.x - this.size) <= 0) {
            this.x += this.size;
        }

        if((this.y + this.size) >= height/ClosingZone) {
            this.y -= this.size;
        }

        if((this.y - this.size) <= 0) {
            this.y += this.size;
        }
    }
    CollisionWithOthers(){
        for(let currentBall of balls){
            //this is a very simple statement, if the ball that is flying around exists on screen then it should have a collision
            if(currentBall.exists){
                //finding coords of current ball reletive to the player circle
                //then if the value is smaller then the player circle's width then it counts as a collision
                //I feel like there is a way that is way simpler than this but I have no idea how to do so
                let dx = this.x - currentBall.x;
                let dy = this.y - currentBall.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < this.size + currentBall.size){
                    currentBall.exists = false;
                    this.life --;
                    document.getElementById("healthContainer").innerHTML = "lives left: " + this.life;
                }
            }
        }
    }
}

function DrawGameOver(){
    //drawing a simple rect across the canvas
    painter.rect(0, height/2-75, width, 150);
    //a is for the transparency of said color 1 being the most and 0 being the least
    painter.fillStyle = "rgba(0,0,0,0.75)"; 
    painter.fill();
    //sets the style of the font
    painter.font = "80px Arial";
    painter.fillStyle = "red";
    //creates and fills said text in x,y coord
    painter.fillText("You died!", width/2-160 , (height/2) + 25)
}

function DrawVictory(){
    //same as above
    painter.rect(0, height/2-75, width, 150);
    painter.fillStyle = "rgba(0,0,0,0.75)"; 
    painter.fill();
    painter.font = "80px Arial";
    painter.fillStyle = "yellow";
    painter.fillText("You Win!", width/2-160 , (height/2) + 25)
}

function ClearCanvas(){
    //clear rect clears everything in the canvas, makes it ready for drawing from scratch
    painter.clearRect(0,0,width,height);
}

function CreateNewBall(){
    //simple, random the coord, random the speed at which it's going on the x and y axis and size then push it into an array full of them
    let size = random(10,20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the adge of the canvas, to avoid drawing errors
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(1,7),
        random(1,7),
        true,
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    );
    balls.push(ball);
}

let Victory = false;
let ClosingZone = 1;
let timeToSpawn = 0;
let totalTime = 0;

let SecondPassed = function(){
    //called by a setInterval which calls something every x ms, 1000 ms in this case
    //time to spawn always gets reset when a new ball is placed
    timeToSpawn ++;
    //if the User is still alive then you should update the timer that is visable to the side
    if(User.life > 0){
        totalTime ++;
        document.getElementById("ScoreContainer").innerHTML = "Time survived: " + totalTime;
    }
}

setInterval(SecondPassed,1000);

let balls = [];

let User = new Player(
    random(0,width),
    random(0,height),
    5,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    4,
)

CreateNewBall();

function animation() {
    //all this does is it paints a layer of white on top of the canvas
    //created a very specific bug with my current code
    //because it paints a layer of white on top of everythinig that has the transparency of 0.25
    //so every 4th time this runs things will just dissapear but this also makes a really nice trail effect
    //balls have to be above a ceratin speed in order for this to work properly
    if(User.life > 0 && !Victory){
        if(height/ClosingZone <= 60){
            //if the line hits the 60px mark you win the game
            Victory = true;
        }
        painter.fillStyle = 'rgba(255,255,255,0.25)';
        painter.fillRect(0,0,width,height);
        
        //drawing the closing line that closes the player off
        //so he can hava a visual representation of where he can go or not
        painter.rect(0,height/ClosingZone,width,3);
        painter.fillStyle = 'red'
        painter.fill();
        
        if(timeToSpawn >= 3 ){
            //spawns a new ball every 3 seconds and makes the closed off zone larger
            timeToSpawn = 0;
            ClosingZone += 0.2;
            CreateNewBall();
        }
        //calling the function with each ball
        for(let currentBall of balls) {
            //if the current ball's veriable is exists then it should be drawn otherwise not
            if(currentBall.exists) {
            currentBall.draw();
            currentBall.update();
            currentBall.collisionDetect();
            }
        }
        //no need to do the same with the user as there is only one user
        User.draw();
        User.setControls();
        User.BorderCollision();
        User.CollisionWithOthers();
    }

    else{
        //clearing the canvas
        ClearCanvas();
        if(Victory){
            //drawing victory screen
            DrawVictory();
        }
        else{
            //drawing loss screen
            DrawGameOver();
        }
        window.onkeypress = function(e){
            //if the user is dead and you press R then you restart the game
            if(e.keyCode == 114 && User.life <= 0){
                //resets life back to default and starts the game again
                User.life = 3;
                //visable counter restet
                document.getElementById("healthContainer").innerHTML = "lives left: 3";
                
                //resetting victory state
                Victory = false;

                //resets time
                timeToSpawn = 0;
                totalTime = 0;

                //resets the visable counter
                document.getElementById("ScoreContainer").innerHTML = "Time survived: 0";

                //deletes everything and makes a new ball
                balls = [];
                CreateNewBall();

                //reset closing zone
                ClosingZone = 1;
            }
        }
    }
    //requesting an animation frame is better than a for loop as it doesn't tell the computer to do it right away but rather finish what it's doing and then do this
    //mostly reduces lag
    requestAnimationFrame(animation);
}
animation();
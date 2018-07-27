"use strict";
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.y = array[Math.floor(Math.random() * array.length)];
    // The enemies have to be in the stone-blocks region
    this.x = 1;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed[Math.floor(Math.random() * speed.length)];
    // have to be either slow or fast,
    // without giving the player the ability to guess neither the position of the coming bug nor the speed
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > 506) {
        this.x = -101;
        this.y = array[Math.floor(Math.random() * array.length)];
        this.speed = speed[Math.floor(Math.random() * speed.length)];
        this.x += dt * this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player   {
    constructor () {

        this.image = 'images/char-boy.png';
        this.x = 203 ;
        this.y = 416 ;
        // initial position
    }
    render () {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }

    handleInput (keyvalue) {
        switch (keyvalue) {
            case 'left' :
                this.x -= 101;
                if (this.x < 1) {
                    this.x = 1;
                }
                break;
            case 'up' :
                this.y -= 83;
                if (this.y <= 1) {
                    this.y = 1;
                }
                break;
            case 'right' :
                this.x += 101;
                if (this.x > 405) {
                    this.x = 405;
                }
                break;
            case 'down' :
                this.y += 83;
                if (this.y >= 416) {
                    this.y = 416;
                }
                break;
        }

    }

    update() {
        // TODO: update when a collision happens:

        for (const vehicle of allEnemies){
            if (this.x < vehicle.x+45 && this.x > vehicle.x-45 && this.y == vehicle.y+20 && this.y == vehicle.y+20) {
                this.y = 416;
                this.x = 203;
                score -= 10;

            }
        }
        display();
        // TODO: update when the player reaches the water:
        if (this.y == 1) {
            this.y = 416;
            this.x = 203;
            score += 20;
            gem_update();
            water += 1;

        }
    }

}

class Gem {
    constructor () {
        // we use different gems' images for the same score value
        this.image = gem_img[Math.floor(Math.random() * gem_img.length)] ;
        this.x =xarray[Math.floor(Math.random() * xarray.length)] ;
        this.y = array[Math.floor(Math.random() * array.length)];
    }

    update() {
        // update when the player collects the gem
        modalMain();
        if (player.x < this.x+45 && player.x > this.x-45 && player.y == this.y+20 && player.y == this.y+20) {
            this.x = -1000;
            score+= 10;

        }

    }


    render () {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }
}

/*class Winner {
    constructor () {
       this.modal = document.getElementById('modal');
       this.page = document.getElementById('container');

    }


}*/

var canvas =  document.getElementById('canvas');
var modalFrame = document.getElementById('modalFrame');
var playAgain = document.getElementById('button');
var score_water = document.getElementById('score_water');
var scores = document.getElementById('score');

function modalMain() {
  if (score >= 100 && water >= 5) {
    canvas.style.display = "none";
    modalFrame.style.display = "block";
    score_water.textContent = water;
    scores.textContent = score;



  }
}

playAgain.addEventListener("click", function () {
  modalFrame.style.backgroundColor = "red";
  showModal();


});

function showModal() {

  if (canvas.style.display = "none") {
    canvas.style.display = "block";
    modalFrame.style.display = "none";

  }

}



/*function startAgain() {

modalFrame.style.display = "none";
alert("this is test");

}
*/
var speed = [200, 500];
var array = [64, 147, 230];
var xarray = [1, 102, 203, 304, 405];
let score = 40;
let water = 0;
var gem_img = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];

function display() {
    document.getElementById('points').textContent = "Your score is: "+score+" points";
    document.getElementById('water').textContent = "You touched the water: "+water+" times";
}

display();



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var Enemy1 = new Enemy(),
    Enemy2 = new Enemy(),
    Enemy3 = new Enemy();
var allEnemies = [Enemy1, Enemy2, Enemy3];
var player = new Player();
var gem = new Gem();



function gem_update () {
    gem.x =xarray[Math.floor(Math.random() * xarray.length)] ;
    gem.y = array[Math.floor(Math.random() * array.length)];
    gem.image = gem_img[Math.floor(Math.random() * gem_img.length)] ;
}




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    e.preventDefault();
    player.handleInput(allowedKeys[e.keyCode]);
});

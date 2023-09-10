const canvas = document.querySelector('canvas'); //taking an element such as canvas from the web and storing it in a const named canvas
const c = canvas.getContext('2d'); //canvas context where we can edit the screen (draw shapes, background, etc)

canvas.width = 1024 // 16:9 ratio
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height) //fillRect creates a rectangle with four arguments. x position, y position, width, and height


//characters built using class so we can interact with other objects
const gravity = 0.5 // gravity for players
class Sprite {
    constructor({position, velocity, color = 'red'}) { //here we put position adn velocity in one argument so it passes through at the same time
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking 
    }

    draw() {
        c.fillStyle = this.color //color of our player/rectangle
        c.fillRect(this.position.x, this.position.y, this.width, this.height) //creating our player as a rectangle with width and height

        //attack box
        c.fillStyle = 'green' //color of our attack
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y //moving player velocity down to position of y
        
        //if the position and height of the rectangle is greater than the canvas height which is 576, then the velocity will equal 0 to stop the player from falling through the page
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else
        this.velocity.y += gravity //overtime it will add gravity value of 0.2 to the players where they fall only if they are above the canvas height (so they dont fall off the screen)
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}

//create our player and assign it to a new sprite
const player = new Sprite({
    position: {
        x: 0, //this sets the position of the player which at 0,0 is the corner of page
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'cyan'
})


//create our enemy and assign it to a new sprite
const enemy = new Sprite({
    position: {
        x: 400, //this sets the position of the player which at 0,0 is the corner of page
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red'
})


console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

//animation for velocity of characters
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black' //differ the background from characters when u use player.update it'll update to red
    c.fillRect(0,0, canvas.width, canvas.height) //clearing background
    player.update()
    enemy.update()

//velocity

    player.velocity.x = 0 //the player velocity is 0 unless a key is pressed whereas the velocity changes to -1 and 1 to
    enemy.velocity.x = 0 // enemy velocity is 0 unless key is pressed

//if statement for player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

//if statement for enemy movement
    enemy.velocity.x = 0 //the enemy velocity is 0 unless a key is pressed whereas the velocity changes to -1 and 1 to
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

    //detect collision of attackBox
    if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x && player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height && player.isAttacking) {
        console.log('hit');

    }
}

animate()

//movement of characters
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd': //pressing d moves the character on the x axis 1 pixel
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a': //pressing d moves the character on the x axis 1 pixel
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w': //pressing w moves the character on the y axis 1 pixel
            player.velocity.y = -15
        break
        case ' ': //pressing space to attack 
        player.attack()
        break

//arrow keys for enemy
        case 'ArrowRight': //pressing ArrowRight moves the character on the x axis 1 pixel
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft': //pressing ArrowLeft moves the character on the x axis 1 pixel
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp': //pressing ArrowUp moves the character on the y axis 1 pixel
            enemy.velocity.y = -15
            break
    }
    console.log(event.key);

})

//movement of characters to stop
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd': //now as the event is keyup, when u let go of the key d, the velocity changes back to 0 thus stopping the character
            keys.d.pressed = false
            break
        case 'a': //now as the event is keyup, when u let go of the key a, the velocity changes back to 0 thus stopping the character
            keys.a.pressed = false
            break
        case 'w': //now as the event is keyup, when u let go of the key w, the velocity changes back to 0 thus stopping the character
            keys.w.pressed = false
            break
    }
//enemy keyup
    switch (event.key) {
        case 'ArrowRight': //now as the event is keyup, when u let go of the key d, the velocity changes back to 0 thus stopping the character
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft': //now as the event is keyup, when u let go of the key a, the velocity changes back to 0 thus stopping the character
            keys.ArrowLeft.pressed = false
            break
    }
    console.log(event.key);

})
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.2


class Player {
    constructor(){
        this.position = {
            x: 150,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 2
        }
        this.width = 20
        this.height = 20
    }
    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor(){
        this.position = {
            x: innerWidth-(innerWidth/3)*2,
            y: innerHeight-100
        }
        this.width = 200
        this.height = 20
    }
    draw(){
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const keys = {
    up: {
        pressed: false
    },
    right:{
        pressed: false
    },
    left:{
        pressed: false
    }
}
const platform = new Platform()

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    }else {player.velocity.x = 0
        if(keys.right.pressed){
            platform.position.x -= 5
        }else if(keys.left.pressed){
            platform.position.x += 5
        }
    }


    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
    }

    player.update()
    platform.draw()
    
}
animate()

addEventListener('keydown', (event)=>{
    switch (event.key){
        case 'ArrowUp': //TODO
            player.velocity.y = -8
        break
        case 'ArrowRight':
            keys.right.pressed = true
        break
        case 'ArrowLeft':
            keys.left.pressed = true
        break
    }
})

addEventListener('keyup', (event)=>{
    switch (event.key){
        case 'ArrowRight':
            keys.right.pressed = false
        break
        case 'ArrowLeft':
            keys.left.pressed = false
        break
    }
})
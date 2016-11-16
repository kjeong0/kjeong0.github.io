var worldDirty = false

var snakeSpeed = 1
var dimensionX = 100
var dimensionY = 100
var width = 30
var height = 30
var speedX = 5
var speedY = 0

var score = 0

var currPowerUp
var snakeHead
var snakeBodies = []
var lifeTime = 3000

var done = false

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = dimensionX * width
        this.canvas.height = dimensionY * height
        this.context = this.canvas.getContext("2d")
		this.canvas.style.width = "100%"
		this.canvas.style.height = "100%"
        this.canvas.style.zIndex = 0
        this.speedX = 1
        $('.typing_game').append(this.canvas)
        this.frameNo = 0
        this.interval = setInterval(updateGameArea, 20)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    end : function() {
    	this.interval = clearInterval()
    }
}

function updateGameArea() {
	if(!done)
	{
		gameArea.clear()
	    snakeHead.newPos()
	    snakeHead.update()
	    var bodyPart = new snakeBody(30, 30, "white", snakeHead.x, snakeHead.y, "body", lifeTime)
	    snakeBodies.push(bodyPart)
	    for(var i = 0; i < snakeBodies.length; ) {
	    	if(snakeBodies[i].markedForDelete) {
	    		snakeBodies.splice(i, 1);
	    		continue
	    	}
	    	snakeBodies[i].update()
	    	++i
	    }

	    for (i = 0; i < snakeBodies.length; ++i) {
	        if (snakeHead.crashWith(snakeBodies[i])) {
	            snakeBodies[i].collided()
	        }
	    }

	    currPowerUp.update()
	    if (snakeHead.crashWith(currPowerUp)) {
	    	currPowerUp.collided()
	    	currPowerUp = new powerUp(30, 30, "red", dimensionX * width * Math.random(), dimensionY * height * Math.random(), "powerUp")
	    }
	}
}

function renderWorld() {
}

function gameSetup() {
	dimensionY = $('.typing_game').height() / height
	dimensionX = $('.typing_game').width() / width

    currPowerUp = new powerUp(30, 30, "red", dimensionX * Math.random(), dimensionY * Math.random(), "powerUp")

	document.addEventListener('keydown', function(event) {
	    if(event.keyCode == 37) {
	    	//Left
	        event.preventDefault()
	        speedX = -5
	        speedY = 0
	    }
	    else if(event.keyCode == 38) {
	    	//Up
	        event.preventDefault()
	        speedY = -5
	        speedX = 0
	    }
	    else if(event.keyCode == 39) {
	    	//Right
	        event.preventDefault()
	        speedX = 5
	        speedY = 0
	    }
	    else if(event.keyCode == 40) {
	    	//Down
	        event.preventDefault()
	        speedY = 5
	        speedX = 0
	    }
	});

    snakeHead = new snakeHead(30, 30, "white", 10, 10, "head");

	gameArea.start()
}

function endGame() {
	gameArea.end()
	done = true
	alert("Game Over!")
}

function powerUp(width, height, color, x, y, type) {
    this.type = type
    this.alive = true
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.update = function() {
        ctx = gameArea.context;
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.collided = function() {
    	score ++
    	$('.score').html(score)
    	lifeTime += 1000
	    for(var i = 0; i < snakeBodies.length; ++i) {
	    	snakeBodies[i].lifeTime += 1000
	    }
    }
}

function snakeBody(width, height, color, x, y, type, lifeTime) {
	this.lifeTime = lifeTime
	this.alive = false
	this.aliveTimer = 0
    this.type = type
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.markedForDelete = false
    this.update = function() {
    	this.speedX = speedX
    	this.speedY = speedY
        ctx = gameArea.context;
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.lifeTime -= 20
        if (this.lifeTime < 0) {
			this.markedForDelete = true
        }
        if(this.aliveTimer < 500) {
        	this.aliveTimer += 20
        }
        else if(!this.alive) {
        	this.alive = true
        }
    }
    this.collided = function() {
    	endGame()
    }
}

function snakeHead(width, height, color, x, y, type) {
    this.type = type
    this.width = width
    this.height = height
    this.speedX = speedX
    this.speedY = speedY
    this.x = x
    this.y = y
    this.update = function() {
    	this.speedX = speedX
    	this.speedY = speedY
        ctx = gameArea.context;
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.newPos = function() {
        this.x += this.speedX
        this.y += this.speedY

    	if (this.x < 0) {
    		this.x = dimensionX * width
    	}
    	else if (this.x > dimensionX * width) {
    		this.x = 0
    	}

    	if (this.y < 0) {
    		this.y = dimensionY * height
    	}
    	else if (this.y > dimensionY * height) {
    		this.y = 0
    	}
    }
    this.crashWith = function(otherobj) {
    	if(!otherobj.alive) {
    		return false
    	}
        var myleft = this.x
        var myright = this.x + (this.width)
        var mytop = this.y
        var mybottom = this.y + (this.height)
        var otherleft = otherobj.x
        var otherright = otherobj.x + (otherobj.width)
        var othertop = otherobj.y
        var otherbottom = otherobj.y + (otherobj.height)
        var crash = true
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false
        }
        return crash
    }
}
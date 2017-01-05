//airplane constructor, add more fields
function Airplane(name, posX, posY) {
	this.status = "TAXIING";
	//global position in world
	this.posX = posX;
	this.posY = posY;
	this.time = 0;
	this.altitude = 0;
	this.distance = 0;
	this.name = name;
	this.instructions = {};
	this.currentInstruction = -1;
	this.turnAngle = 0;
	this.offset = 0;
	var sprite;
} 

Airplane.prototype = {
	update: function() {
		//update tiles
		switch (this.status) {

			case "TAXIING":
				var tilename, instruction;
				//check current tile based on how far sprite should enter 
				
				//check 
				if (this.sprite.rotation === 0 || this.sprite.rotation === 90 || this.sprite.rotation === 180 || this.sprite.rotation === 270)
					instruction = this.instructions[Math.floor((this.posY + 32)/64) + "," + Math.floor((this.posX + 32)/64)];
				else if (this.sprite.rotation === 45 || this.sprite.rotation === 135 || this.sprite.rotation === 225 || this.sprite.rotation === 315)
					instruction = this.instructions[Math.floor((this.posY)/64) + "," + Math.floor((this.posX)/64)];
				
				//set instruction 
				if (instruction != undefined) {
					this.currentInstruction = instruction;
					
					if (this.sprite.rotation === 0 || this.sprite.rotation === 90 || this.sprite.rotation === 180 || this.sprite.rotation === 270)
						delete this.instructions[Math.floor((this.posY + 32)/64) + "," + Math.floor((this.posX + 32)/64)];
					else if (this.sprite.rotation === 45 || this.sprite.rotation === 135 || this.sprite.rotation === 225 || this.sprite.rotation === 315)
						delete this.instructions[Math.floor((this.posY)/64) + "," + Math.floor((this.posX)/64)];
					
					if (!isNaN(this.currentInstruction))
						this.turnAngle = Math.abs(this.sprite.rotation - this.currentInstruction);
				}
					
				//if airplane set to turn, then turn else move normally
				if (!isNaN(this.currentInstruction))
				{
					if (this.currentInstruction === -1)
						Airplane.prototype.moveSprite.call(this, .5);
					else if (this.turnAngle === 90 || this.turnAngle === 270) 
						Airplane.prototype.turn90.call(this, 128);
					else if (this.turnAngle === 45 || this.turnAngle === 315) { 
						Airplane.prototype.turn45.call(this, 192);
					}
				} else {
					if (this.currentInstruction === "hold")
						Airplane.prototype.moveSprite.call(this, .5);
				}
				
				//if (Object.keys(this.instructions).length === 0) 
					//this.status = "TAKEOFF";
			break;
		}
		
		if (this.posX > currX - 32 - this.offset && this.posX <= currX + boundsWidth + this.offset && this.posY > currY - 32 - this.offset && this.posY <= currY + boundsHeight + this.offset) {
			this.sprite.visible = true;
			this.sprite.x = this.posX - currX;
			this.sprite.y = this.posY - currY;
		} else {
			this.sprite.visible = false;
		}
	},
	changeStatus: function(status) {
		this.status = status;
		switch (this.status) {
			case "TAKEOFF":
				this.time = 0;
			break;
		}
	},
	//move the sprite based on the current speed
	moveSprite: function(speed) {
		if (this.sprite.rotation === 0)
			this.posY -= speed;	
		else if (this.sprite.rotation === 90)
			this.posX += speed;	
		else if (this.sprite.rotation === 180)
			this.posY+= speed;	
		else if (this.sprite.rotation === 270)
			this.posX -= speed;	
		else if (this.sprite.rotation === 45) {
			this.posX += 3*speed/4;	
			this.posY-= 3*speed/4;	
		} else if (this.sprite.rotation === 135) {
			this.posX += 3*speed/4;	
			this.posY+= 3*speed/4;	
		} else if (this.sprite.rotation === 225) {
			this.posX -= 3*speed/4;	
			this.posY+= 3*speed/4;	
		} else if (this.sprite.rotation === 315) {
			this.posX -= 3*speed/4;	
			this.posY-= 3*speed/4;	
		}
	},
	turn90: function(rotatespeed) {
		//taxiing speed always 1
		var speed = .5;
		rotatespeed = 90/rotatespeed;

		if (this.sprite.rotation <= this.currentInstruction) {
			if (this.currentInstruction === 270 && this.sprite.rotation === 0)
				this.sprite.rotation = 360 - rotatespeed;
			else
				this.sprite.rotation += rotatespeed
		}
		else {
			if (this.currentInstruction === 0 && this.sprite.rotation === 270)
				this.sprite.rotation = -90 + rotatespeed;
			else
				this.sprite.rotation -= rotatespeed;
		}
		
		if (this.sprite.rotation > 0 && this.sprite.rotation < 90) { //turn from 0 to 90
			if (this.sprite.rotation <= 30) {
				this.posY -= 2*speed/3;
				this.posX += speed/3;	
			} else if (this.sprite.rotation <= 60) {
				this.posX += speed/2;
				this.posY -= speed/2;
			} else {
				this.posX += 2*speed/3;
				this.posY -= speed/3;
			}
		} else if (this.sprite.rotation < 360 && this.sprite.rotation > 270) { //turn from 0 to 270
			if (this.sprite.rotation >= 330) {
				this.posY -= 2*speed/3;
				this.posX -= speed/3;	
			} else if (this.sprite.rotation >= 300) {
				this.posX -= speed/2;
				this.posY -= speed/2;
			} else {
				this.posX -= 2*speed/3;
				this.posY -= speed/3;
			}
		} else if (this.sprite.rotation > 90 && this.sprite.rotation < 180) { //turn from 180 to 90
			if (this.sprite.rotation >= 150) {
				this.posY += 2*speed/3;
				this.posX += speed/3;	
			} else if (this.sprite.rotation >= 120) {
				this.posX += speed/2;
				this.posY += speed/2;
			} else {
				this.posX += 2*speed/3;
				this.posY += speed/3;
			}
		} else if (this.sprite.rotation > 180 && this.sprite.rotation < 270) { //turn from 180 to 270
			if (this.sprite.rotation <= 210) {
				this.posY += 2*speed/3;
				this.posX -= speed/3;	
			} else if (this.sprite.rotation <= 240) {
				this.posX -= speed/2;
				this.posY += speed/2;
			} else {
				this.posX -= 2*speed/3;
				this.posY += speed/3;
			}
		} else if (this.sprite.rotation > -90 && this.sprite.rotation < 0) { //turn from 270 to 0
			if (this.sprite.rotation <= -60) {
				this.posX -= 2*speed/3;
				this.posY -= speed/3;	
			} else if (this.sprite.rotation <= -30) {
				this.posX -= speed/2;
				this.posY -= speed/2;
			} else {
				this.posY -= 2*speed/3;
				this.posX -= speed/3;
			}
		}  
		
		if (this.sprite.rotation === this.currentInstruction) {
			this.currentInstruction = -1;
			this.posX = Math.round(this.posX);
			this.posY = Math.round(this.posY);
		}
	},
	turn45: function(rotatespeed) {
		//taxiing speed always 1
		var speed = .5;
		rotatespeed = 45/rotatespeed;
	
		if (this.sprite.rotation <= this.currentInstruction) {
			if (this.currentInstruction === 315 && this.sprite.rotation === 0)
				this.sprite.rotation = 360 - rotatespeed;
			else
				this.sprite.rotation += rotatespeed
		}
		else {
			if (this.currentInstruction === 0 && this.sprite.rotation === 315)
				this.sprite.rotation = -45 + rotatespeed;
			else
				this.sprite.rotation -= rotatespeed;
		}
		
		if (this.sprite.rotation > 0 && this.sprite.rotation < 45) {		//turn from 0 to 45
			if (this.sprite.rotation <= 30) {
				this.posY -= speed;
				this.posX += speed/4;
			} else {
				this.posY -= speed;
				this.posX += speed/2;
			}
		} else if (this.sprite.rotation > 45 && this.sprite.rotation < 90) {	//turn from 45 to 90
			if (this.sprite.rotation >= 60) {
				this.posX += speed;
				this.posY -= speed/4;
			} else {
				this.posX += speed;
				this.posY -= speed/2;
			}
		} else if (this.sprite.rotation > 90 && this.sprite.rotation < 135) {	//turn from 90 to 135
			if (this.sprite.rotation <= 120) {
				this.posX += speed;
				this.posY += speed/4;
			} else {
				this.posX += speed;
				this.posY += speed/2;
			}
		} else if (this.sprite.rotation > 135 && this.sprite.rotation < 180) {	//turn from 135 to 180
			if (this.sprite.rotation >= 150) {
				this.posX += speed;
				this.posY += speed/4;
			} else {
				this.posX += speed;
				this.posY += speed/2;
			}
		} else if (this.sprite.rotation > 180 && this.sprite.rotation < 225) {	//turn from 180 to 225
			if (this.sprite.rotation <= 210) {
				this.posX -= speed;
				this.posY -= speed/4;
			} else {
				this.posX -= speed;
				this.posY -= speed/2;
			}
		} else if (this.sprite.rotation > 225 && this.sprite.rotation < 270) {	//turn from 225 to 270
			if (this.sprite.rotation >= 240) {
				this.posX += speed;
				this.posY += speed/4;
			} else {
				this.posX += speed;
				this.posY += speed/2;
			}
		} else if (this.sprite.rotation > 270 && this.sprite.rotation < 315) {	//turn from 270 to 315
			if (this.sprite.rotation <= 300) {
				this.posX -= speed;
				this.posY -= speed/4;
			} else {
				this.posX -= speed;
				this.posY -= speed/2;
			}
		}  else if (this.sprite.rotation > -45 && this.sprite.rotation < 0) {	//turn from 315 to 0
			if (this.sprite.rotation >= -30) {
				this.posY -= speed;
				this.posX -= speed/4;
			} else {
				this.posY -= speed;
				this.posX -= speed/2;
			}
		}
				
		if (this.sprite.rotation === this.currentInstruction) {
			this.currentInstruction = -1;
			this.posX = Math.round(this.posX);
			this.posY = Math.round(this.posY);
		}
	},
	addInstruction: function(pos, dir) {
		this.instructions[pos] = dir;
	}
}
//<------------------------------ B737 class --------------------------------->

function B737(name, posX, posY) {
	Airplane.call(this, name, posX, posY);
	var airplanetile = new createjs.SpriteSheet({
		"images": ["game/images/airplane2.png"],
		"frames": {"height": 128, "width": 128, "regX": 64, "regY": 64},
		"animations": {
			 "default": [0],				//Terminal building middle
		 }
	});
	this.sprite = new createjs.Sprite(airplanetile); 
	this.sprite.gotoAndStop("default");
	this.sprite.rotation = 180;
	this.offset = 32;
	sprite_layer.addChild(this.sprite);
	this.type = "B737-8";
}

B737.prototype = new Airplane();

B737.prototype = {
	 update: function() {
		//update tiles
		switch (this.status) {
			
			case "TAKEOFF":
				//current speed
				var speed;
				if (this.time < 30)
					speed = this.time % 2;
				else if (this.time < 300)
					speed = Math.floor(this.time/30)/2;
				else
					speed = 10;
				
				Airplane.prototype.moveSprite.call(this, speed);
				
				if (this.time < 300)
					this.time += 1;
			break;
		}

	 	Airplane.prototype.update.call(this);
	},
	
	changeStatus: function(status) {
		Airplane.prototype.changeStatus.call(this, status);
	},
	
	addInstruction: function(pos, dir) {
		Airplane.prototype.addInstruction.call(this, pos, dir);
	}
	
}

//<------------------------------ A320 class --------------------------------->




//use + 48 
// var tilename;
// //check current tile
// if (this.sprite.rotation === 0) 
	// tilename = allTurns[Math.floor(this.posY/64) + "," + Math.floor(this.posX/64)];
// else if (this.sprite.rotation === 90) 
	// tilename = allTurns[Math.floor(this.posY/64) + "," + Math.floor((this.posX + 64)/64)];	
// else if (this.sprite.rotation === 180) 
	// tilename = allTurns[Math.floor((this.posY + 48)/64) + "," + Math.floor(this.posX/64)];
// else if (this.sprite.rotation === 270) 
	// tilename = allTurns[Math.floor((this.posY + 64)/64) + "," + Math.floor(this.posX/64)];
	
// //if over a turn tile, then get the next turn in queue
// if (tilename !=== undefined) {
	// this.currentInstruction = this.instructions.shift(); 
	// this.time = 0;
// }

// var speed = 1;

// //Turn
// if (this.currentInstruction != -1) {
	// //rotate speed
	// if (this.sprite.rotation != this.currentInstruction)
		// this.sprite.rotation -= 90/96;
		
	// //turn from 180 to 90
	// if (this.sprite.rotation > 90 && this.sprite.rotation < 180) {
		// if (this.sprite.rotation >= 150) {
			// this.posY += 2*speed/3;
			// this.posX += speed/3;	
		// } else if (this.sprite.rotation >= 120) {
			// this.posX += speed/2;
			// this.posY += speed/2;
		// } else {
			// this.posX += 2*speed/3;
			// this.posY += speed/3;
		// }
	// }
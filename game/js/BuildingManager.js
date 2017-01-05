function Gate(name, type, posX, posY, rotation, turnPosX, turnPosY) {
	//type 1 = small planes gate
	//type 2 = big planes gate
	this.name = name;
	this.free = true;
	this.type = type;
	this.posX = posX;
	this.posY = posY;
	this.sprite = airportTileSprite.clone();
	this.sprite.gotoAndStop("gate" + type);
	this.sprite.rotation = rotation;
	sprite_layer.addChild(this.sprite);
	
	var graphic, text;
	this.gateBox = new createjs.Container();
	this.gateBox.setBounds(0,0,64,64);
	text = new createjs.Text(this.name, "20px Arial", "#FFFFFF");
	text.x = this.gateBox.getBounds().width/2 - text.getBounds().width/2;
	text.y = this.gateBox.getBounds().height/2 - text.getBounds().height/2;
	text.textBaseline = "alphabetic";
	
	graphic = new createjs.Shape();
	graphic.graphics.beginFill("#0000FF").drawRect(text.x-1, text.y-18, text.getBounds().width + 2, text.getBounds().height);
	graphic.alpha = .8;
	this.gateBox.addChild(graphic);
	this.gateBox.addChild(text);
	this.gateBox.visible = false;
	this.gateBox.regX = 32; 
	this.gateBox.regY = 32;
	ui_layer.addChild(this.gateBox);
}

Gate.prototype = {
	update: function() {
		if (this.posX > currX - 32 && this.posX <= currX + boundsWidth && this.posY > currY - 32 && this.posY <= currY + boundsHeight) {
			this.sprite.visible = true;
			this.sprite.x = this.posX - currX;
			this.sprite.y = this.posY - currY;
			this.gateBox.visible = true;
			this.gateBox.x = this.posX - currX;
			this.gateBox.y = this.posY - currY;
		} else {
			this.sprite.visible = false;
			this.gateBox.visible = false;
		}
	}
}
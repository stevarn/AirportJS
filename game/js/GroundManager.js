//Taxi poitn constructor
function TaxiPoint(arr) {
	this.posX = arr["x"] * 64;
	this.posY = arr["y"] * 64;
	this.displayX = arr["displayX"];
	this.displayY = arr["displayY"];
	this.selected = false;
	this.points = arr["points"]; //all intersections it connects to

	this.arrowBox = new createjs.Container();
	this.arrowBox.setBounds(0,0,192,192);

	//this.arrowBox.visible = false;
	this.arrowBox.regX = 96; 
	this.arrowBox.regY = 96;
	this.arrowBox.visible = false;
	graphic = new createjs.Shape();
	graphic.graphics.beginFill("#0000FF").drawRect(0, 0, 192, 192);
	graphic.alpha = 0.5;
	this.arrowBox.addChild(graphic);
	ui_layer.addChild(this.arrowBox);
}


TaxiPoint.prototype = {
	showPoints: function() {
		this.selected = true;
	},
	update: function() {
		if (this.selected) {
			//boundsWidth must be increased to 96 since we are using 3 tiles
			if (this.posX > currX - 96 && this.posX <= currX + boundsWidth + 64 && this.posY > currY - 96 && this.posY <= currY + boundsHeight + 64) {
				this.arrowBox.visible = true;
				this.arrowBox.x = (this.displayX)*64 - currX;
				this.arrowBox.y = (this.displayY)*64 - currY;
			} else
				this.arrowBox.visible = false;
		}
	}
}

function Runway(name, entrance, exits) {
	this.name = name;
	this.entrance = entrance;
	this.exits = exits;
}
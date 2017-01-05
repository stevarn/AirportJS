//variables for the camera;
var currX, currY, mapWidth, mapHeight, maxWidth, maxHeight;

//boolean variables
var upPressed, downPressed, leftPressed, rightPressed;

//map for the entire level and tiles
var groundLayout, buildingLayout, groundTileSprite, airportTileSprite, allGates, allTaxiPoints;

//camera container as viewport
var tilesContainer, speed;

function initGame(name) {
	//default booleans
	upPressed = false;
	downPressed = false; 
	leftPressed = false;
	rightPressed = false;
	
	//set up map
	//TO-DO: preloadjs all images
	setUpMap(name);
		
	//set up camera container
	tilesContainer = new createjs.Container();
	tilesContainer.x = 0;
	tilesContainer.y = 0;

	bg_layer.addChild(tilesContainer);
	//set speed
	speed = 32;
	
	//default camera position
	currX = 320; 
	currY = 640;
	
	//initUI();
	
	//update tiles once to make them appear
	updateAll();
}

/**
 * currX and currY represent top-left coordinates
 */
function updateGame() {
	var prevX  = currX;
	var prevY = currY;
		
	if (leftPressed) {
		if (currX - speed < 0)
			currX = 0;
		else
			currX = currX - speed;
	}
	else if (rightPressed) {
		if (currX + boundsWidth + speed > maxWidth)
			currX = maxWidth - boundsWidth;
		else
			currX = currX + speed;
	}
	if (upPressed) {
		if (currY - speed < 0)
			currY = 0;
		else
			currY = currY - speed;
	}
	else if (downPressed) {
		if (currY + boundsHeight + speed > maxHeight)
			currY = maxHeight - boundsHeight;
		else
			currY = currY + speed;
	}
	
	if (currX != prevX || currY != prevY) {
		//Update camera to redraw things inside viewport
		updateAll();

	}

	//update all airplane locations
	updateAirplanes();
}

//update tiles container
function updateAll() {
	
	/************* UPDATE CAMERA GROUND TILES *******************/
	//remove all things inside container
	tilesContainer.removeAllChildren();
	
	var row, col, tileClone, startX, startY, endX, endY, x, y, name;
	
	startX = Math.floor(currX/64);
	startY = Math.floor(currY/64);
	endX = Math.ceil((currX + boundsWidth)/64);
	endY = Math.ceil((currY + boundsHeight)/64);

	x = 0;
	y = 0;

	//rebuild ground tiles
	for (row = startY; row < endY; row++) {
		for (col = startX; col < endX; col++) {
		
			//ground tile
			name = groundLayout[row][col];
			if (name.length > 0) {
				tileClone = groundTileSprite.clone();
				tileClone.gotoAndStop(name.substring(1));
				//set rotation of tile
				//move tile accordingly to rotation. This is because registration point at center wasn't rendering the tiles properly
				if (name.charAt(0) === '1')
				{
					tileClone.rotation = 90;
				}
				else if (name.charAt(0) === '2') {
					tileClone.rotation = 180;
				}
				else if (name.charAt(0) === '3') {
					tileClone.rotation = 270;
				}
				tileClone.x = x * 64 - currX % 64;
				tileClone.y = y * 64 - currY % 64;
				tilesContainer.addChild(tileClone);
			}
			
			//building tile
			name = airportLayout[row][col];
			if (name.length > 0) {
				tileClone = airportTileSprite.clone();
				tileClone.gotoAndStop(name.substring(1));
				//set rotation of tile
				//move tile accordingly to rotation. This is because registration point at center wasn't rendering the tiles properly
				if (name.charAt(0) === '1')
				{
					tileClone.rotation = 90;
				}
				else if (name.charAt(0) === '2') {
					tileClone.rotation = 180;
				}
				else if (name.charAt(0) === '3') {
					tileClone.rotation = 270;
				}
				tileClone.x = x * 64 - currX % 64;
				tileClone.y = y * 64 - currY % 64;
				tilesContainer.addChild(tileClone);
			}
			x++
		}
		x = 0;
		y++;
	}
	bg_layer.update();
	//tilesContainer.cache(0,0,1024,600);

	/*********** UPDATE ALL SPRITES ******************/
	for (var key in allGates) {
		allGates[key].update();
	}
	for (var key in allTaxiPoints) {
		allTaxiPoints[key].update();
	}
}

function gameKeyboardEvent(evt) {
	if (evt.type === "keydown") {
		if (evt.keyCode === 65 || evt.keyCode === 37) { // left
			leftPressed = true;
			rightPressed = false;
		} else if (evt.keyCode === 68 || evt.keyCode === 39) { // right
			leftPressed = false;
			rightPressed = true;
		} else if (evt.keyCode === 87 || evt.keyCode === 38) { // up
			upPressed = true;
			downPressed = false;
		} else if (evt.keyCode === 83 || evt.keyCode === 40) { // down
			upPressed = false;
			downPressed = true;
		}
	} else if (evt.type === "keyup") {
		if (evt.keyCode === 65 || evt.keyCode === 37) { // left
				leftPressed = false;
		} else if (evt.keyCode === 68 || evt.keyCode === 39) { // right
			rightPressed = false;
		} else if (evt.keyCode === 87 || evt.keyCode === 38) { // up
			upPressed = false;
		} else if (evt.keyCode === 83 || evt.keyCode === 40) { // down
			downPressed = false;
		}
	}
	if (evt.type === "stagemousedown") {
		console.log("y:" + Math.round((evt.stageY+currY)/64) + " x:" + Math.round((evt.stageX+currX)/64));
	}
}
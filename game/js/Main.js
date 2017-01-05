var canvas, 		//Canvas
	bg_layer, 		//background stage
	sprite_layer, 	//sprites stage
	ui_layer, 		//ui stage
	debugtext, 		//debug text
	game_state, 	//current game state
	boundsWidth, 	//limit of map width
	boundsHeight;	//limit of map height

function init() {
	/*Scale canvas to device size, max out on window */
	var winWidth, winHeight;
	document.body.style.overflow = "hidden";
	if ($(window).width() > 1024) 
		winWidth = 1026;
	else
		winWidth = $(window).width() - 2;
	if ($(window).height() > 600) 
		winHeight = 602;
	else
		winHeight = $(window).height() - 2;

	canvas = id("bgCanvas");
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas = id("spriteCanvas");
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas = id("uiCanvas");
    canvas.width = winWidth;
    canvas.height = winHeight;

	//create stage for background layer
	bg_layer = new createjs.Stage(id("bgCanvas"));
	bg_layer.snapToPixelsEnabled = true;
	//create stage for sprites layer
	sprite_layer = new createjs.Stage(id("spriteCanvas"));
	sprite_layer.snapToPixelsEnabled = true;
	//create stage for UI layer
	ui_layer = new createjs.Stage(id("uiCanvas"));
	ui_layer.snapToPixelsEnabled = true;

	createjs.Touch.enable(ui_layer);
	//set mouseclick
	ui_layer.on("stagemousedown", function(evt) {
		gameKeyboardEvent(evt);
	});

	//set canvas
	canvas.addEventListener("keydown", handleKeyboardEvent, true);
	canvas.addEventListener("keyup", handleKeyboardEvent, true);
	canvas.addEventListener("blur", handleLoseFocus, true);

	boundsWidth = canvas.width + 32;
	boundsHeight = canvas.height + 32;
	
	//set game state, PLAYING, MAIN
	game_state = "INIT_MAP";

	//initialize game
	initGame("mercy");

	//create fps text
	debugtext = new createjs.Text("", "12px Arial", "#f00c93");
	debugtext.x = 5;
	debugtext.y = 5;
	debugtext.textBaseline = "hanging";
	ui_layer.addChild(debugtext); 

	//set update cycle
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", tick);
} 

function id(id) {
	return id === null || id === undefined ? alert("Please provide element id") : document.getElementById(id);
}
		
function tick() {
	switch (game_state) {
		case "INIT_MAP":
		//need first update to render background else wont render on first frame
			bg_layer.update();
			sprite_layer.update();
			game_state = "PLAYING";
		break;
		case "PLAYING":
			updateGame();
			//sprite layer always updated
			sprite_layer.update();
		break;
	}
	debugtext.text = "Pre-Alpha Debug: " + Math.round(createjs.Ticker.getMeasuredFPS()) + " fps Position: " + currX + ", " + currY + "\nWork in Progress!"; 	

	ui_layer.update();
} 

function handleKeyboardEvent(evt) {
	if (evt.type === "keydown" || evt.type === "keyup") {
		evt.preventDefault();
		switch (game_state) {
			case "PLAYING":
				gameKeyboardEvent(evt);
				break;
		}
	}
}

function handleMouseDown(evt) {
	switch (game_state) {
		case "PLAYING":
			console.log("Here");
			gameKeyboardEvent(evt);
			break;
	}
}

function handleLoseFocus(evt) {
	console.log("lost");
}
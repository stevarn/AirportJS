//create ground tiles
function setUpGroundTiles(name) {
	var groundTileSheet;
	switch (name) {
		case "mercy":
			$.getJSON("game/data/ground_tiles.json", function(data) {
				groundTileSheet = new createjs.SpriteSheet(JSON.parse(JSON.stringify(data)));
			});

			break;
	}
	groundTileSprite = new createjs.Sprite(groundTileSheet);
}

function setUpAirportTiles(name) {
	var airportTileSheet;
	
	$.getJSON("game/data/" + name + "/" + name + "_tiles.json", function(data) {
		airportTileSheet = new createjs.SpriteSheet(JSON.parse(JSON.stringify(data)));
	});

	airportTileSprite = new createjs.Sprite(airportTileSheet);
}

function setUpMap(name) {
	$.ajaxSetup({ async: false });
	setUpGroundTiles(name);
	setUpAirportTiles(name);
	
	var layout;

	$.getJSON("game/data/" + name + "/" + name + "_layout.json", function(data) {
		layout = JSON.parse(JSON.stringify(data));
	});

	
	groundLayout = layout["groundLayout"];
	airportLayout =  layout["airportLayout"];
	
	//set up map dimensions
	mapWidth = groundLayout[0].length;
	mapHeight = groundLayout.length;
	maxWidth = mapWidth * 64;
	maxHeight = mapHeight * 64;
	
	//set up rest
	setUpGroundData(name);
	setUpDefaultAirplanes(name) ;
}

function setUpGroundData(name) {
	allTaxiPoints ={};
	allGates = {};

	$.getJSON("game/data/" + name + "/" + name + "_taxipoints.json", function(data) {
		var taxiPoint = JSON.parse(JSON.stringify(data));
		for (var i = 0, len = taxiPoint.length; i < len; i++) {
		    allTaxiPoints[taxiPoint[i]["y"] + "," + taxiPoint[i]["x"]] = new TaxiPoint(taxiPoint[i]);
		}
	});

	$.getJSON("game/data/" + name + "/" + name + "_gates.json", function(data) {
		var gates = JSON.parse(JSON.stringify(data));
		for (var key in gates) {
			//allGates[key] = new Gate(gates[key][0], gates[key][1], gates[key][2], gates[key][3], gates[key][4]);
		}
	});

			
}
function setUpDefaultAirplanes(name) {
	switch (name) {
		case "mercy":
		
			createAirplane("blah", "B737", 1024, 384);
			allAirplanes["blah"].addInstruction("9,16", 270);
			//allAirplanes["blah"].addInstruction("8,15", 180);
			allAirplanes["blah"].addInstruction("11,15", 90);
			allAirplanes["blah"].addInstruction("11,18", 135);
			allAirplanes["blah"].addInstruction("14,22", 90);
			allAirplanes["blah"].addInstruction("15,24", 0);
			//allAirplanes["blah"].addInstruction("11,51", 180);
			//allAirplanes["blah"].addInstruction("15,51", 270);

			createAirplane("blah2", "B737", 960, 640);
			allAirplanes["blah2"].addInstruction("11,15", 270);
			allAirplanes["blah2"].addInstruction("11,7", 0);
			allAirplanes["blah2"].addInstruction("8,7", 90);
			allAirplanes["blah2"].addInstruction("8,10", 0);

			createAirplane("blah3", "B737", 1600, 896);
			allAirplanes["blah3"].addInstruction("15,25", 270);
			allAirplanes["blah3"].addInstruction("15,23", 315);
			allAirplanes["blah3"].addInstruction("12,20", 0);
			allAirplanes["blah3"].addInstruction("11,20", 90);
			//allAirplanes["blah3"].addInstruction("11,18", 270);

			createAirplane("blah4", "B737", 2176, 896);
			allAirplanes["blah4"].addInstruction("15,34", 90);
			allAirplanes["blah4"].addInstruction("15,35", 45);
			allAirplanes["blah4"].addInstruction("11,39", 90);
			allAirplanes["blah4"].addInstruction("9,39", 270);
			//allAirplanes["blah4"].addInstruction("11,40", 90);
			break;
	}
}


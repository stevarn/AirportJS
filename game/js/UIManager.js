var bottombar;

var uicontainer; 

var uipanel, airporttext, airplanetext, commtext;

var weathertext;

var uideptarture, uiarrival, depttext, arrtext;

var flightstrip, flightname, flightplane, flightstatus, flightspeed, flightdist, flightalt, flightgate, flightrunway, flighttime;

function initUI() {
	bottombar = new createjs.Shape();
	bottombar.graphics.beginFill("#111111").drawRect(0, 0, 1024, 20);
	bottombar.cache(0, 0, 1024, 20);
	bottombar.alpha = .8;
	//ui_layer.addChild(bottombar);
	
	uicontainer  = new createjs.Container();
	uicontainer.setBounds(0,0,600,1024);
	
	var sheet = new createjs.SpriteSheet({
		"images": ["game/images/uipanel.png"],
		"frames": {"height": 132, "width": 1024, "regX": 0, "regY": 0},
		"animations": {
			 "default": [0],				//Terminal building middle
		 }
	});
	uipanel = new createjs.Sprite(sheet); 
	uipanel.x = 0;
	uipanel.y = 600-132;
	uipanel.gotoAndStop("default");
	
	airporttext = new createjs.Text("AIRPORT", "20px Myriad Web Pro", "#000000");
	airporttext.x = 128;
	airporttext.y =  600-102;
	airporttext.textAlign = "center";
	airporttext.textBaseline = "alphabetic";
	
	weathertext = new createjs.Text("WEATHER: CLOUDY", "12 Consolas", "#FFFFFF");
	weathertext.x = 128;
	weathertext.y =  600-82;
	weathertext.textAlign = "center";
	weathertext.textBaseline = "alphabetic";
	
	airplanetext = new createjs.Text("FLIGHT", "20px Myriad Web Pro", "#000000");
	airplanetext.x = 512;
	airplanetext.y =  600-102;
	airplanetext.textAlign = "center";
	airplanetext.textBaseline = "alphabetic";
	
	commtext = new createjs.Text("ATC COMMUNICATION", "20px Myriad Web Pro", "#000000");
	commtext.x = 896;
	commtext.y =  600-102;
	commtext.textAlign = "center";
	commtext.textBaseline = "alphabetic";
	
	sheet = new createjs.SpriteSheet({
		"images": ["game/images/uideparture.png"],
		"frames": {"height": 362, "width": 132, "regX": 0, "regY": 0},
		"animations": {
			 "default": [0],				//Terminal building middle
		 }
	});
	uideptarture = new createjs.Sprite(sheet); 
	uideptarture.x = 0;
	uideptarture.y = 64;
	uideptarture.gotoAndStop("default");
	depttext = new createjs.Text("DEPARTURES", "20px Myriad Web Pro", "#000000");
	depttext.x = 64;
	depttext.y =  600-502;
	depttext.textAlign = "center";
	depttext.textBaseline = "alphabetic";
	
	sheet = new createjs.SpriteSheet({
		"images": ["game/images/uiarrival.png"],
		"frames": {"height": 362, "width": 132, "regX": 0, "regY": 0},
		"animations": {
			 "default": [0],				//Terminal building middle
		 }
	});
	uiarrival = new createjs.Sprite(sheet); 
	uiarrival.x = 1024-132;
	uiarrival.y = 64;
	uiarrival.gotoAndStop("default");
	arrtext = new createjs.Text("ARRIVALS", "20px Myriad Web Pro", "#000000");
	arrtext.x = 1024-64;
	arrtext.y =  600-502;
	arrtext.textAlign = "center";
	arrtext.textBaseline = "alphabetic";
	
	/* FLIGHT STRIP */
	var sheet = new createjs.SpriteSheet({
		"images": ["game/images/flightstrip.png"],
		"frames": {"height": 64, "width": 448, "regX": 0, "regY": 0},
		"animations": {
			 "default": [0],				//Terminal building middle
		 }
	});
	var flightstripBG = new createjs.Sprite(sheet); 
	flightstripBG.gotoAndStop("default");
	
	flightstrip = new createjs.Container();
	flightstrip.setBounds(0,0,64,448);
	flightstrip.x = 288;
	flightstrip.y = 600 - 68;

	flightname = new createjs.Text("UA1439", "16px Consolas", "#000000");
	flightname.x = 4;
	flightname.y = 16;
	flightname.textBaseline = "alphabetic";
	
	flightplane = new createjs.Text("B737-8", "12px Consolas", "#000000");
	flightplane.x = 4;
	flightplane.y = 36;
	flightplane.textBaseline = "alphabetic";
	
	flightspeed = new createjs.Text("SPEED:\n3000", "12px Consolas", "#000000");
	flightspeed.x = 98;
	flightspeed.y = 11;
	flightspeed.textBaseline = "alphabetic";
	
	flightdist = new createjs.Text("DIST:\n3000", "12px Consolas", "#000000");
	flightdist.x = 98;
	flightdist.y = 32;
	flightdist.textBaseline = "alphabetic";
	
	flightalt = new createjs.Text("ALT:\n30000", "12px Consolas", "#000000");
	flightalt.x = 98;
	flightalt.y = 53;
	flightalt.textBaseline = "alphabetic";
	
	flightgate = new createjs.Text("GATE:\nA113", "12px Consolas", "#000000");
	flightgate.x = 148	;
	flightgate.y = 11;
	flightgate.textBaseline = "alphabetic";
	
	flightrunway = new createjs.Text("RWY:\n9", "12px Consolas", "#000000");
	flightrunway.x = 148;
	flightrunway.y = 32;
	flightrunway.textBaseline = "alphabetic";
		
	flighttime = new createjs.Text("ARR: 1030", "12px Consolas", "#000000");
	flighttime.x = 212;
	flighttime.y = 11;
	flighttime.textBaseline = "alphabetic";
		
		
	flightstatus = new createjs.Text("STATUS: TAXIING", "12px Consolas", "#000000");
	flightstatus.x = 212;
	flightstatus.y = 60;
	flightstatus.textBaseline = "alphabetic";	
		
	flightstrip.addChild(flightstripBG);
	flightstrip.addChild(flightname);
	flightstrip.addChild(flightplane);
	flightstrip.addChild(flightstatus);
	flightstrip.addChild(flightspeed);
	flightstrip.addChild(flightdist);
	flightstrip.addChild(flightalt);
	flightstrip.addChild(flightgate);
	flightstrip.addChild(flightrunway);
	flightstrip.addChild(flighttime);
	
	uicontainer.addChild(uipanel);
	uicontainer.addChild(airporttext);	
	uicontainer.addChild(weathertext);
	uicontainer.addChild(airplanetext);	
	uicontainer.addChild(commtext);	
	uicontainer.addChild(uideptarture);	
	uicontainer.addChild(uiarrival);	
	uicontainer.addChild(depttext);	
	uicontainer.addChild(arrtext);	
	uicontainer.addChild(flightstrip);
	
	uicontainer.cache(0,0,1024,600);
	
	ui_layer.addChild(uicontainer);
	
}
var allAirplanes;

//add parameters to funciton later
function createAirplane(name, type, posX, posY) {
	if (!allAirplanes)
		allAirplanes = {};
		
	switch (type) {
		case "B737":
			allAirplanes[name] = new B737(type, posX, posY);
	}	
	allAirplanes[name].changeStatus("TAXIING");
}

function updateAirplanes() {
	for (var key in allAirplanes) {
		allAirplanes[key].update();
	}
}
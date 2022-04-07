function showtransmute() {
	transmutedisplay += 1;
	if (transmutedisplay % 2 == 0) {
		document.getElementById("transmuteinfo").style.display = "initial";
		document.getElementById("transmuteamount").style.display = "initial";
		document.getElementById("transmuteconfirm").style.display = "initial";
	} else {
		document.getElementById("transmuteinfo").style.display = "none";	
		document.getElementById("transmuteamount").style.display = "none";
		document.getElementById("transmuteconfirm").style.display = "none";
	}
}

function showsmelter() {
	smeltdisplay += 1;
	if (smeltdisplay % 2 == 0) {
		document.getElementById("smeltinfo").style.display = "initial";
		document.getElementById("smeltamount").style.display = "initial";
		document.getElementById("smeltconfirm").style.display = "initial";
	} else {
		document.getElementById("smeltinfo").style.display = "none";	
		document.getElementById("smeltamount").style.display = "none";
		document.getElementById("smeltconfirm").style.display = "none";
	}
}

function showcompressor() {
	compressdisplay += 1;
	if (compressdisplay % 2 == 0) {
		document.getElementById("compressinfo").style.display = "initial";
		document.getElementById("compressamount").style.display = "initial";
		document.getElementById("compressconfirm").style.display = "initial";
	} else {
		document.getElementById("compressinfo").style.display = "none";	
		document.getElementById("compressamount").style.display = "none";
		document.getElementById("compressconfirm").style.display = "none";
	}
}

function showpressurizer() {
	pressurizedisplay += 1;
	if (pressurizedisplay % 2 == 0) {
		document.getElementById("pressurizeinfo").style.display = "initial";
		document.getElementById("pressurizeamount").style.display = "initial";
		document.getElementById("pressurizeconfirm").style.display = "initial";
	} else {
		document.getElementById("pressurizeinfo").style.display = "none";	
		document.getElementById("pressurizeamount").style.display = "none";
		document.getElementById("pressurizeconfirm").style.display = "none";
	}
}





function transmutecopper() {
	transmuteinput = document.getElementById("transmuteamount").value;
	transmuteinput = parseInt(transmuteinput);
	if (typeof(transmuteinput) == "number") {
		if (transmuteinput*6 <= money) {
			money -= 6*transmuteinput;
			copper += transmuteinput;
		}
	}
	document.getElementById("transmuteinfo").style.display = "none";	
	document.getElementById("transmuteamount").style.display = "none";
	document.getElementById("transmuteconfirm").style.display = "none";
}

function smeltiron() {
	smeltinput = document.getElementById("smeltamount").value;
	smeltinput = parseInt(smeltinput);
	if (typeof(smeltinput) == "number") {
		if (smeltinput*4 <= money && smeltinput <= copper) {
			money -= 4*smeltinput;
			copper -= smeltinput;
			iron += smeltinput;
		}
	}
	document.getElementById("smeltinfo").style.display = "none";	
	document.getElementById("smeltamount").style.display = "none";
	document.getElementById("smeltconfirm").style.display = "none";
}

function compresstitanium() {
	compressinput = document.getElementById("compressamount").value;
	compressinput = parseInt(compressinput);
	if (typeof(compressinput) == "number") {
		if (compressinput*3 <= money && compressinput*3 <= copper && compressinput <= iron) {
			money -= 3*compressinput;
			copper -= 3*compressinput;
			iron -= compressinput;
			titanium += 2*compressinput;
		}
	}
	document.getElementById("compressinfo").style.display = "none";	
	document.getElementById("compressamount").style.display = "none";
	document.getElementById("compressconfirm").style.display = "none";
}

function pressurizediamond() {
	pressurizeinput = document.getElementById("pressurizeamount").value;
	pressurizeinput = parseInt(pressurizeinput);
	if (typeof(pressurizeinput) == "number") {
		if (pressurizeinput*4 <= money && pressurizeinput*3 <= iron && pressurizeinput*2 <= titanium) {
			money -= 4*pressurizeinput;
			iron -= 3*pressurizeinput;
			titanium -= 2*pressurizeinput;
			diamond += pressurizeinput;
		}
	}
	document.getElementById("pressurizeinfo").style.display = "none";	
	document.getElementById("pressurizeamount").style.display = "none";
	document.getElementById("pressurizeconfirm").style.display = "none";
}




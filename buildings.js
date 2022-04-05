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


let link = "https://raw.githubusercontent.com/ren-zhou/rentable/main/templates/template.json";
function loadFile() {
	let req = new XMLHttpRequest();
	req.addEventListener("load", loadFromFile);
	req.open("GET", link, false);
	req.send();
}

function loadFromFile() {
	loadFromString(this.responseText);
}
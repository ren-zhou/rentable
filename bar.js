const bar = document.getElementById("nav-bar");

let titleButton;
let resetButton;
let validateButton;
let resetLocalButton;
let titleText;

bar.onclick = toggleDarkMode;
let light_on = true;

const light_theme = {	
	'--main-background-color': 'white',
	'--bar-color': '#ffd260',
	'--cell-border-color': 'black',
	'--cell-background-color': 'white',
	'--cell-highlighted-color':'#c9ebff',
	'--cell-selected-color': '#ffde8c',
	'--correct-guess-color': '#295bff',
    '--text-color': 'black',
    '--clue-background': 'none',
    '--cell-black-color': 'black',
    '--clue-background-image': 'none',
    '--main-background-image': 'none'
}

const dark_theme =  {	
	'--main-background-color': '#261c50',
	'--bar-color': '#da4694',
	'--cell-border-color': '#ed31a0',
	'--cell-background-color': '#1f126e',
	'--cell-highlighted-color':'#72dbe8',
	'--cell-selected-color': '#2aa8fa',
	'--correct-guess-color': '#e16b81',
    '--text-color': '#f5cd2e',
    '--clue-background': 'rgba(0,0,0,0.5)',
    '--cell-black-color': 'none',
    '--clue-background-image': 'linear-gradient(#14115e, #3c2a5c,#3c2a5c)',
    '--main-background-image': 'linear-gradient( #0f0f51, #672ed9, #fa5bde)'
}

function updateTitleAuthor(title, author) {
    if (titleText == undefined) {
        titleText = document.createElement("div");
        titleText.className = "title";
        bar.appendChild(titleText);
    }

    titleText.innerText = title + " by " + author;
}


function toggleDarkMode() {
    let theme = light_on ? dark_theme : light_theme;
    light_on = !light_on;
    for (let k in theme) {
        document.documentElement.style.setProperty(k, theme[k]);
    }

}


function makeShittyValidate() {
    validateButton = document.createElement("div");
    validateButton.onclick = validateWordStrict;
    validateButton.className = "menu-icon"
    validateButton.style.backgroundImage = "url(./graphics/validate.svg)";
    bar.appendChild(validateButton);
}

function makeShittyClear() {
    resetButton = document.createElement("div");
    resetButton.onclick = clearGrid;
    resetButton.className = "menu-icon"
    resetButton.style.backgroundImage = "url(./graphics/clear.svg)";
    bar.appendChild(resetButton);
}


function makeShittyClearLocal() {
    resetLocalButton = document.createElement("div");
    resetLocalButton.onclick = function() {localStorage.clear()};
    resetLocalButton.style.backgroundImage = "url(./graphics/garbage.svg)"
    resetLocalButton.className = "menu-icon";
    bar.appendChild(resetLocalButton);
}
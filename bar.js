const bar = document.getElementById("nav-bar");
let titleText;
let collapseWidth = '65px';
let fullWidth = '250px';
let drublink = 'https://djghosh13.github.io/druboard/creator/';

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
    '--main-background-image': 'none',
    '--dummy-color': '#f0f0f0'
};

const disco_theme =  {	
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
    '--main-background-image': 'linear-gradient( #0f0f51, #672ed9, #fa5bde)',
    '--dummy-color': '#242d5f'
};

function updateTitleAuthor(title, author) {
    if (titleText == undefined) {
        titleText = document.createElement("div");
        titleText.className = "title";
        bar.appendChild(titleText);
    }
    titleText.onclick = toggleDarkMode;
    titleText.innerText = title + " by " + author;
}


function toggleDarkMode() {
    let theme = user.lightOn ? disco_theme : light_theme;
    user.lightOn = !user.lightOn;
    for (let k in theme) {
        document.documentElement.style.setProperty(k, theme[k]);
    }

}

function addButton(className, f, elem, graphic) {
    let b = document.createElement("div");
    b.onclick = f;
    b.className = className;
    b.style.backgroundImage = graphic;
    elem.appendChild(b);
    return b;
}

function res(filename) {
    return  `url(./res/${filename})`
}

function makeSideBar() {
    let sb = document.getElementById("side-bar");
    document.documentElement.style.setProperty("--bar-width", collapseWidth);
    return;
    sb.onmouseover = function () {document.documentElement.style.setProperty("--bar-width", fullWidth)};
    sb.onmouseleave = function() {document.documentElement.style.setProperty("--bar-width", collapseWidth)};
}
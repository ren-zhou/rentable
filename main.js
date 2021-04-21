let puzzle;
let user;
user = User.loadUser();
puzzle = Puzzle.importTable(user.currentPuzzle);

puzzle.render();
document.addEventListener("keydown", keyInput);
window.addEventListener("beforeunload", function() {user.save()});
setUpInput();
addButton("menu-icon", validateWordStrict, bar, "url(./res/validate.svg)");
addButton("menu-icon", puzzle.clearGrid, bar, "url(./res/clear.svg)");
addButton("menu-icon", puzzle.hardClear, bar, res("garbage.svg"));
makeSideBar();
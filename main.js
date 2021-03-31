let puzzle;
let user;
user = User.loadUser();
puzzle = Puzzle.importTable(user.currentPuzzle);

puzzle.render();
document.addEventListener("keydown", keyInput);
window.addEventListener("beforeunload", function() {user.save()});
setUpInput();
makeShittyValidate();
makeShittyClear();
makeShittyClearLocal();

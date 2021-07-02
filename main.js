var puzzle;
var user;
newUser();
document.addEventListener("keydown", keyInput);
window.addEventListener("beforeunload", function() {user.save()});
setUpInput();

document.addEventListener("click", (e) => {if (!document.getElementById('side-bar').contains(e.target)){collapseBar()}});
document.querySelector("a[data-action=download-puzzle]").addEventListener("click", Puzzle.download);
document.querySelector("a[data-action=download-user]").addEventListener("click", User.download);
document.querySelector("a[data-action=search]").addEventListener("click", toggleBar);
document.querySelector("span[data-action=erase").addEventListener("click", puzzle.clearGrid);
document.querySelector("span[data-action=validate").addEventListener("click", validateWordStrict);
document.querySelector("span[data-action=delete-user").addEventListener("click", puzzle.hardClear);

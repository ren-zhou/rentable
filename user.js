// const DEFAULT_PUZZLE = Puzzle.importPuzzle('*eyJtZXRhZGF0YSI6eyJ2YWxpZCI6dHJ1ZSwidGl0bGUiOiJSb3kgU3Vja3MiLCJhdXRob3IiOiJSb3kifSwiZGltZW5zaW9ucyI6WzMsNF0sImFuc3dlcnMiOltbIlIiLCJPIiwiWSJdLFtudWxsLCJJIiwiUyJdLFsiUyIsIk8iLG51bGxdLFsiQiIsIkEiLCJEIl1dLCJjbHVlcyI6eyJhY3Jvc3MiOlsiUm95IiwiSXMiLCJTbyIsIkJhZCJdLCJkb3duIjpbIk9pb2EiLCJZcyIsIlNiIl19fQ');
const DEFAULT_PUZZLE = Puzzle.importPuzzle('*eyJtZXRhZGF0YSI6eyJzdHlsZSI6Im5ldy15b3JrZXIiLCJ2YWxpZCI6ZmFsc2UsInRpdGxlIjoidGVzdGVyIiwiYXV0aG9yIjoidGVzdCJ9LCJkaW1lbnNpb25zIjpbNSw3XSwiYW5zd2VycyI6W1siQSIsIkIiLCJDIiwiRCIsIkUiXSxbIkYiLCJHIiwiSCIsIkkiLCJKIl0sWyJBIiwiSyIsIkwiLCJNIiwiQiJdLFsiTiIsIk8iLCJQIiwiUSIsIlIiXSxbIlMiLCJUIiwiVSIsIlYiLCJXIl0sWyJYIiwiWSIsIloiLCJBIiwiQyJdLFsiQiIsIkMiLCJEIiwiRSIsIkQiXV0sImJvcmRlci14IjpbWzAsMCwwLDBdLFswLDEsMCwwXSxbMSwwLDAsMV0sWzAsMCwxLDBdLFswLDEsMCwwXSxbMCwwLDAsMV0sWzAsMCwwLDFdXSwiYm9yZGVyLXkiOltbMSwxLDAsMCwwXSxbMCwxLDEsMCwwXSxbMCwwLDAsMSwwXSxbMCwxLDAsMCwxXSxbMCwwLDAsMCwwXSxbMCwwLDEsMCwwXV0sImNsdWVzIjp7ImFjcm9zcyI6W10sImRvd24iOltdfX0=')
class User {
    static blockSave = false;
    constructor(puzzles=[], lightOn=true, currPuzz=DEFAULT_PUZZLE.toRXF()) {
        this.puzzles = puzzles;
        this.lightOn = lightOn;
        this.currentPuzzle = currPuzz;
    }

    save() {
        if (User.blockSave) return;
        this.currentPuzzle = puzzle.toRXF();
        localStorage.setItem("user", JSON.stringify(this));
        console.log(JSON.parse(localStorage.getItem('user')))
    }

    static loadUser() {
        user = window.localStorage.getItem("user");
        if (user == null) {
            return new User();
        }
        user = JSON.parse(user);
        user = new User(user.puzzles, user.lightOn, user.currentPuzzle);
        if (!user.lightOn) {
            user.lightOn = true;
            toggleDarkMode();
        }
        return user;
    }
}

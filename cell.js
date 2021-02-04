
class Cell {
    constructor(n, x, y) {
        this.letter = n;
        this.correct = False;
        this.guess = '';
        this.x = x;
        this.y = y;
    }

    guess(n) {
        this.guess = n
        if (n == this.letter) {
            this.correct = True;
        }
    }
}
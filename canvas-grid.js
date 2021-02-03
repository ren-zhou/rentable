var cellWidth = 15;
var cellHeight = 15;

var cell_px = 40;

var padding = 0;

var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

function drawGrid() {
    //draw the basic lines
    for (var x = 1; x <= cellWidth; x++) {
        context.moveTo(0.5 + x * cell_px + padding, padding);
        context.lineTo(0.5 + x * cell_px + padding, cellHeight * cell_px + padding);
    }

    for (var x = 1; x <= cellHeight; x++) {
        context.moveTo(padding, 0.5 + x * cell_px + padding);
        context.lineTo(cellWidth * cell_px, 0.5 + x * cell_px + padding);
    }

    context.strokeStyle = "black";
    context.stroke();
}

/**
 * fills in black squares 
 * coords is a list of lists with the index i representing a row and
 *  the list containing the filled in columns of that row
 */

function fillSquares(coords) {
    if (coords.length != cellHeight) {
        //do something?? something has gone wrong
        console.log("oh no why is coords wrong");
    }

    for (var i = 0; i < coords.length; i++) {
        for(var j = 0; j < coords[i].length; j++) {
            context.fillRect(coords[i][j] * cell_px, i * cell_px, cell_px, cell_px);
        }
        // context.fillRect(coords[i][0], coords[i][1], cell_px, cell_px);
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
}

function highlightCell(x,y) {

}

function 



canvas.addEventListener('mouseup', function(e) {
    console.log("uhh");
    getCursorPosition(canvas, e);
})




drawGrid();
fillSquares([
    [6],
    [2,4,6],
    [4,3]
])

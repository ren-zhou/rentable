function updateEyes(e) {
    let roybox = document.getElementById('roybox')
    let boxW = roybox.clientWidth;
    let boxH = roybox.clientHeight;
    let offsetX = e.pageX - (roybox.offsetLeft + boxW/2)
    let offsetY = e.pageY - (roybox.offsetTop + boxH/2)
    
    applyOffset(document.getElementById('eye-left'), offsetX, offsetY, boxW/5);
    applyOffset(document.getElementById('eye-right'), offsetX, offsetY, -boxW/5);
}

function applyOffset(eye, offx, offy, adj) {
    offx += adj
    const boundX = 5;
    const boundY = 3;
    let mag = Math.sqrt(Math.pow(offx, 2) + Math.pow(offy, 2))

    let x = offx/mag * boundX;
    let y = offy/mag * boundY;

    eye.style.transform = `translateX(${x}%) translateY(${y}%)`
}

function toggleRoy() {
    let rb = document.getElementById('roybox');
    rb.style.display = rb.style.display != 'block' ? 'block' : 'none';
}

document.addEventListener('mousemove', updateEyes);

document.getElementById('rt-icon').ondblclick = toggleRoy;


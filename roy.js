function updateEyes(e) {
    let roybox = document.getElementById('roybox');
    let boxW = roybox.clientWidth;
    let boxH = roybox.clientHeight;
    let offsetX = (e.clientX - roybox.offsetLeft) / boxW;
    let offsetY = (e.clientY - roybox.offsetTop) / boxH;
    
    // Special crossed eyes behavior?
    // let crossed = Math.hypot(offsetX - 0.5061, 0.1 * (offsetY - 0.4376));
    // distanceZ = 0.05 + 0.25 * 0.5 * (Math.tanh(4 * (crossed - 0.05)) + 1);

    // Or constant Z distance
    distanceZ = 0.25;
    applyOffset(document.getElementById('eye-left'), offsetX - 0.2938, offsetY - 0.4426, distanceZ);
    applyOffset(document.getElementById('eye-right'), offsetX - 0.7184, offsetY - 0.4326, distanceZ);
}

function applyOffset(eye, offx, offy, offz) {
    let theta = Math.atan2(offy, offx);
    let phi = Math.atan2(Math.hypot(offx, offy), offz);

    let x = 5 * Math.atanh(Math.sin(phi) * Math.cos(theta) * 0.76);
    let y = 3.5 * Math.atanh(Math.sin(phi) * Math.sin(theta) * 0.76);

    eye.style.transform = `translateX(${x}%) translateY(${y}%)`;
}

document.addEventListener('mousemove', updateEyes);

document.getElementById('rt-icon').ondblclick = () => {document.getElementById('roybox').style.display = 'block';}
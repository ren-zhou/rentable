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
    adjuster = (eye) => {adjustDelay(eye, offsetX, offsetY, distanceZ, boxW, boxH)};
    adjuster(document.getElementById('eye-left'));
    adjuster(document.getElementById('eye-right'));
}

function applyOffset(eye, offx, offy, offz) {
    let theta = Math.atan2(offy, offx);
    let phi = Math.atan2(Math.hypot(offx, offy), offz);
    
    let x = 5 * Math.atanh(Math.sin(phi) * Math.cos(theta) * 0.76);
    let y = 3.7 * Math.atanh(Math.sin(phi) * Math.sin(theta) * 0.76);
    
    eye.style.transform = `translateX(${x}%) translateY(${y}%)`;
}

function adjustDelay(eye, x, y, z, boxW, boxH) {
    let mag = Math.hypot(x, y, z);
    let total = Math.max(window.innerHeight / boxH, window.innerWidth / boxW);

    let delay = Math.max(.3, Math.log(mag/total * 10)*5)
    eye.style.transitionDelay = `${delay}ms`;
}

function toggleRoy() {
    document.addEventListener('mousemove', updateEyes);
    let rb = document.getElementById('roybox');
    rb.style.display = rb.style.display != 'block' ? 'block' : 'none';
    if (rb.style.display == 'none') {
        document.removeEventListener('mousemove');
    }
}

function flinch() {
    document.getElementById('eye-left').src = "res/roy/eye_left_flinch.svg";
    document.getElementById('eye-right').src = "res/roy/eye_right_flinch.svg";
    document.getElementById('vectoroy').src = "res/roy/vectoroy_flinch.svg";
}

function unFlinch() {
    document.getElementById('eye-left').src = "res/roy/eye_left.svg";
    document.getElementById('eye-right').src = "res/roy/eye_right.svg";
    document.getElementById('vectoroy').src = "res/roy/vectoroy.svg";
}

document.getElementById('roybox').onmousedown = flinch;
document.getElementById('roybox').onmouseup = unFlinch;
document.getElementById('roybox').onmouseleave = unFlinch;

document.getElementById('rt-icon').ondblclick = toggleRoy;


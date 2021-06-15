function removeChildren(parent) {
    parent.innerHTML = "";
}

//calculate how much memory of localstorage is being used
function calcLocalSize() {
    let total = 0;
    for (let item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            total += ((localStorage[item].length + item.length) * 2);
        }
    }
    console.log("Total = " + (total / 1024).toFixed(2) + " KB");
}


async function digestMessage(message) {
  let encoder = new TextEncoder();
  let data = encoder.encode(message);
  let hash = await crypto.subtle.digest('SHA-256', data);
  return hash;
}

async function hash(exf) {
    
    let enc = new TextDecoder();

    let digestBuffer = await digestMessage(exf);
    console.log(buf2hex(digestBuffer));
}



function buf2hex(buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }
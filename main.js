// loadFromString(`{"x": 15, "y": 15, "format": "b_d_d_.ad_d_d___._._.d._._._..a_____________._._._._._._...da____d_._._.d.__...a__._._.ad_ad_____.a_____.._..........._..ad_d_d.bdd___db__._._.a__...__._._._.a___d___..._._._._._._.ad____________.._._._._._._._a_______.a_____", "acrossClues": ["I", "have", "made", "some", "progress", "on", "this"], "downClues": ["I", "seriously", "need", "a", "better", "format", "to", "input", "clues", ",", "dude"]}`);
// loadFile();
let exf = "*W3sidmFsaWQiOmZhbHNlLCJ0aXRsZSI6IlRpdGxlIiwiYXV0aG9yIjoiQXV0aG9yIn0sWzMsM10sIjBBQUIwQkNDQyIsWyJhYSIsImNjYyJdLFsiYWJjIiwiYmMiXV0=";
if (localStorage.getItem("source") != null) {
    loadEXF(localStorage.getItem("source"));
} else {
    loadEXF(exf);
    
}
generate();
setUpInput();
makeShittyValidate();
makeShittyClear();
makeShittyClearLocal();
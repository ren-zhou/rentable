// loadFromString(`{"x": 15, "y": 15, "format": "b_d_d_.ad_d_d___._._.d._._._..a_____________._._._._._._...da____d_._._.d.__...a__._._.ad_ad_____.a_____.._..........._..ad_d_d.bdd___db__._._.a__...__._._._.a___d___..._._._._._._.ad____________.._._._._._._._a_______.a_____", "acrossClues": ["I", "have", "made", "some", "progress", "on", "this"], "downClues": ["I", "seriously", "need", "a", "better", "format", "to", "input", "clues", ",", "dude"]}`);
// loadFile();
let exf = "*W3sidmFsaWQiOnRydWUsInRpdGxlIjoiQ3Jvc3N3b3JkIENyb3Nzd29yZCIsImF1dGhvciI6IlJveSJ9LFs1LDVdLCIwMExCTDBNT09OTE9HT1NFRElUMFRFTjAwIixbIkxpZ2h0YnVsYiBsaWdodCBzaGVkcyB0byByZXZlYWwgRGhydWIncyB1bmNoZWNrZWQgZW1haWwuIiwiRGhydWIncyBnaWZ0OiB0YWtlIG9mZiB5b3VyIHBhbnRzIGFuZCB1bmRlcndlYXIgYSBiaXQuIiwiRGhydWIgYW5kIFJveSdzIHJlY2VudCBjcmVhdGlvbnMgYXBwZWFsIHRvIHJlYXNvbi4iLCJJJ2QgZmxpcCBpbiBhIHNjaS1maSBmaWxtIHRvIGNoYW5nZS4iLCJDb21tb24gYmFzZSBmb3IgYSB0aGlyZCBvZiBoYWxmIG9mIGNvbW11bmljYXRpb24uIl0sWyJNaXN0YWtlbiBsb3ZlIHN1cnJvdW5kcyBvcmlnaW5hbCBSZW5UYWJsZSBob3BlLiIsIkxvWiBnYW1lIGVuZGluZyBmaXJzdCBiYXRjaCB0byBzdGFydC4iLCJTbG9wcGlseS13cml0dGVuIGNvbGxlZ2UgZm9yIG5hdHVyYWwgb3BlcmF0aW9ucz8iLCJNb3N0IGNvbW1vbiBEcnVib2FyZCBmZWF0dXJlLiIsIkFsbG93IGxpbWl0ZWQgZGVjbGFyYXRpb24uIl1d";
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
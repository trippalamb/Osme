const Language = require("./app/Language.js");
const fs = require("fs");

var code = fs.readFileSync("./examples/IfStatement_1.osme", "utf8").trim();
var osme = new Language("osme");

//var jsCode = osme.compile(code, "js");
osme.code = code;
var results = osme.eval();

//console.log(jsCode);
console.log(JSON.stringify(results, null, 2));
console.log("finished");
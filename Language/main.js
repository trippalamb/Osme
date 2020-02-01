const Language = require("./app/Language.js");

//var code = "x = 3 + 4 + 5 - 6";
var code = "x = 3 + 4 + 5";
var osme = new Language("osme");

var jsCode = osme.compile(code, "js");
var results = osme.eval();

console.log(jsCode);
console.log(JSON.stringify(results, null, 2));
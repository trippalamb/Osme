const Language = require("./app/Language.js");

//var code = "x = 2.1 + 3.4";
//var code = "x = <2.0,4.3,5.0>";
var code = "x = <2.0,4.3,5.0>\ny = 2.3 - 6.2";
var osme = new Language("osme");

var tokens = osme.lexer.run(code);
console.log(JSON.stringify(tokens, null, 2));
//var jsCode = osme.compile(code, "js");
//osme.code = code;
//var results = osme.eval();

//console.log(jsCode);
//console.log(JSON.stringify(results, null, 2));
console.log("finished");
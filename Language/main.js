const Language = require("./app/Language.js");

//var code = "x = 2.1 + 3.4";
//var code = "x = <2.0,4.3,5.0>";
var code = "real :: x\n";
code += "real :: y\n";
code += "x = 2.1 + 3.2\n";
code += "y = x + 4.5";

var osme = new Language("osme");

//var jsCode = osme.compile(code, "js");
osme.code = code;
var results = osme.eval();

//console.log(jsCode);
console.log(JSON.stringify(results, null, 2));
console.log("finished");
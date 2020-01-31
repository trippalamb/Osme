const Language = require("./app/Language.js");
const Program = require("./app/ActionTree/Program.js");

//var code = "x = 3 + 4 + 5 - 6";
var code = "x = 3 + 4 + 5";
var osme = new Language("osme");

var tokens = osme.lex(code);
//console.log(JSON.stringify(tokens, null, 2));

var ast = osme.parse(tokens);
//console.log(JSON.stringify(ast, null, 2));

var program = new Program(ast);
//console.log(JSON.stringify(program, null, 2));

var jsCode = program.compileTo("js");
jsCode += "console.log(x);\r\n";
//console.log(jsCode);

program.eval();

program.vm.printDict();

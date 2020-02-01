const Lexer = require("./Lexer.js");
const Parser = require("./Parser.js");
const Assembler = require("./Assembler.js");
const Compiler = require("./Compiler.js");

class Language{
    constructor(name){

        this.name = name;

        var operators = {};
        if(name === "osme"){
            operators.add = "+";
            operators.subtract = "-";
            operators.assignment = "=";

            operators.list = [];
            operators.list.push(operators.add);
            operators.list.push(operators.subtract);
            operators.list.push(operators.assignment);
        }

        this.lexer = new Lexer(operators);
        this.parser = new Parser();
        this.assembler = new Assembler();
        this.compiler = new Compiler();

    }

    compile(code, lang) {
        this.tokens = this.lex(code);
        this.ast = this.parse(this.tokens);
        this.program = this.assemble(this.ast);
        this.compiledCode = this.compileTo(this.program, lang);
        return this.compiledCode;
    }

    lex(code){
        this.code = code;
        return this.lexer.run(code);
    }

    parse(tokens){
        return this.parser.run(tokens);
    }

    assemble(ast) {
        return this.assembler.build(ast);
    }

    compileTo(program, lang) {
        return this.compiler.compile(program).to(lang);
    }

    eval(program) {

        if (typeof (program) === "undefined") {
            if (typeof (this.program) === "undefined") {
                this.tokens = this.lex(code);
                this.ast = this.parse(this.tokens);
                this.program = this.assemble(this.ast);
            }
            return this.program.eval();
        }
        else {
            return program.eval();
        }
    }

}

module.exports = Language

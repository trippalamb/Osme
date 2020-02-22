const OpList = require("./OperatorList.js");

const Lexer = require("./Lexer.js");
const Parser = require("./Parser/Parser.js/index.js");
const Assembler = require("./Assembler.js");
const Compiler = require("./Compiler.js");

class Language{
    constructor(name){

        this.name = name;

        var operators = new OpList("osme");

        this.lexer = new Lexer(operators);
        this.parser = new Parser();
        this.assembler = new Assembler();
        this.compiler = new Compiler();

    }

    compile(code, lang) {
        this.tokens = this.lex(code);
        //console.log(JSON.stringify(this.tokens, null, 2));
        this.ast = this.parse(this.tokens);
        //console.log(JSON.stringify(this.ast, null, 2));
        this.program = this.assemble(this.ast);
        //console.log(JSON.stringify(this.program.vm.dictionary, null, 2));
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

    //TODO: this logic isn't quite right
    eval(program) {

        if (typeof (program) === "undefined") {
            if (typeof (this.program) === "undefined") {
                this.tokens = this.lex(this.code);
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

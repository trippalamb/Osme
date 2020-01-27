const Lexer = require("./Lexer.js");
const Parser = require("./Parser.js");

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

    }

    lex(code){
        return this.lexer.run(code);
    }

    parse(tokens){
        return this.parser.run(tokens);
    }

}

module.exports = Language

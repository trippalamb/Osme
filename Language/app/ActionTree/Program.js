const Statement = require("./Statement.js");

class Program{
    constructor(ast){
        this.statements = [];
        for(var i = 0; i < ast.statements.length; i++){
            this.statements.push(new Statement(ast.statements[i]));
        }

    }

    compileTo(lang){

        switch(lang){
            case "js":
                return this.compileToJS();
            default:
                throw new Error("language is not supported.");
        }

    }

    compileToJS(){

        var str = "";
        for(var i = 0; i <this.statements.length; i++){
            str += this.statements[i].compileToJS() + ";\r\n";
        }

        return str;

    }

}
module.exports = Program;

var Types = {};
Types.assignment = require("./Assignment.js");
Types.declaration = require("./Declaration.js");

class Statement{
    constructor(astStatement) {

        if (typeof (Types[astStatement.type]) === "undefined") {
            throw new Error("The assignment type [" + astStatement.type + "] is not yet supported");
        }

        this.content = new Types[astStatement.type](astStatement);

    }

    compileToJS(){

        return this.content.compileToJS();

    }

    eval(vm) {
        this.content.eval(vm);
    }

}

module.exports = Statement;

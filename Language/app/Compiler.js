const Program = require("./ActionTree/Program.js");

class Compiler{
    constructor() {

    }

    compile(program) {
        this.program = program;
        return this;
    }

    to(language) {

        switch (language) {
            case "js":
                return this.program.compileToJS();
            default:
                throw new Error("language is not supported.");
        }

    }

}

module.exports = Compiler;
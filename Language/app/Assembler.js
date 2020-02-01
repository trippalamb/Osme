const Program = require("./ActionTree/Program.js");
class Assembler{
    constructor(ast){
       
    }

    build(ast) {
        return new Program(ast);
    }

    
   
}
module.exports = Assembler;

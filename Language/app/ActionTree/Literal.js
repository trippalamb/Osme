const Real = require("./Types/Real.js");
const Imaginary = require("./Types/Imaginary.js");

class Literal{
    
    constructor(astLiteral) {
        switch (astLiteral.subsub) {
            case ("real"):
                this.type = new Real(astLiteral.val);
                break;
            case ("imaginary"):
                this.type = new Imaginary(astLiteral.val);
                break;
            default:
                throw new Error("Literal type not supported");

        }
    }

    compileToJS(){
        return this.type.compileToJS();
    }

}

module.exports = Literal;

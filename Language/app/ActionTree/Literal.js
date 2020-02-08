const Types = require("./Types/Types.js");

class Literal{
    
    constructor(astLiteral) {
        switch (astLiteral.name) {
            case ("real"):
                this.type = new Types.Real(astLiteral.val);
                break;
            case ("imaginary"):
                this.type = new Types.Imaginary(astLiteral.val);
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

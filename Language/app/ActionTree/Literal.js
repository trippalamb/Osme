const Types = require("./Types/Types.js");

class Literal{
    
    constructor(astLiteral) {
        switch (astLiteral.name) {
            case ("variable"):
                this.val = 0;
                break;
            case ("real"):
                this.val = new Types.Real(astLiteral.val);
                break;
            case ("imaginary"):
                this.val = new Types.Imaginary(astLiteral.val);
                break;
            default:
                throw new Error("Literal type not supported");

        }
    }

    compileToJS(){
        return this.val.compileToJS();
    }

}

module.exports = Literal;

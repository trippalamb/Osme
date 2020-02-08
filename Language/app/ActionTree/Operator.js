const MathOps = require("./Operators/MathOperators.js");
const Assignment = require("./Operators/Assignment.js");

class Operator{
    constructor(astOp){
        if(astOp.val === "="){
            this.type = new Assignment();
        }
        else if (astOp.val === "+"){
            this.type = new MathOps.Add();
        }
        else if (astOp.val === "-"){
            this.type = new MathOps.Subtract();
        }
        else if (astOp.val === "*"){
            this.type = new MathOps.Multiply();
        }
        else{
            throw new Error("operator symbol is not supported");
        }
    }

    getFxnName(){
        return this.type.type;
    }

    compileToJS(){
        return this.type.symbol;
    }

}

module.exports = Operator;

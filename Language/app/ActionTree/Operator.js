const Add = require("./Operators/Add.js");
const Subtract = require("./Operators/Subtract.js");
const Assignment = require("./Operators/Assignment.js");

class Operator{
    constructor(astOp){
        if(astOp.val === "="){
            this.type = new Assignment();
        }
        else if (astOp.val === "+"){
            this.type = new Add();
        }
        else if (astOp.val === "-"){
            this.type = new Subtract();
        }
        else{
            throw new Error("operator symbol is not supported");
        }
    }

    compileToJS(){
        return this.type.symbol;
    }

}

module.exports = Operator;

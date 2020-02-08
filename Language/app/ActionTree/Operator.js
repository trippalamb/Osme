const MathOps = require("./Operators/MathOperators.js");
const Assignment = require("./Operators/Assignment.js");

class Operator{

    constructor() {

    }

    static create(astOp) {

        switch (astOp.name) {

            case "assign":
                return new Assignment();
            case "add":
                return new MathOps.Add();
            case "subtract":
                return new MathOps.Subtract();
            case "multiply":
                return new MathOps.Multiply();
            case "divide":
                return new MathOps.Divide();
            case "power":
                return new MathOps.Power();
            case "root":
                return new MathOps.Root();
            default:
                throw new Error("operator name [" + astOp.name + "] is not supported");
        }
    }

}

module.exports = Operator;

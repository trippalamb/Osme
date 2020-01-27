const Variable = require("./Variable.js");
const Operator = require("./Operator.js");
const Expression = require("./Expression.js");

class Assignment{
    constructor(astStatement){
        this.variable = new Variable(astStatement.left.token);
        this.operator = new Operator(astStatement.token);
        this.expression = new Expression(astStatement.right);
    }

    compileToJS(){

        return this.variable.compileToJS() + " " + 
            this.operator.compileToJS() + " " + 
            this.expression.compileToJS();

    }

}

module.exports = Assignment;
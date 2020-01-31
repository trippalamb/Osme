const Operator = require("./Operator.js");
const Literal = require("./Literal.js");
const Variable = require("./Variable.js");

class Expression{
    constructor(astExpression){

        if(astExpression.type === "literal"){
            this.type = "literal";
            this.left = new Literal(astExpression.token);
        }
        else if(astExpression.type === "variable"){
            this.type = "variable";
            this.left = new Variable(astExpression.token);
        }
        else if(astExpression.type === "expression"){
            this.type = "expression";
            this.left = new Expression(astExpression.left);
            this.right = new Expression(astExpression.right);
            this.operator = new Operator(astExpression.token);
        }
        else{
            throw new Error("invalid token when parsing expression.");
        }

    }

    eval(){
        if(this.type === "literal"){
            
            return this.left.type;
        }
        else if(this.type === "variable"){
            return this.left.type;
        }
        else if(this.type === "expression"){
            return this.left.eval()[this.operator.getFxnName()](this.right.eval());
        }
        else{
            throw new Error("Error in expression evaluation.");
        }
    }

    compileToJS(){

        var str = this.left.compileToJS();
        if(typeof(this.operator) !== "undefined"){
            str += " " + this.operator.compileToJS();
            str += " " + this.right.compileToJS();
        }

        return str;

    }

}

module.exports = Expression;

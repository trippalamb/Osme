const Operator = require("./Operator.js");
const Literal = require("./Literal.js");
const Variable = require("./Variable.js");

class Expression{
    constructor(astExpression){

        if(astExpression.type === "literal"){
            this.type = "literal";
            this.left = new Literal(astExpression.token);
        }
        else if(astExpression.type === "word"){
            this.type = "variable";
            this.left = new Variable(astExpression.token);
        }
        else if(astExpression.type === "expression"){
            this.type = "expression";
            this.left = new Expression(astExpression.left);
            this.right = new Expression(astExpression.right);
            this.operator = Operator.create(astExpression.token);
        }
        else{
            throw new Error("invalid token when parsing expression.");
        }

    }

    eval(vm){
        if(this.type === "literal"){
            
            return this.left.val;
        }
        else if(this.type === "variable"){
            return vm.dictionary[this.left.name].val;
        }
        else if(this.type === "expression"){
            var left = this.left.eval(vm);
            var right = this.right.eval(vm);
            return left[this.operator.fxn](right);

            //return this.left.eval()[this.operator.fxn](this.right.eval());
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

//#TODO: still need to add boolean expressions
//<b-expression> ::= <b-term> [<orop> <b-term>]*
//<b-term>       ::= <not-factor> [AND <not-factor>]*
//<not-factor>   ::= [NOT] <b-factor>
//<b-factor>     ::= <b-literal> | <b-variable> | <relation>
//<relation>     ::= | <expression> [<relop> <expression]

//GOALS:
//<expression>   ::= <term> [<addop> <term>]*
//<term>         ::= <factor> [<mulop> <factor>]*
//<factor>       ::= <expFactor> [<expOp> <expFactor>]*
//<expFactor>    ::= <number> | <variable> | (<expression>)

//#TODO: auto-generate these from the operator types
var addOps = ['add', 'subtract'];
var mulOps = ['multiply', 'divide'];
var expOps = ['power', 'root'];
var lastSize = 0;

//#TODO: replace operator characters with operator names and use the `token:name`'s field

//this class represents an expression (ex. 2.0 * (3.0 + 4.0)**5.0)
class ExpressionParser {

    static create(tokens) {

        var node = {};

        var i = findNextOps(tokens, addOps);

        if (i !== -1) {
            node.type = "expression";
            node.left = Term.create(tokens.splice(0, i));
            node.token = tokens.shift();
            node.right = Term.create(tokens.splice(0));
        }
        else if (tokens.length === 1) {
            node = singleTokenLogic(tokens.shift())
        }
        else {
            node = Term.create(tokens);
        }
            

        return node;

        
    }
}
module.exports = ExpressionParser;


function singleTokenLogic(token){

    var node = {};

    if(checkForParentheses()){
        node = ExpressionParser.create(token.val);
    }
    else{
        node.token = token;
        node.type = token.type;
    }

    return node;

    function checkForParentheses() {
        return (typeof(token.name) !== "undefined" && 
                token.name === "sub-exp");
    }
}

//this local class represents a term expression (ex. 2.0 + 3.0)
class Term {

    static create(tokens) {

        var node = {};
        var i = findNextOps(tokens, mulOps);

        if (i !== -1) {
            node.type = "expression";
            node.left = Factor.create(tokens.splice(0, i));
            node.token = tokens.shift();
            node.right = Factor.create(tokens.splice(0));
        }
        else {
            node = Factor.create(tokens);
        }

        return node;

    }
}

//this local class represents an factor expression (ex. 2.0 * 3.0)
class Factor {

    static create(tokens) {

        var node = {};

        var i = findNextOps(tokens, expOps);

        if (i !== -1) {
            node.type = "expression";
            node.left = ExpFactor.create(tokens.splice(0, i));
            node.token = tokens.shift();
            node.right = ExpFactor.create(tokens.splice(0));
        }
        else {
            node = ExpressionParser.create(tokens);
        }

        return node;

    }
}

//this local class represents an exponential factor expression (ex. 2.0**3.0)
class ExpFactor {

    static create(tokens) {

        var node = {};

        node = ExpressionParser.create(tokens);

        return node;
    }
}



//find the next operator index working from the end of the token list
//@tokens: list of tokens
//@ops: list of operators to check for
function findNextOps(tokens, ops) {

    var i = tokens.length - 1;

    while (i > 0) {

        //check to see if the current token matches an operator from the operator list
        for (const op of ops) {
            if (tokens[i].name === op) {
                return i;
            }
        }

        i--;
    }

    return -1;
}



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
var addOps = ['+', '-'];
var mulOps = ['*', '/'];
var expOps = ['**', '//'];

//#TODO: replace operator characters with operator names and use the `token:name`'s field

//this class represents an expression (ex. 2.0 * (3.0 + 4.0)**5.0)
class ExpressionNode {

    static create(tokens) {

        var node = {};

        checkForParentheses();

        var i = findNextOps(tokens, addOps);

        if (i !== -1) {
            node.type = "expression";
            node.left = Term.create(tokens.splice(0, i));
            node.token = tokens.shift();
            node.right = Term.create(tokens.splice(0));
        }
        else if (tokens.length === 1) {
            node.token = tokens.shift();
            node.type = "literal";
        }
        else {
            node = Term.create(tokens);
        }

        return node;

        function checkForParentheses() {
            if (tokens[0].val === "(" && tokens[tokens.length - 1].val === ")") {
                tokens.shift();
                tokens.pop();
            }
        }
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
        else if (tokens.length === 1) {
            node.token = tokens.shift();
            node.type = "literal";
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
        else if (tokens.length === 1) {
            node.token = tokens.shift();
            node.type = "literal";
        }
        else {
            node = ExpressionNode.create(tokens);
        }

        return node;

    }
}

//this local class represents an exponential factor expression (ex. 2.0**3.0)
class ExpFactor {

    static create(tokens) {

        var node = {};

        if (tokens.length === 1) {
            node.token = tokens.shift();
            node.type = "literal";
        }
        else {
            node = ExpressionNode.create(tokens);
        }

        return node;
    }
}

module.exports = ExpressionNode;

//finds the index of the end of the token enclosure
//this function takes into account if token enclosure is nested
//@tokens: list of tokens
//@startVal: the value that starts the new token enclosure
//@endVal: the value that ends the new token enclosure
function findMatchingIndex(tokens, startVal, endVal) {

    var i = 1;

    while (i < tokens.length) {
        if (tokens[i].val === startVal) {
            i += findMatchingIndex(tokens.slice(i), startVal, endVal);
        }
        else if (tokens[i].val === endVal) {
            return i;
        }
        else {
            i++;
        }
    }

    throw new Error("Missing closing '" + endChar + "'");
}

//find the next operator index working from the end of the token list
//@tokens: list of tokens
//@ops: list of operators to check for
function findNextOps(tokens, ops) {

    var i = tokens.length - 1;

    while (i > 0) {

        if (tokens[i].val === ')') {
            //reverses so that findMatchingIndex() doesn't have to be written backwards
            //additionally note that ')' and '(' are reversed from what you might expect
            i -= findMatchingIndex(tokens.slice(0, i + 1).reverse(), ')', '(');
        }
        else {
            //check to see if the current token matches an operator from the operator list
            for (const op of ops) {
                if (tokens[i].val === op) {
                    return i;
                }
            }
        }

        i--;
    }

    return -1;
}



const ExpressionParser = require("./ExpressionParser.js");
const TokenNester = require("./TokenNester.js");

class Parser {
    constructor(TokenDictionary) {
        this.tree = {};
        this.tree.language = "osme";
        this.tree.statements = [];
        this.tokens = [];
        this.nestedTokens = [];
        this.containerTokens = TokenDictionary.containerTokens;
    }

    run(tokens) {

        this.tokens = [...tokens];
        this.tokens = TokenNester.nest(this.tokens, this.containerTokens);

        while (this.tokens.length > 0) {

            if (this.tokens[0].type === "word") {
                this.tree.statements.push(this.wordLogic());
                            }
            else if (this.tokens[0].type === "container") {
                this.tree.statements.push(this.containerLogic());
            }
            else {
                throw new Error("all instructions currently must start with a word.");
            }

            if (typeof (this.tokens[0]) !== "undefined" && this.tokens[0].name === "newline") {
                this.tokens.shift();
            }


        }

        return this.tree;
    }

    wordLogic() {

        if (this.tokens.length > 0) {
            if (this.tokens[1].sub === "assignment") {
                return this.createAssignmentNode();
            }
            else if (this.tokens[1].name === "instance_of") {
                return this.createDeclarationNode();
            }
        }
        else {
            throw new Error("expecting an '='");
        }

    }

    containerLogic() {

        switch (this.tokens[0].name) {
            case ("if"):
                return this.createIfNode();
                break;
            case ("do"):
                return this.createDoNode();
                break;
            case ("vector"):
                return this.createVectorNode();
                break;
            default:
                throw new Error("container type is not yet supported");
        }

    }


    //Node Factories


    createIfNode() {
        var node = {};
        node.type = "if";

    }

    createSubCallNode() {
        throw new Error("subroutine call is not implemented yet");
    }

    createDeclarationNode() {

        var node = {};
        node.type = "declaration";

        var left = {};
        left.type = "native-type";
        left.token = this.tokens.shift();

        node.token = this.tokens.shift();

        var right = {};
        right.type = "var-only";
        right.token = this.tokens.shift();

        node.left = left;
        node.right = right;

        return node;
    }

    createAssignmentNode() {

        var node = {};
        node.type = "assignment";

        //assigned variable
        var left = {};
        left.type = "variable";
        left.token = this.tokens.shift();

        //assignment token 
        //(because there are more than one kind of assignment)
        node.token = this.tokens.shift();
        node.left = left;

        //epression
        node.right = this.expressionLogic();


        return node;

    }


    //more
    expressionLogic() {

        var state = "val";
        var goon = true;
        var exp = [];

        while (goon) {

            if (this.tokens[0].sub === "parenthesis") {
                exp.push(this.tokens.shift());
            }
            else if (state === "val") {

                //#TODO: handle more situations.
                if (this.tokens[0].type === "literal" || this.tokens[0].sub === "identifier") {
                    exp.push(this.tokens.shift());
                    state = "op";
                }
                else {
                    throw new Error("expecting a number");
                }

            }
            else if (state === "op") {

                if (this.tokens[0].type === "operator") {
                    exp.push(this.tokens.shift());
                    state = "val";
                }
                else {
                    goon = false;
                }

            }
            else {
                throw new Error("impossible expression state");
            }

            if (this.tokens.length === 0) { goon = false; }

        }

        return ExpressionParser.create(exp);

    }




}

module.exports = Parser;



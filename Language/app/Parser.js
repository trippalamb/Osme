const ExpressionNode = require("./ExpressionNode.js");

class Parser{
    constructor(){
        this.tree = {};
        this.tree.language = "osme";
        this.tree.statements = [];
        this.tokens = [];
    }

    run(tokens){

        this.tokens = tokens;
        while(this.tokens.length > 0){
            
            if(this.tokens[0].type === "word"){
                this.tree.statements.push(this.wordLogic());
            }
            else{
                throw new Error("all instructions currently must start with a word.");
            }
            
        }

        return this.tree;
    }

    wordLogic(){

        if (this.tokens.length > 0){
            if(this.tokens[1].sub === "assignment"){
                return this.createAssignmentNode();
            }
            else if(this.tokens[1].sub === "parenthesis"){
                return this.createSubCallNode();
            }
            else if(this.tokens[1].sub === "instance-of"){
                return this.createDeclarationNode();
            }
        }
        else{
            throw new Error("expecting an '='");
        }

    }

    

    //Node Factories
    
    createSubCallNode(){
        throw new Error("subroutine call is not implemented yet");
    }

    createDeclarationNode(){
        throw new Error("declaration call is not implemented yet");
    }

    createAssignmentNode(){

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
    

    expressionLogic(){

        var state = "val";
        var goon = true;
        var exp = [];

        while(goon){

            if(state === "val"){

                if(this.tokens[0].sub === "number"){
                    exp.push(this.tokens.shift());
                    state = "op";
                }
                else{
                    throw new Error("expecting a number");
                }

            }
            else if(state === "op"){

                if(this.tokens[0].type === "operator"){
                    exp.push(this.tokens.shift());
                    state = "val";
                }
                else{
                    goon = false;
                }

            }
            else{
                throw new Error("impossible expression state");
            }

            if(this.tokens.length === 0){goon = false;}

        }

        return ExpressionNode.create(exp);
        
    }




}

module.exports = Parser;

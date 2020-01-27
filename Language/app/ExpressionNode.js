class ExpressionNode{

    static create(tokens){

        var node = {};

        if(tokens[0].sub === "number"){
            node = numberLogic();
        }
        else{
            throw new Error("expecting a number");
        }

        if(tokens.length !== 0){throw new Error("did not parse all tokens");}

        return node;

        //functions

        function numberLogic(){
        
            if (tokens.length > 1 && 
                tokens[1].type === "operator"){

                var left = {};
                left.token = tokens.shift();
                left.type = "literal";
                return createOperatorNode(left);
            }
            else{
                return createNumberNode();
            }

        }

        function createOperatorNode(left){
            var node = {};
            node.type = "expression";
            node.token = tokens.shift();
            node.left = left;

            if(tokens[0].sub === "number"){
                node.right = numberLogic();
            }
            else{
                throw new Error("expecting a number");
            }

            return node;
        }

        function createNumberNode(){
            var node = {};
            node.token = tokens.shift();
            node.type = "literal";
            return node;
        }

    }
}

module.exports = ExpressionNode;

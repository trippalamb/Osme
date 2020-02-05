class ExpressionNode {

    static create(tokens) {

        var node = {};

        while (tokens.length > 0) {
            var i = findNextAddOp();
            if (i === -1) { i = findNextMulOp(); }

            if (i !== -1) {
                node.type = "expression";
                node.left = this.create(tokens.splice(0, i));
                node.token = tokens.shift();
                node.right = this.create(tokens.splice(0));
            }
            else if (tokens.length === 1) {
                node.token = tokens.shift();
                node.type = "literal";
            }
            else {
                throw new Error("Something went wrong in parsing tokens as expression.");
            }


        }

        return node;

        function findNextAddOp() {
            return tokens.findIndex(item => item.val === '+' || item.val === '-');
        }

        function findNextMulOp() {
            return tokens.findIndex(item => item.val === '*' || item.val === '/');
        }

    }
}

module.exports = ExpressionNode;

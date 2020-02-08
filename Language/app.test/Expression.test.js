const Exp = require("../app/ActionTree/Expression.js");
const Types = require("../app/ActionTree/Types/Types.js");

//create()
test("Expression | eval() : tests '2 + 4.5'", () => {

    var ast = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", name: "add", val: "+" },
        left: {
            token: { type: "literal", sub: "number", name: "real", val: "2" },
            type: "literal"
        },
        right: {
            token: { type: "literal", sub: "number", name: "real", val: "4.5" },
            type: "literal"
        }
    };

    var correct = new Types.Real(6.5);

    expect((new Exp(ast)).eval()).toEqual(correct);
});

test("Expression | eval() : tests '2 * 4.5 + 3.2'", () => {
    var ast = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", name: "add", val: "+" },
        left: {
            type: "expression",
            token: { type: "operator", sub: "mul-ops", name: "multiply", val: "*" },
            left: {
                token: { type: "literal", sub: "number", name: "real", val: "2" },
                type: "literal"
            },
            right: {
                token: { type: "literal", sub: "number", name: "real", val: "4.5" },
                type: "literal"
            }
        },
        right: {
            token: { type: "literal", sub: "number", name: "real", val: "3.2" },
            type: "literal"
        }
    };

    var correct = new Types.Real(12.2);

    expect((new Exp(ast)).eval()).toEqual(correct);
});

test("Expression | eval() : tests '2 * 4.5 / 3.0'", () => {
    var ast = {

        type: "expression",
        token: { type: "operator", sub: "mul-ops", name: "divide", val: "/" },
        left: {
            type: "expression",
            token: { type: "operator", sub: "mul-ops", name: "multiply", val: "*" },
            left: {
                token: { type: "literal", sub: "number", name: "real", val: "2" },
                type: "literal"
            },
            right: {
                token: { type: "literal", sub: "number", name: "real", val: "4.5" },
                type: "literal"
            }
        },
        right: {
            token: { type: "literal", sub: "number", name: "real", val: "3.0" },
            type: "literal"
        }
    };

    var correct = new Types.Real(3.0);

    expect((new Exp(ast)).eval()).toEqual(correct);
});

test("Expression | eval() : tests '(2 + 4.5)'", () => {
    var ast = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", name: "add", val: "+" },
        left: {
            token: { type: "literal", sub: "number", name: "real", val: "2" },
            type: "literal"
        },
        right: {
            token: { type: "literal", sub: "number", name: "real", val: "4.5" },
            type: "literal"
        }
    };
    var correct = new Types.Real(6.5);

    expect((new Exp(ast)).eval()).toEqual(correct);
});
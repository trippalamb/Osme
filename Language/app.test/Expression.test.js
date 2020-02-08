const ExpNode = require("../app/ExpressionNode.js");

//create()
test("ExpressionNode | create() : tests '2 + 4.5'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add-ops", name: "plus", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" }
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", name: "plus", val: "+" },
        left: {
            token: { type: "literal", sub: "number", name: "real", val: "2" },
            type: "literal"
        },
        right: {
            token: { type: "literal", sub: "number", name: "real", val: "4.5" },
            type: "literal"
        }
    };
    expect(ExpNode.create(tokens)).toEqual(correct);
});

test("ExpressionNode | create() : tests '2 + 4.5 - 3.0'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add-ops", name: "plus", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "operator", sub: "add-ops", name: "minus", val: "-" },
        { type: "literal", sub: "number", name: "real", val: "3.0" }
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", name: "minus", val: "-" },
        left: {
            type: "expression",
            token: { type: "operator", sub: "add-ops", name: "plus", val: "+" },
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
    expect(ExpNode.create(tokens)).toEqual(correct);
});

test("ExpressionNode | create() : tests '2 * 4.5'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "times", val: "*" },
        { type: "literal", sub: "number", name: "real", val: "4.5" }
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "mul-ops", name: "times", val: "*" },
        left: {
            token: { type: "literal", sub: "number", name: "real", val: "2" },
            type: "literal"
        },
        right: {
            token: { type: "literal", sub: "number", name: "real", val: "4.5" },
            type: "literal"
        }
    };
    expect(ExpNode.create(tokens)).toEqual(correct);
});

test("ExpressionNode | create() : tests '2 * 4.5 + 3.2'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "times", val: "*" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "operator", sub: "add-ops", name: "plus", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "3.2" },
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", name: "plus", val: "+" },
        left: {
            type: "expression",
            token: { type: "operator", sub: "mul-ops", name: "times", val: "*" },
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
    expect(ExpNode.create(tokens)).toEqual(correct);
});

test("ExpressionNode | create() : tests '2 * 4.5 / 3.0'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "times", val: "*" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "operator", sub: "mul-ops", name: "divide", val: "/" },
        { type: "literal", sub: "number", name: "real", val: "3.0" }
    ];

    var correct = {

        type: "expression",
        token: { type: "operator", sub: "mul-ops", name: "divide", val: "/" },
        left: {
            type: "expression",
            token: { type: "operator", sub: "mul-ops", name: "times", val: "*" },
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
    expect(ExpNode.create(tokens)).toEqual(correct);
});

test("ExpressionNode | create() : tests '(2 + 4.5)'", () => {
    var tokens = [
        { type: "punctuation", sub: "parentheses", name: "left", val: "(" },
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add-ops", name: "plus", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "punctuation", sub: "parentheses", name: "right", val: ")" }
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", name: "plus", val: "+" },
        left: {
            token: { type: "literal", sub: "number", name: "real", val: "2" },
            type: "literal"
        },
        right: {
            token: { type: "literal", sub: "number", name: "real", val: "4.5" },
            type: "literal"
        }
    };
    expect(ExpNode.create(tokens)).toEqual(correct);
});

test("ExpressionNode | create() : tests '2 * (4.5 + 3.2)'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "times", val: "*" },
        { type: "punctuation", sub: "parentheses", name: "left", val: "(" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "operator", sub: "add-ops", name: "plus", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "3.2" },
        { type: "punctuation", sub: "parentheses", name: "right", val: ")" }
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "mul-ops", name: "times", val: "*" },
        left: {
            token: { type: "literal", sub: "number", name: "real", val: "2" },
            type: "literal"

        },
        right: {
            type: "expression",
            token: { type: "operator", sub: "add-ops", name: "plus", val: "+" },
            left: {
                token: { type: "literal", sub: "number", name: "real", val: "4.5" },
                type: "literal"
            },
            right: {
                token: { type: "literal", sub: "number", name: "real", val: "3.2" },
                type: "literal"
            }
        }
    };
    expect(ExpNode.create(tokens)).toEqual(correct);
});

test("ExpressionNode | create() : tests '2 * (4.5 + 3.2)**2'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "times", val: "*" },
        { type: "punctuation", sub: "parentheses", name: "left", val: "(" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "operator", sub: "add-ops", name: "plus", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "3.2" },
        { type: "punctuation", sub: "parentheses", name: "right", val: ")" },
        { type: "operator", sub: "exp-ops", name: "power", val: "**" },
        { type: "literal", sub: "number", name: "real", val: "2" }
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "mul-ops", name: "times", val: "*" },
        left: {
            token: { type: "literal", sub: "number", name: "real", val: "2" },
            type: "literal"

        },
        right: {
            type: "expression",
            left: {
                type: "expression",
                token: { type: "operator", sub: "add-ops", name: "plus", val: "+" },
                left: {
                    token: { type: "literal", sub: "number", name: "real", val: "4.5" },
                    type: "literal"
                },
                right: {
                    token: { type: "literal", sub: "number", name: "real", val: "3.2" },
                    type: "literal"
                }
            },
            token: { type: "operator", sub: "exp-ops", name: "power", val: "**" },
            right: {
                token: { type: "literal", sub: "number", name: "real", val: "2" },
                type: "literal"
            }
        }
    };
    expect(ExpNode.create(tokens)).toEqual(correct);
});

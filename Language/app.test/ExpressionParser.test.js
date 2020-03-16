const ExpParser = require("../app/Parser/ExpressionParser.js");

test("ExpressionParser | create() : tests '2 + 4.5'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add-ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" }
    ];

    var correct = {
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
    expect(ExpParser.create(tokens)).toEqual(correct);
});

test("ExpressionParser | create() : tests '2 + 4.5 - 3.0'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add-ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "operator", sub: "add-ops", name: "subtract", val: "-" },
        { type: "literal", sub: "number", name: "real", val: "3.0" }
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", name: "subtract", val: "-" },
        left: {
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
        },
        right: {
            token: { type: "literal", sub: "number", name: "real", val: "3.0" },
            type: "literal"
        }
    };
    expect(ExpParser.create(tokens)).toEqual(correct);
});

test("ExpressionParser | create() : tests '2 * 4.5'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "multiply", val: "*" },
        { type: "literal", sub: "number", name: "real", val: "4.5" }
    ];

    var correct = {
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
    };
    expect(ExpParser.create(tokens)).toEqual(correct);
});

test("ExpressionParser | create() : tests '2 * 4.5 + 3.2'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "multiply", val: "*" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "operator", sub: "add-ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "3.2" },
    ];

    var correct = {
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
    expect(ExpParser.create(tokens)).toEqual(correct);
});

test("ExpressionParser | create() : tests '2 * 4.5 / 3.0'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "multiply", val: "*" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "operator", sub: "mul-ops", name: "divide", val: "/" },
        { type: "literal", sub: "number", name: "real", val: "3.0" }
    ];

    var correct = {

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
    expect(ExpParser.create(tokens)).toEqual(correct);
});

test("ExpressionParser | create() : tests '(2 + 4.5)'", () => {
    var tokens = [
        {
            type: "container",
            name: "sub-exp",
            val: [
                { type: "literal", sub: "number", name: "real", val: "2" },
                { type: "operator", sub: "add-ops", name: "add", val: "+" },
                { type: "literal", sub: "number", name: "real", val: "4.5" }
            ]
        }
    ];

    var correct = {
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
    expect(ExpParser.create(tokens)).toEqual(correct);
});

test("ExpressionParser | create() : tests '2 * (4.5 + 3.2)'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "multiply", val: "*" },
        {
            type: "container",
            name: "sub-exp",
            val: [
                { type: "literal", sub: "number", name: "real", val: "4.5" },
                { type: "operator", sub: "add-ops", name: "add", val: "+" },
                { type: "literal", sub: "number", name: "real", val: "3.2" }
            ]
        }
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "mul-ops", name: "multiply", val: "*" },
        left: {
            token: { type: "literal", sub: "number", name: "real", val: "2" },
            type: "literal"

        },
        right: {
            type: "expression",
            token: { type: "operator", sub: "add-ops", name: "add", val: "+" },
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
    expect(ExpParser.create(tokens)).toEqual(correct);
});

test("ExpressionParser | create() : tests '2 * (4.5 + 3.2)**2'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "mul-ops", name: "multiply", val: "*" },
        {
            type: "container",
            name: "sub-exp",
            val: [
                { type: "literal", sub: "number", name: "real", val: "4.5" },
                { type: "operator", sub: "add-ops", name: "add", val: "+" },
                { type: "literal", sub: "number", name: "real", val: "3.2" }
            ]
        },
        { type: "operator", sub: "exp-ops", name: "power", val: "**" },
        { type: "literal", sub: "number", name: "real", val: "2" }
    ];

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "mul-ops", name: "multiply", val: "*" },
        left: {
            token: { type: "literal", sub: "number", name: "real", val: "2" },
            type: "literal"

        },
        right: {
            type: "expression",
            left: {
                type: "expression",
                token: { type: "operator", sub: "add-ops", name: "add", val: "+" },
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
    expect(ExpParser.create(tokens)).toEqual(correct);
});
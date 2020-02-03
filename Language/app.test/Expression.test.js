const ExpNode = require("../app/ExpressionNode.js");

//create()
test("ExpressionNode | create() : tests '2 + 4.5'", () => {
    var tokens = [
        {type:"literal", sub:"number", subsub:"real", val:"2"},
        {type:"operator", sub:"add-ops", subsub:"plus", val:"+"},
        {type:"literal", sub:"number", subsub:"real", val:"4.5"}
    ]

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", subsub: "plus", val: "+" },
        left: {
            token: { type: "literal", sub: "number", subsub: "real", val: "2" },
            type: "literal"
        },
        right: {
            token: { type: "literal", sub: "number", subsub: "real", val: "4.5" },
            type: "literal"
        }
    };
    expect(ExpNode.create(tokens)).toEqual(correct);
});

test("ExpressionNode | create() : tests '2 * 4.5'", () => {
    var tokens = [
        { type: "literal", sub: "number", subsub: "real", val: "2" },
        { type: "operator", sub: "mul-ops", subsub: "times", val: "*" },
        { type: "literal", sub: "number", subsub: "real", val: "4.5" }
    ]

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "mul-ops", subsub: "times", val: "*" },
        left: {
            token: { type: "literal", sub: "number", subsub: "real", val: "2" },
            type: "literal"
        },
        right: {
            token: { type: "literal", sub: "number", subsub: "real", val: "4.5" },
            type: "literal"
        }
    };
    expect(ExpNode.create(tokens)).toEqual(correct);
});

test("ExpressionNode | create() : tests '2 * 4.5 + 3.2'", () => {
    var tokens = [
        { type: "literal", sub: "number", subsub: "real", val: "2" },
        { type: "operator", sub: "mul-ops", subsub: "times", val: "*" },
        { type: "literal", sub: "number", subsub: "real", val: "4.5" },
        { type: "operator", sub: "add-ops", subsub: "plus", val: "+" },
        { type: "literal", sub: "number", subsub: "real", val: "3.2" },
    ]

    var correct = {
        type: "expression",
        token: { type: "operator", sub: "add-ops", subsub: "plus", val: "+" },
        left: {
            type: "expression",
            token: { type: "operator", sub: "mul-ops", subsub: "times", val: "*" },
            left: {
                token: { type: "literal", sub: "number", subsub: "real", val: "2" },
                type: "literal"
            },
            right: {
                token: { type: "literal", sub: "number", subsub: "real", val: "4.5" },
                type: "literal"
            }
        },
        right: {
            token: { type: "literal", sub: "number", subsub: "real", val: "3.2" },
            type: "literal"
        }
    };
    expect(ExpNode.create(tokens)).toEqual(correct);
});
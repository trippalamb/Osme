const TokenNester = require("../app/Parser/TokenNester.js");
var containerTokens = [
    { start: 'p-left', end: 'p-right', name:"sub-exp" },
    { start: 'ab-left', end: 'ab-right', name:"matrix" },
];
//left angle '?'
//right angle '?'

test("TokenNester | nest() : tests '2 + 4.5'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add-ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" }
    ];

    var correct = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add-ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" }
    ];

    expect(TokenNester.nest(tokens, containerTokens)).toEqual(correct);
});

test("TokenNester | create() : tests '(2 + 4.5)'", () => {
    var tokens = [
        { type: "punctuation", sub: "parentheses", name: "p-left", val: "(" },
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add-ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "punctuation", sub: "parentheses", name: "p-right", val: ")" }
    ];

    var correct = [
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

    expect(TokenNester.nest(tokens, containerTokens)).toEqual(correct);
});
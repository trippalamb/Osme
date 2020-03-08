const TokenNester = require("../app/Parser/TokenNester.js");
var containerTokens = [
    { start: 'paren-open', end: 'paren-close', name:"sub-exp" },
    { start: 'vector-open', end: 'vector-close', name:"matrix" },
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
        { type: "punctuation", sub: "parentheses", name: "paren-open", val: "(" },
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add-ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "punctuation", sub: "parentheses", name: "paren-close", val: ")" }
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

test("TokenNester | create() : tests <2.0,3.0,4.0>'", () => {
    var tokens = [
        { type: "punctuation", sub: "vector", name: "vector-open", val: "<" },
        { type: "literal", sub: "number", name: "real", val: "2.0" },
        { type: "punctuation", sub: "comma", name: "comma", val: "," },
        { type: "literal", sub: "number", name: "real", val: "3.0" },
        { type: "punctuation", sub: "comma", name: "comma", val: "," },
        { type: "literal", sub: "number", name: "real", val: "4.0" },
        { type: "punctuation", sub: "vector", name: "vector-close", val: ">" }
    ];

    var correct = [
        {
            type: "container",
            name: "matrix",
            val: [
                { type: "literal", sub: "number", name: "real", val: "2.0" },
                { type: "literal", sub: "number", name: "real", val: "3.0" },
                { type: "literal", sub: "number", name: "real", val: "4.0" }
            ]
        }
    ];

    expect(TokenNester.nest(tokens, containerTokens)).toEqual(correct);
});
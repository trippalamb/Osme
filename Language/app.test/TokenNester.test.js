const TokenNester = require("../app/Parser/TokenNester.js");
const fs = require('fs');
const TokenDictionary = JSON.parse(fs.readFileSync("./TokenDictionary.json", "utf8"));
const containerTokens = TokenDictionary.containerTokens;
//var containerTokens = {
//    "expression": { start: 'exp-open', end: 'exp-close', name:"expression" },
//    "vector": { start: 'vector-open', end: 'vector-close', name:"vector" },
//    "tuple": { start: 'tuple-open', end: 'tuple-close', name:"tuple" },
//    "dict": { start: 'dict-open', end: 'dict-close', name:"dict" },
//    "function": {start:'fxn-open', end: 'fxn-close', name:"function"},
//    "subroutine":{start:'sub-open', end: 'sub-close', name:"subroutine"},
//    "do":{start:'do-open', end:'do-close', name:"do"},
//    "if":{start:'if-open', end:'if-close', name:"do"}

//};

test("TokenNester | nest() : tests '2 + 4.5'", () => {
    var tokens = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add_ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" }
    ];

    var correct = [
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add_ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" }
    ];

    expect(TokenNester.nest(tokens, containerTokens)).toEqual(correct);
});

test("TokenNester | create() : tests '(2 + 4.5)'", () => {
    var tokens = [
        { type: "punctuation", sub: "expression", name: "expression_open", val: "(" },
        { type: "literal", sub: "number", name: "real", val: "2" },
        { type: "operator", sub: "add_ops", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "punctuation", sub: "expression", name: "expression_close", val: ")" }
    ];

    var correct = [
        {
            type: "container",
            name: "expression",
            val: [
                { type: "literal", sub: "number", name: "real", val: "2" },
                { type: "operator", sub: "add_ops", name: "add", val: "+" },
                { type: "literal", sub: "number", name: "real", val: "4.5" }
            ]
        }
    ];

    expect(TokenNester.nest(tokens, containerTokens)).toEqual(correct);
});

test("TokenNester | create() : tests '(2.0 + (3.0 - 4.5))'", () => {
    var tokens = [
        { type: "punctuation", sub: "expression", name: "expression_open", val: "(" },
        { type: "literal", sub: "number", name: "real", val: "2.0" },
        { type: "operator", sub: "add_ops", name: "add", val: "+" },
        { type: "punctuation", sub: "expression", name: "expression_open", val: "(" },
        { type: "literal", sub: "number", name: "real", val: "3.0" },
        { type: "operator", sub: "add_ops", name: "minus", val: "-" },
        { type: "literal", sub: "number", name: "real", val: "4.5" },
        { type: "punctuation", sub: "expression", name: "expression_close", val: ")" },
        { type: "punctuation", sub: "expression", name: "expression_close", val: ")" }
    ];

    var correct = [
        {
            type: "container",
            name: "expression",
            val: [
                { type: "literal", sub: "number", name: "real", val: "2.0" },
                { type: "operator", sub: "add_ops", name: "add", val: "+" },
                {
                    type: "container",
                    name: "expression",
                    val: [
                        { type: "literal", sub: "number", name: "real", val: "3.0" },
                        { type: "operator", sub: "add_ops", name: "minus", val: "-" },
                        { type: "literal", sub: "number", name: "real", val: "4.5" }
                    ]
                }
            ]
        }
    ];

    expect(TokenNester.nest(tokens, containerTokens)).toEqual(correct);
});

test("TokenNester | create() : tests '<2.0,3.0,4.0>'", () => {
    var tokens = [
        { type: "punctuation", sub: "vector", name: "vector_open", val: "<" },
        { type: "literal", sub: "number", name: "real", val: "2.0" },
        { type: "punctuation", sub: "separator", name: "separator", val: "," },
        { type: "literal", sub: "number", name: "real", val: "3.0" },
        { type: "punctuation", sub: "separator", name: "separator", val: "," },
        { type: "literal", sub: "number", name: "real", val: "4.0" },
        { type: "punctuation", sub: "vector", name: "vector_close", val: ">" }
    ];

    var correct = [
        {
            type: "container",
            name: "vector",
            val: [
                { type: "literal", sub: "number", name: "real", val: "2.0" },
                { type: "literal", sub: "number", name: "real", val: "3.0" },
                { type: "literal", sub: "number", name: "real", val: "4.0" }
            ]
        }
    ];

    expect(TokenNester.nest(tokens, containerTokens)).toEqual(correct);
});

test("TokenNester | create() : tests '[2.0, 'hello', true]'", () => {
    var tokens = [
        { type: "punctuation", sub: "tuple", name: "tuple_open", val: "[" },
        { type: "literal", sub: "number", name: "real", val: "2.0" },
        { type: "punctuation", sub: "separator", name: "separator", val: "," },
        { type: "literal", sub: "text", name: "string", val: "hello" },
        { type: "punctuation", sub: "separator", name: "separator", val: "," },
        { type: "literal", sub: "number", name: "boolean", val: "true" },
        { type: "punctuation", sub: "tuple", name: "tuple_close", val: "]" }
    ];

    var correct = [
        {
            type: "container",
            name: "tuple",
            val: [
                { type: "literal", sub: "number", name: "real", val: "2.0" },
                { type: "literal", sub: "text", name: "string", val: "hello" },
                { type: "literal", sub: "number", name: "boolean", val: "true" }
            ]
        }
    ];

    expect(TokenNester.nest(tokens, containerTokens)).toEqual(correct);
});

//test("TokenNester | create() : tests '{n:2.0, msg:'hello', yes:true}'", () => {
//    //var tokens = [
//    //    { type: "punctuation", sub: "tuple", name: "tuple-open", val: "[" },
//    //    { type: "literal", sub: "number", name: "real", val: "2.0" },
//    //    { type: "punctuation", sub: "separator", name: "separator", val: "," },
//    //    { type: "literal", sub: "text", name: "string", val: "hello" },
//    //    { type: "punctuation", sub: "separator", name: "separator", val: "," },
//    //    { type: "literal", sub: "number", name: "boolean", val: "true" },
//    //    { type: "punctuation", sub: "tuple", name: "tuple-close", val: "]" }
//    //];
//
//    //var correct = [
//    //    {
//    //        type: "container",
//    //        name: "tuple",
//    //        val: [
//    //            { type: "literal", sub: "number", name: "real", val: "2.0" },
//    //            { type: "literal", sub: "text", name: "string", val: "hello" },
//    //            { type: "literal", sub: "number", name: "boolean", val: "true" }
//    //        ]
//    //    }
//    //];
//
//    expect(TokenNester.nest(tokens, containerTokens)).toEqual(correct);
//});

const fs = require("fs");

const Lexer = require("../app/Lexer/Lexer.js");
const Glossary = require("../app/Lexer/Glossary.js");
const TokenDictionary = JSON.parse(fs.readFileSync("./TokenDictionary.json", "utf8"));

const lexer = new Lexer(TokenDictionary);

//run()
test("Lexer | run() : test matching 'x = 2.1 + 3.4' ", () => {

    lexer.reset();

    var correct = [
        { type: "word", sub: "identifier", name:"variable", val: "x" },
        { type: "operator", sub: "assignment", name: "assign", val: "=" },
        { type: "literal", sub: "number", name: "real", val: "2.1" },
        { type: "operator", sub: "math", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "3.4" }
    ];

    expect(lexer.run('x = 2.1 + 3.4'))
        .toEqual(correct);
})

test("Lexer | run() : test matching 'x = <2.0,3.0,4.0>' ", () => {

    lexer.reset();

    var correct = [
        { type: "word", sub: "identifier", name: "variable", val: "x" },
        { type: "operator", sub: "assignment", name: "assign", val: "=" },
        { type: "punctuation", sub: "container", name: "vector-open", val: "<" },
        { type: "literal", sub: "number", name: "real", val: "2.0" },
        { type: "punctuation", sub: "separator", name: "delimiter", val: "," },
        { type: "literal", sub: "number", name: "real", val: "3.0" },
        { type: "punctuation", sub: "separator", name: "delimiter", val: "," },
        { type: "literal", sub: "number", name: "real", val: "4.0" },
        { type: "punctuation", sub: "container", name: "vector-close", val: ">" }
    ];

    expect(lexer.run('x = <2.0,3.0,4.0>'))
        .toEqual(correct);
})

test("Lexer | run() : test matching 'real :: x = 2.1' ", () => {

    lexer.reset();

    var correct = [
        { type: "word", sub: "keyword", name: "real", val: "real" },
        { type: "operator", sub: "property", name: "instance-of", val: "::" },
        { type: "word", sub: "identifier", name: "variable", val: "x" },
        { type: "operator", sub: "assignment", name: "assign", val: "=" },
        { type: "literal", sub: "number", name: "real", val: "2.1" }
    ];

    expect(lexer.run('real :: x = 2.1'))
        .toEqual(correct);
})

test("Lexer | run() : test matching 'x = 2.1 + 3.4\ny = <2.0,3.0,4.0>' ", () => {

    lexer.reset();

    var correct = [
        { type: "word", sub: "identifier", name: "variable", val: "x" },
        { type: "operator", sub: "assignment", name: "assign", val: "=" },
        { type: "literal", sub: "number", name: "real", val: "2.1" },
        { type: "operator", sub: "math", name: "add", val: "+" },
        { type: "literal", sub: "number", name: "real", val: "3.4" },
        { type: "new", sub: "newCommand", name: "newline", val: "\n" },
        { type: "word", sub: "identifier", name: "variable", val: "y" },
        { type: "operator", sub: "assignment", name: "assign", val: "=" },
        { type: "punctuation", sub: "container", name: "vector-open", val: "<" },
        { type: "literal", sub: "number", name: "real", val: "2.0" },
        { type: "punctuation", sub: "separator", name: "delimiter", val: "," },
        { type: "literal", sub: "number", name: "real", val: "3.0" },
        { type: "punctuation", sub: "separator", name: "delimiter", val: "," },
        { type: "literal", sub: "number", name: "real", val: "4.0" },
        { type: "punctuation", sub: "container", name: "vector-close", val: ">" }
    ];

    expect(lexer.run('x = 2.1 + 3.4\ny = < 2.0, 3.0, 4.0 >'))
        .toEqual(correct);
})

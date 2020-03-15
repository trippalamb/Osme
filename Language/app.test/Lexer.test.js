const fs = require("fs");

const Lexer = require("../app/Lexer/Lexer.js");
const Glossary = require("../app/Lexer/Glossary.js");
const TokenDictionary = JSON.parse(fs.readFileSync("./TokenDictionary.json", "utf8"));

const lexer = new Lexer(new Glossary(TokenDictionary));

//run()
test("Lexer | run() : test matching 'x = 2.1 + 3.4' ", () => {

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

test("Lexer | run() : test matching '<2.0,3.0,4.0>' ", () => {

    var correct = [
        { type: "punctuation", sub: "vector", name: "vector-open", val: "<" },
        { type: "literal", sub: "number", name: "real", val: "2.0" },
        { type: "punctuation", sub: "comma", name: "comma", val: "," },
        { type: "literal", sub: "number", name: "real", val: "3.0" },
        { type: "punctuation", sub: "comma", name: "comma", val: "," },
        { type: "literal", sub: "number", name: "real", val: "4.0" },
        { type: "punctuation", sub: "vector", name: "vector-close", val: ">" }
    ];

    expect(lexer.run('<2.0,3.0,4.0>'))
        .toEqual(correct);
})

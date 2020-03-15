const Glossary = require("../app/Lexer/Glossary.js");
const fs = require("fs");
const TokenDictionary = JSON.parse(fs.readFileSync("./TokenDictionary.json", "utf8"));

test("Glossary | constructor() : tests opList", () => {

    var glossary = new Glossary(TokenDictionary);

    var correct = [
        {
            "type": "comparison",
            "name": "is",
            "symbol": "?:=",
            "precendence": "comparison",
            "length": 3
        },
        {
            "type": "comparison",
            "name": "is_not_equivalent",
            "symbol": "?/=",
            "precendence": "comparison",
            "length": 3
        },
        {
            "type": "comparison",
            "name": "is_le_than",
            "symbol": "?<=",
            "precendence": "comparison",
            "length": 3
        },
        {
            "type": "comparison",
            "name": "is_ge_than",
            "symbol": "?>=",
            "precendence": "comparison",
            "length": 3
        },
        {
            "type": "assignment",
            "name": "defined_as",
            "symbol": ":=",
            "length": 2
        },
        {
            "type": "assignment",
            "name": "point",
            "symbol": "->",
            "length": 2
        },
        {
            "type": "math",
            "name": "root",
            "symbol": "^/",
            "precendence": "pow-ops",
            "length": 2
        },
        {
            "type": "comparison",
            "name": "is_approximately",
            "symbol": "?~",
            "length": 2
        },
        {
            "type": "comparison",
            "name": "is_equivalent",
            "symbol": "?=",
            "precendence": "comparison",
            "length": 2
        },
        {
            "type": "comparison",
            "name": "is_l_than",
            "symbol": "?<",
            "precendence": "comparison",
            "length": 2
        },
        {
            "type": "comparison",
            "name": "is_g_than",
            "symbol": "?>",
            "precendence": "comparison",
            "length": 2
        },
        {
            "type": "logical",
            "name": "and",
            "symbol": "&&",
            "length": 2
        },
        {
            "type": "logical",
            "name": "or",
            "symbol": "|&",
            "length": 2
        },
        {
            "type": "logical",
            "name": "xor",
            "symbol": "!&",
            "length": 2
        },
        {
            "type": "assignment",
            "name": "assign",
            "symbol": "=",
            "length": 1
        },
        {
            "type": "math",
            "name": "add",
            "symbol": "+",
            "precendence": "add-ops",
            "length": 1
        },
        {
            "type": "math",
            "name": "subtract",
            "symbol": "-",
            "precendence": "add-ops",
            "length": 1
        },
        {
            "type": "math",
            "name": "multiply",
            "symbol": "+",
            "precendence": "mul-ops",
            "length": 1
        },
        {
            "type": "math",
            "name": "divide",
            "symbol": "/",
            "precendence": "mul-ops",
            "length": 1
        },
        {
            "type": "math",
            "name": "power",
            "symbol": "^",
            "precendence": "pow-ops",
            "length": 1
        },
        {
            "type": "logical",
            "name": "not",
            "symbol": "!",
            "length": 1
        }
    ];

    expect(glossary.opList).toEqual(correct);
});
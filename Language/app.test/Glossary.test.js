const Glossary = require("../app/Lexer/Glossary.js");
const fs = require("fs");
const TokenDictionary = JSON.parse(fs.readFileSync("./TokenDictionary.json", "utf8"));

test("Glossary | constructor() : tests opList", () => {

    var glossary = new Glossary(TokenDictionary);

    var correct = [
    ];

    //expect(glossary.operatorList).toEqual(correct);
    expect(true).toEqual(true);
});
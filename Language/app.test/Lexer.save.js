const Lexer = require("../app/Lexer/Lexer.js");
const OpList = require("../app/Lexer/OperatorList.js");
const lexer = new Lexer(new OpList("osme"));

//isDigit()
test("Lexer | isDigit() : tests to see if '1' is a digit", () => {
    expect(lexer.isDigit('1')).toBe(true);
});

test("Lexer | isDigit() : tests to see if 'A' is a digit", () => {
    expect(lexer.isDigit('A')).toBe(false);
});

//isLetter()
test("Lexer | isLetter() : tests to see if '1' is a letter", () => {
    expect(lexer.isLetter('1')).toBe(false);
});

test("Lexer | isLetter() : tests to see if 'A' is a letter", () => {
    expect(lexer.isLetter('A')).toBe(true);
});

test("Lexer | isLetter() : tests to see if '?'<-(lower-case delta) is a letter", () => {
    expect(lexer.isLetter('?')).toBe(false);
});

//isOperator()
test("Lexer | isOperator() : tests to see if '1' is an operator", () => {
    expect(lexer.isOperator('1')).toBe(false);
});

test("Lexer | isOperator() : tests to see if 'A' is an operator", () => {
    expect(lexer.isOperator('A')).toBe(false);
});

test("Lexer | isOperator() : tests to see if '+' is an operator", () => {
    expect(lexer.isOperator('+')).toBe(true);
});

//isPunctuation
test("Lexer | isPunctuation() : tests to see if '+' is an operator", () => {
    expect(lexer.isPunctuation('+')).toBe(false);
});

test("Lexer | isPunctuation() : tests to see if '(' is an operator", () => {
    expect(lexer.isPunctuation('(')).toBe(true);
});

//isWhiteSpace()
test("Lexer | isWhiteSpace() : tests to see if '1' is white space", () => {
    expect(lexer.isWhiteSpace('1')).toBe(false);
});

test("Lexer | isWhiteSpace() : tests to see if 'A' is white space", () => {
    expect(lexer.isWhiteSpace('A')).toBe(false);
});

test("Lexer | isWhiteSpace() : tests to see if '+' is white space", () => {
    expect(lexer.isWhiteSpace('+')).toBe(false);
});

test("Lexer | isWhiteSpace() : tests to see if '\\n' is white space", () => {
    expect(lexer.isWhiteSpace('\n')).toBe(true);
});

test("Lexer | isWhiteSpace() : tests to see if ' ' is white space", () => {
    expect(lexer.isWhiteSpace(' ')).toBe(true);
});

//readNumber()
test("Lexer | readNumber() : test matching a real number", () => {
    expect(lexer.readNumber('654.7'))
        .toEqual({ end: 5, type: "literal", sub: "number", name: "real" });
});

test("Lexer | readNumber() : test matching an imaginary number", () => {
    expect(lexer.readNumber('0.7623i'))
        .toEqual({ end: 7, type: "literal", sub: "number", name: "imaginary" });
});

test("Lexer | readNumber() : test matching a non-number", () => {
    expect(() => { lexer.readNumber('banana') }).toThrow();
});

//readWord()
test("Lexer | readWord() : test matching a word", () => {
    expect(lexer.readWord('banana'))
        .toEqual({ end: 6, type: "word", sub: "", name: "" });
})

//readOperator()
test("Lexer | readOperator() : test matching an equals sign ", () => {
    expect(lexer.readOperator('='))
        .toEqual({ end: 1, type: "operator", sub: "assignment", name: "assign" });
})

//readPunctuation()
test("Lexer | readPunctuation() : test matching an parenthesis left '(' ", () => {
    expect(lexer.readPunctuation('('))
        .toEqual({ end: 1, type: "punctuation", sub: "parenthesis", name: "paren-open" });
})


//run()
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

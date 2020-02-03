const Lexer = require("../app/Lexer.js");
const OpList = require("../app/OperatorList.js");
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
        .toEqual({ end: 5, type: "literal", sub: "number", subsub: "real" });
});

test("Lexer | readNumber() : test matching an imaginary number", () => {
    expect(lexer.readNumber('0.7623i'))
        .toEqual({ end: 7, type: "literal", sub: "number", subsub: "imaginary" });
});

test("Lexer | readNumber() : test matching a non-number", () => {
    expect(() => { lexer.readNumber('banana') }).toThrow();
});

//readWord()
test("Lexer | readWord() : test matching a word", () => {
    expect(lexer.readWord('banana'))
        .toEqual({ end: 6, type: "word", sub: "", subsub: "" });
})

//readOperator()
test("Lexer | readOperator() : test matching an equals sign ", () => {
    expect(lexer.readOperator('='))
        .toEqual({ end: 1, type: "operator", sub: "assignment", subsub: "equals" });
})

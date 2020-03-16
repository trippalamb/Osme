const Token = require("./Token.js");
const Glossary = require("./Glossary.js");

class Lexer {

    constructor(TokenDictionary) {

        this.tokens = [];
        this.glossary = new Glossary(TokenDictionary);
        this.state = "none";
        this.s = "";

    }

    run(str) {

        this.s = str;

        while (this.s.length > 0) {

            this.getNextToken();
            this.s = this.s.trimStart();

        }

        return this.tokens;

    }

    getNextToken() {

        var fxn = "getStateToken_" + this.state;
        if (typeof (this[fxn]) === "undefined") {
            throw new Error("Lexer entered an unexpected state [" + this.state + "].");
        }

        this.tokens.push(this[fxn]());

    }

    getStateToken_none() {

        var token = this.checkFor(["word"]);
        if (token !== null) { return token; }

        throw new Error("Lexer expected a word.");
    }

    getStateToken_word() {

        var token = this.checkFor(["operator", "punctuation"]);
        
        if (token !== null) { return token; }

        throw new Error("Lexer expected an operator or punctuation.");
    }

    getStateToken_operator() {

        var token = this.checkFor(["literal", "punctuation", "word"]);

        if (token !== null) { return token; }

        throw new Error("Lexer expected a literal, punctuation, or a word.");
    }

    getStateToken_literal() {

        var token = this.checkFor(["operator", "punctuation"]);

        if (token !== null) { return token; }

        throw new Error("Lexer expected a operator or punctuation.");
    }

    checkFor(types) {
        for (const type of types) {
            var listName = type + "List";
            for (const i of this.glossary[listName]) {
                if (typeof (i.symbol) !== "undefined") {
                    if (this.s.indexOf(i.symbol) === 0) {
                        this.s = this.s.slice(i.length);
                        this.state = type;
                        return new Token(this.state, i.type, i.name, i.symbol);
                    }
                }
                else {
                    var m = this.s.match(i.match);
                    if (m !== null) {
                        this.s = this.s.slice(m[0].length);
                        this.state = type;
                        return new Token(this.state, i.type, i.name, m[0]);
                    }
                }
            }
        }

        return null;
    }

}

module.exports = Lexer;



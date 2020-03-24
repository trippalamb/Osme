const Token = require("./Token.js");
const Glossary = require("./Glossary.js");

class Lexer {

    constructor(TokenDictionary) {

        this.tokens = [];
        this.glossary = new Glossary(TokenDictionary);
        this.state = "new";
        this.s = "";

    }

    run(str) {

        this.s = str;

        while (this.s.length > 0) {

            this.getNextToken();
            this.s = this.s.replace(/^ */, '');
            this.checkNewLineToken(); 

        }

        return this.tokens;

    }

    reset() {
        this.s = "";
        this.state = "new";
        this.tokens = [];
    }

    checkNewLineToken() {
        var r = /^\r?\n/
        var m = this.s.match(r);
        if (m !== null) {
            this.s = this.s.slice(m[0].length);
            this.s = this.s.replace(/^\s*/m, '');
            //#TODO: add logic to know when a command is over
            this.state = "new"
            this.tokens.push(new Token("new", "newCommand", "newline", m[0]));
        }


        return 0;
    }

    getNextToken() {

        var fxn = "getStateToken_" + this.state;
        if (typeof (this[fxn]) === "undefined") {
            throw new Error("Lexer entered an unexpected state [" + this.state + "].");
        }

        this.tokens.push(this[fxn]());

        return 0;

    }

    getStateToken_new() {

        var token = this.checkFor(["word"]);
        if (token !== null) { return token; }

        console.log(this.s.slice(0, 20));
        throw new Error("Lexer expected a word.");
    }

    getStateToken_word() {

        var token = this.checkFor(["operator", "punctuation"]);
        
        if (token !== null) { return token; }

        console.log(this.s.slice(0, 20));
        throw new Error("Lexer expected an operator or punctuation.");
    }

    getStateToken_operator() {

        var token = this.checkFor(["literal", "punctuation", "word"]);

        if (token !== null) { return token; }

        console.log(this.s.slice(0, 20));
        throw new Error("Lexer expected a literal, punctuation, or a word.");
    }

    getStateToken_literal() {

        var token = this.checkFor(["operator", "punctuation"]);

        if (token !== null) { return token; }

        console.log(this.s.slice(0, 20));
        throw new Error("Lexer expected a operator or punctuation.");
    }

    getStateToken_punctuation() {

        var token = this.checkFor(["operator", "literal", "word"]);

        if (token !== null) { return token; }

        console.log(this.s.slice(0, 20));
        throw new Error("Lexer expected a operator, literal, or a word.");
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



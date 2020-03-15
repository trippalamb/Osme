const Token = require("./Token.js");
const Glossary = require("./Glossary.js");

class Lexer{

    constructor(TokenDictionary){

        this.tokens = [];
        this.glossary = new Glossary(TokenDictionary);
        this.operators = operators;
        

    }

    run(str){

        var i = 0;
        var s = str;

        while(s.length > 0){

            var c = s.slice(0, 1);
            
            if(this.isDigit(c)){
                s = this.parseToken(s, this.readNumber);
            }
            else if(this.isLetter(c)){
                s = this.parseToken(s, this.readWord);
            }
            else if(this.isOperator(c)){
                s = this.parseToken(s, this.readOperator);
            }
            else if (this.isPunctuation(c)) {
                s = this.parseToken(s, this.readPunctuation);
            }
            else if(this.isWhiteSpace(c)){
                s = s.trimLeft();
            }
            else{
                throw new Error("character is not supported")
            }
        }

        return this.tokens;

    }

   

    parseToken(s, readFxn){
        var rd = readFxn(s); //read data
        this.tokens.push(new Token(rd.type, rd.sub, rd.name, s.slice(0,rd.end)));
        return s.slice(rd.end);
    }

    readNumber(s) {
        var nStr = "^[-+]?\\d*\\.?\\d+([eE][-+]?[\\d]+)?";
        var realRegex = new RegExp(nStr);
        var imaginaryRegex = new RegExp(nStr + "i");

        var rm = s.match(realRegex);
        var im = s.match(imaginaryRegex);

        if (im !== null) {
            return { end: im[0].length, type: "literal", sub: "number", name: "imaginary" };
        }
        else if (rm !== null) {
            return { end: rm[0].length, type: "literal", sub: "number", name: "real" };
        }
        else {
            throw new Error("expected a known number format");
        }

    }

    readWord(s) {
        var wordRegex = /[_\w][\w_\d]*/;
        var wm = s.match(wordRegex);
        return {end:wm[0].length, type:"word", sub:"", name:""};
    }

    readOperator(s){
        var c = s.slice(0, 1);
        switch (c) {
            case '=':
                return { end: 1, type: "operator", sub: "assignment", name: "assign" };
            case '+':
                return { end: 1, type: "operator", sub: "add-ops", name: "add" };
            case '-':
                return { end: 1, type: "operator", sub: "add-ops", name: "subtract" };
            case '*':
                return readOp_times(); 
            case '/':
                return readOp_forwardSlash();
            default:
                throw new Error("expected a known operator");            
        }

        //operator reads
        function readOp_times() {
            switch (s.slice(1, 2)) {
                case '*':
                    return { end: 2, type: "operator", sub: "exp-ops", name: "power" };
                default:
                    return { end: 1, type: "operator", sub: "mul-ops", name: "multiply" };
            }
        }

        function readOp_forwardSlash() {
            switch (s.slice(1, 2)) {
                case '/':
                    return { end: 2, type: "operator", sub: "exp-ops", name: "root" };
                default:
                    return { end: 1, type: "operator", sub: "mul-ops", name: "divide" };

            }
        }


    }

    readPunctuation(s) {
        var c = s.slice(0, 1);
        switch (c) {
            case '(':
                return { end: 1, type: "punctuation", sub: "parenthesis", name: "paren-open" };
            case ')':
                return { end: 1, type: "punctuation", sub: "parenthesis", name: "paren-close" };
            case '<':
                return { end: 1, type: "punctuation", sub: "vector", name: "vector-open" };
            case '>':
                return { end: 1, type: "punctuation", sub: "vector", name: "vector-close" };
            case ',':
                return { end: 1, type: "punctuation", sub: "comma", name: "comma" };
            default:
                throw new Error("expected a known operator");
        }

    }


    // character types
    isDigit(c) { 
        return /[0-9]/.test(c); //true means that charcter is considered a digit
    }
    
    isLetter(c) {
        return /[a-zA-Z]/.test(c); //true means that character is considered a letter
    }
    
    isOperator(c){
        return this.opSymbols.list.includes(c); //true means that character is considered an operator
    }

    isPunctuation(c) {
        return /[\(\)\<\>,]/.test(c); //true means that character is considered punctuation
    }
    
    isWhiteSpace(c){
        return /\s/.test(c); //true means that characgter is considered white space
    }


}

module.exports = Lexer;



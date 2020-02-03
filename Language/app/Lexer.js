const Token = require("./Token.js");

class Lexer{

    constructor(operators){

        this.tokens = [];
        this.operators = operators;

    }

    run(str){

        var i = 0;
        var s = str;

        while(s.length > 0){

            var c = s.slice(0, 1);
            var end = 0;
            
            if(this.isDigit(c)){
                s = this.parseToken(s, this.readNumber);
            }
            else if(this.isLetter(c)){
                s = this.parseToken(s, this.readWord);
            }
            else if(this.isOperator(c)){
                s = this.parseToken(s, this.readOperator);
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
        this.tokens.push(new Token(rd.type, rd.sub, rd.subsub, s.slice(0,rd.end)));
        return s.slice(rd.end);
    }

    readNumber(s) {
        var nStr = "^[-+]?\\d*\\.?\\d+([eE][-+]?[\\d]+)?";
        var realRegex = new RegExp(nStr);
        var imaginaryRegex = new RegExp(nStr + "i");

        var rm = s.match(realRegex);
        var im = s.match(imaginaryRegex);

        if (im !== null) {
            return { end: im[0].length, type: "literal", sub: "number", subsub: "imaginary" };
        }
        else if (rm !== null) {
            return { end: rm[0].length, type: "literal", sub: "number", subsub: "real" };
        }
        else {
            throw new Error("expected a known number format");
        }

    }

    readWord(s) {
        var wordRegex = /[_\w][\w_\d]*/;
        var wm = s.match(wordRegex);
        return {end:wm[0].length, type:"word", sub:"", subsub:""};
    }

    readOperator(s){
        var end = 1;
        var c = s.slice(0, end);
        if (c === "=") {
            return { end: end, type: "operator", sub: "assignment", subsub: "equals" };
        }
        else if (c === "+") {
            return { end: end, type: "operator", sub: "add-ops", subsub: "plus" };
        }
        else if (c === "-") {
            return { end: end, type: "operator", sub: "add-ops", subsub: "minus" };
        }
        else if (c === "*") {
            return { end: end, type: "operator", sub: "mul-ops", subsub: "times" };
        }
        else {
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
        return this.operators.list.includes(c); //true means that character is considered an operator
    }

    isPunctuation(c) {
        throw new Error("not implemented yet");
        //return this.punctuation.list.includes(c); //true means that character is considered punctuation
    }
    
    isWhiteSpace(c){
        return /\s/.test(c); //true means that characgter is considered white space
    }


}

module.exports = Lexer;



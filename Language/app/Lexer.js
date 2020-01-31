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
            return { end: im[0].length, type: "literal", sub: "number", subsub:"imaginary" };
        }
        else {
            return { end: rm[0].length, type: "literal", sub: "number", subsub:"real" };
        }

    }

    readWord(){
        return {end:1, type:"word", sub:""};
    }

    readOperator(s){
        var end = 1;
        var sub = "";
        if(s.slice(0, end) === "="){sub = "assignment";}
        return {end:end, type:"operator", sub:sub};
    }

    isDigit(c) {
        return /[0-9]/.test(c);
    }
    
    isLetter(c) {
        return /[a-zA-Z]/.test(c);
    }
    
    isOperator(c){
        return this.operators.list.includes(c);
    }
    
    isWhiteSpace(c){
        return /\s/.test(c);
    }


}

module.exports = Lexer;



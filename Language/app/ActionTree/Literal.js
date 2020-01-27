class Literal{
    
    constructor(astLiteral){
        this.type = astLiteral.sub;
        this.content = astLiteral.val;
    }

    compileToJS(){
        return this.content;
    }

}

module.exports = Literal;

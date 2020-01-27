class Variable{
    constructor(astWord){
        this.name = astWord.val;
        this.type = "number";
    }

    compileToJS(){
        return this.name;
    }
}

module.exports = Variable;

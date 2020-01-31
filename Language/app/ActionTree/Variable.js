const Real = require("./Types/Real.js");

class Variable{

    constructor(astWord){
        this.name = astWord.val;
        this.type = new Real(0.0);
    }

    compileToJS(){
        return this.name;
    }

    setValue(v) {
        this.val = v;
    }
}

module.exports = Variable;

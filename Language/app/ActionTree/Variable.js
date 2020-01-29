const VariableManager = require("../Environment/VariableManager.js");
const Real = require("./Types/Real.js")

class Variable{
    constructor(astWord){
        this.name = astWord.val;
        this.evalName = VariableManager.getNextName();
        this.type = "number";
        this.subtype = "real";
        this.val = new Real(0.0);;
    }

    compileToJS(){
        return this.name;
    }

    setValue(v) {
        this.val = v;
    }
}

module.exports = Variable;

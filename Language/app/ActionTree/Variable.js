const Types = require("./Types/Types.js");

class Variable{

    constructor(astWord){
        this.name = astWord.val;
        this.val = new Types.Real(0.0);
    }

    compileToJS(){
        return this.name;
    }

    setValue(v) {
        this.val = v;
    }
}

module.exports = Variable;

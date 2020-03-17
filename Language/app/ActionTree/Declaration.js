const Types = require("./Types/Types.js");
const Variable = require("./Variable.js");

class Declaration {
    constructor(astStatement) {
        var typeName = astStatement.left.token.name;
        typeName = typeName.substr(0, 1).toUpperCase() + typeName.slice(1);
        this.type = Types[typeName];
        this.variable = new Variable(astStatement.right.token);
    }

    compileToJS() {
        return "var " + this.variable.compileToJS() + ";";
    }

    eval(vm) {

        vm.pushToVarDict(this.variable);

        return 0;
    }
}

module.exports = Declaration;
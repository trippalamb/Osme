const VM = require("./Environment/VariableManager.js");
const Real = require("./ActionTree/Types/Real.js");

class Evaluator {

    static eval(program) {
        console.log(JSON.stringify(program.statements));
        for (var s in program.statements) {
            console.log(JSON.stringify(s));
            if (s.type === "assignment") {
                console.log("here");
                VM.pushToVarDict(s.content.variable);
                s.content.variable.val = new Real(s.content.expression.left.left.content).add(new Real(parseFloat(s.content.expression.right.left.content)));
                
            }
        }
    }
}

module.exports = Evaluator;

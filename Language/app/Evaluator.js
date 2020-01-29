const VM = require("./Environment/VariableManager.js");
const Real = require("./ActionTree/Types/Real.js");

class Evaluator {

    static eval(program) {
        for (var s in program.statements) {
            if (s.type === "assignment") {
                s.content.variable.val = OsmeMath.add_rr(parseFloat(s.content.expression.left.left.content), parseFloat(s.content.expression.right.left.content));
                VM.pushToVarDict(s.content.variable);
            }
        }
    }
}

module.exports = Evaluator;
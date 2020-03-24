const Language = require("../app/Language.js");
const fs = require("fs");

test("Language | eval() : Tests the program: DeclarationAndExpression_1.osme", () => {

    var code = fs.readFileSync("./examples/DeclarationAndExpression_1.osme", "utf8").trim();

    var osme = new Language("osme");
    osme.code = code;
    var results = osme.eval();

    var correct = {
        "x": {
            "name": "x",
            "val": {
                "r": 5.300000000000001
            }
        },
        "y": {
            "name": "y",
            "val": {
                "r": 9.8
            }
        }
    };

    expect(results).toEqual(correct);
});
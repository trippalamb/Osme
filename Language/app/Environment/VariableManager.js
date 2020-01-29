var name = "@"; //so that the first name is "A"
var dictionary = {};

class VariableManager {

    static getNextName() {
        var code = name.charCodeAt(0);
        name = String.fromCharCode(code + 1);

        return name;
    }

    static doesNameExist(id) {
        return (typeof(dictionary[id]) !== "undefined");
    }

    static pushToVarDict(v) {
        dictionary[v.name] = v;
        return true;
    }

    static deleteFromVarDict(id) {
        delete dictionary[id];
        return true;
    }
}
module.exports = VariableManager;
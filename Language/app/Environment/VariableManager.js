var name = "@"; //so that the first name is "A"
var dictionary = {};

//TODO: this should basically just be functionality of various action tree items
class VariableManager {

    //TODO: this should only exist as functionality of an individual languages compilation option
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
//var name = "@"; //so that the first name is "A"
//var dictionary = {};

class VariableManager {

    constructor(){
        this.dictionary = {};
    }

    //static getNextName() {
    //    var code = name.charCodeAt(0);
    //    name = String.fromCharCode(code + 1);

    //    return name;
    //}

    doesNameExist(id) {
        return (typeof(this.dictionary[id]) !== "undefined");
    }

    pushToVarDict(v) {
        if (this.doesNameExist(v.name)) { throw new Error("Variable name is already declared."); }
        this.dictionary[v.name] = v;
        return true;
    }

    updateVar(v) {
        if (!this.doesNameExist(v.name)) { throw new Error("Variable name does not yet exist."); }
        this.dictionary[v.name] = v;
        return true;
    }

    deleteFromVarDict(id) {
        delete this.dictionary[id];
        return true;
    }

    printDict(){
        console.log(JSON.stringify(this.dictionary, null, 2));
    }
}
module.exports = VariableManager;

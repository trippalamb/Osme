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

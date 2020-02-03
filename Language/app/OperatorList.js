class OperatorList {
    constructor(language) {
        if (language === "osme") {
            this.add = "+";
            this.subtract = "-";
            this.multiply = "*";
            this.assignment = "=";

            this.list = [];
            this.list.push(this.add);
            this.list.push(this.subtract);
            this.list.push(this.multiply);
            this.list.push(this.assignment);
        }

    }
}

module.exports = OperatorList
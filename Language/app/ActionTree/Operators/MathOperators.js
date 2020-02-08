class Add {
    constructor() {

        this.symbol = '+';
        this.type = "add";
        this.class = "add-ops";
        this.precedence = 3;

    }

}

class Subtract {
    constructor() {
        this.symbol = '-';
        this.type = "subtract";
        this.class = "add-ops";
        this.precedence = 3;
    }

}

class Multiply {
    constructor() {
        this.symbol = '*';
        this.type = "multiply";
        this.class = "mul-ops";
        this.precedence = 2;
    }

}

class Divide {
    constructor() {
        this.symbol = '/';
        this.type = "divide";
        this.class = "mul-ops";
        this.precedence = 2;
    }

}

class Power {
    constructor() {
        this.symbol = '**';
        this.type = "power";
        this.class = "exp-ops";
        this.precedence = 1;
    }

}

class Root {
    constructor() {
        this.symbol = '//';
        this.type = "root";
        this.class = "exp-ops";
        this.precedence = 1;
    }

}


module.exports = {
    Add: Add,
    Subtract: Subtract,
    Multiply: Multiply,
    Divide: Divide,
    Power: Power,
    Root: Root
}

class MathOperator {
    constructor() {

    }

    compileToJS() {
        return this.symbol;
    }
}

class Add {
    constructor() {

        this.symbol = '+';
        this.fxn = "add";
        this.class = "add-ops";
        this.precedence = 3;

    }

    compileToJS() {
        return this.symbol;
    }

}

class Subtract {
    constructor() {
        this.symbol = '-';
        this.fxn = "subtract";
        this.class = "add-ops";
        this.precedence = 3;
    }

    compileToJS() {
        return this.symbol;
    }

}

class Multiply {
    constructor() {
        this.symbol = '*';
        this.fxn = "multiply";
        this.class = "mul-ops";
        this.precedence = 2;
    }

    compileToJS() {
        return this.symbol;
    }
}

class Divide {
    constructor() {
        this.symbol = '/';
        this.fxn = "divide";
        this.class = "mul-ops";
        this.precedence = 2;
    }

    compileToJS() {
        return this.symbol;
    }
}

class Power {
    constructor() {
        this.symbol = '**';
        this.fxn = "power";
        this.class = "exp-ops";
        this.precedence = 1;
    }

    compileToJS() {
        return this.symbol;
    }
}

class Root {
    constructor() {
        this.symbol = '//';
        this.fxn = "root";
        this.class = "exp-ops";
        this.precedence = 1;
    }

    compileToJS() {
        return this.symbol;
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

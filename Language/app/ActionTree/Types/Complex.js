class Complex{

    constructor(r, i) {
        this.r = r;
        this.i = i;
    }

    compileToJS() {
        throw new Error("not implemented yet");
    }


    ///ADD///
    add(x) {
        switch (x.constructor.name) {
            case ("Real"):
                return this.add_r(x);
                break;
            case ("Imaginary"):
                return this.add_i(x);
                break;
            case ("Complex"):
                return this.add_c(x);
                break;
            default:
                throw new Error("add operation is not supported for these two types");
        }
    }

    add_r(x) {
        return new Complex(this.r + x.r, this.i);
    }

    add_i(x) {
        return new Complex(this.r, this.i + x.i);
    }

    add_c(x) {
        return new Complex(this.r + x.r, this.i + x.i);
    }

    ///SUBTRACT///
    subtract(x) {
        switch (x.constructor.name) {
            case ("Real"):
                return this.subtract_r(x);
                break;
            case ("Imaginary"):
                return this.subtract_i(x);
                break;
            case ("Complex"):
                return this.subtract_c(x);
                break;
            default:
                throw new Error("subtract operation is not supported for these two types");
        }
    }

    subtract_r(x) {
        return new Complex(this.r - x.r, this.i);
    }

    subtract_i(x) {
        return new Complex(this.r, this.i - x.i);
    }

    subtract_c(x) {
        return new Complex(this.r - x.r, this.i - x.i);
    }

    ///MULTIPLY///
    multiply(x) {
        switch (x.constructor.name) {
            case ("Real"):
                return this.multiply_r(x);
                break;
            case ("Imaginary"):
                return this.multiply_i(x);
                break;
            case ("Complex"):
                return this.multiply_c(x);
                break;
            default:
                throw new Error("multiply operation is not supported for these two types");
        }
    }

    multiply_r(x) {
        return new Complex(this.r * x.r, this.i * x.r);
    }

    multiply_i(x) {
        return new Complex(-this.i * x.i, this.r * x.i);
    }

    multiply_c(x) {
        return new Complex(this.r * x.r - this.i * x.i, this.r * x.i - this.i * x.r);
    }



}

module.exports = Complex;

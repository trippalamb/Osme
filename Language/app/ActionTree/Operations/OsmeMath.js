const Real = new require("./Real.js");
const Imaginary = new require("./Imaginary.js");
const Complex = new require("./Complex.js");

//TODO: reorganize these to be in the type files as methods
class OsmeMath {

    //Multiplying
    static Multiply_rr(a, b) {
        return new Real(a.r * b.r);
    }

    static Multiply_ii(a, b) {
        return new Real(-a.r * b.r);
    }

    static Multiply_ri(a, b) {
        return new Imaginary(a.r * b.i);
    }

    static Multiply_ir(a, b) {
        return new Imaginary(a.i * b.r);
    }

    static Multiply_cc(a, b) {
        return new Complex(a.r * b.r - a.i * b.i, a.r * b.i - a.i * b.r);
    }

    static Multiply_rc(a, b) {
        return new Complex(a.r * b.r, a.r * b.i);
    }

    static Multiply_cr(a, b) {
        return new Complex(a.r * b.r, a.i * b.r);
    }

    static Multiply_ic(a, b) {
        return new Complex(-(a.i * b.i), a.i * b.r);
    }

    static Multiply_ci(a, b) {
        return new Complex(-(a.i * b.i), a.r * b.i);
    }

    //Dividing

    static Divide_rr(a, b) {
        return new Real(a.r / b.r);
    }

    static Divide_ii(a, b) {
        return new Real(a.i / b.i);
    }

    static Divide_ri(a, b) {
        return new Imaginary(-a.r / b.i);
    }

    static Divide_ir(a, b) {
        return new Imaginary(a.i / b.r);
    }

    static Divide_cc(a, b) {
        var nreal = a.r * b.r + a.i * b.i;
        var nimag = a.r * b.i - a.i * b.r;
        var d = a.r * a.r + a.i * a.i;
        return new Complex(nreal / d, nimag / d);
    }

    static Divide_rc(a, b) {
        throw new Error("Not implemented yet.")
    }

    static Divide_cr(a, b) {
        throw new Error("Not implemented yet.")
    }

    static Divide_ic(a, b) {
        throw new Error("Not implemented yet.")
    }

    static Divide_ci(a, b) {
        throw new Error("Not implemented yet.")
    }

    //Conjugating
    static Conjugate_c(a) {
        return new Complex(a.r, -a.i);
    }
}
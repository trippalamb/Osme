const Real = new require("./Real.js");
const Imaginary = new require("./Imaginary.js");
const Complex = new require("./Complex.js");

//TODO: reorganize these to be in the type files as methods
class OsmeMath {

    //Dividing

    static Divide_ii(a, b) {
        return new Real(a.i / b.i);
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
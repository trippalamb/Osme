class TokenNester {
    ///@tokens: list of raw tokens
    ///@cts: container tokens
    static nest(tokens, cts) {
        
        var nested = [];

        

        while (tokens.length > 0) {

            var type = tokens[0].sub;
            switch(tokens[0].sub){
                case ("expression"):
                    var i = findMatchingIndex(tokens, cts[type].start, cts[type].end);
                    tokens.shift();
                    var nt = { //nested token
                        type: "container",
                        name: cts[type].name,
                        val: this.nest(tokens.splice(0, i - 1), cts)
                    }
                    tokens.shift();
                    nested.push(nt);
                    break;

                case ("vector"):
                    var i = findMatchingIndex(tokens, cts[type].start, cts[type].end);
                    tokens.shift();
                    var val = this.nest(tokens.splice(0, i - 1), cts)
                    val = val.filter((v) => v.sub !== "separator");
                    val.every((v) => v.sub === "number");
                    var nt = { //nested token
                        type: "container",
                        name: cts[type].name,
                        val: val
                    }
                    tokens.shift();
                    nested.push(nt);
                    break;

                case ("tuple"):
                    var i = findMatchingIndex(tokens, cts[type].start, cts[type].end);
                    tokens.shift();
                    var val = this.nest(tokens.splice(0, i - 1), cts)
                    val = val.filter((v) => v.sub !== "separator")
                    var nt = { //nested token
                        type: "container",
                        name: cts[type].name,
                        val: val
                    }
                    tokens.shift();
                    nested.push(nt);
                    break;

                case ("dict"):

                    break;

                default:
                    nested.push(tokens.shift());

            }

        }

        return nested;

    }
}

module.exports = TokenNester;

//finds the index of the end of the token enclosure
//this function takes into account if token enclosure is nested
//@tokens: list of tokens
//@startVal: the value that starts the new token enclosure
//@endVal: the value that ends the new token enclosure
function findMatchingIndex(tokens, startVal, endVal) {

    var i = 1;

    while (i < tokens.length) {
        if (tokens[i].name === startVal) {
            i += findMatchingIndex(tokens.slice(i), startVal, endVal) + 1;
        }
        else if (tokens[i].name === endVal) {
            return i;
        }
        else {
            i++;
        }
    }

    throw new Error("Missing closing '" + endVal + "'");
}

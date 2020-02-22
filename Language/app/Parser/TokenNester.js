class TokenNester {
    ///@tokens: list of raw tokens
    ///@cts: container tokens
    static nest(tokens, cts) {
        
        var nested = [];

        while (tokens.length > 0) {
            if (tokens[0].name === cts[0].start) {
                var i = findMatchingIndex(tokens, cts[0].start, cts[0].end);
                tokens.shift();
                var nt = { //nested token
                    type: "container",
                    name: cts[0].name,
                    val: tokens.splice(0, i - 1)
                }
                tokens.shift();
                nested.push(nt);
            }
            else {
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
            i += findMatchingIndex(tokens.slice(i), startVal, endVal);
        }
        else if (tokens[i].name === endVal) {
            return i;
        }
        else {
            i++;
        }
    }

    throw new Error("Missing closing '" + endChar + "'");
}

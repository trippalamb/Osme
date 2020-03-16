class Glossary {
    constructor(tokenDictionary) {

        this.dict = tokenDictionary;

        this.wordList = buildList(this.dict.words);
        this.wordMatches = this.wordList.map((x) => x.match);

        this.literalList = buildList(this.dict.literals);
        this.literalMatches = this.literalList.map((x) => x.match);

        this.operatorList = buildList(this.dict.operators);
        this.operatorSymbols = this.operatorList.map((x) => x.symbol);

        this.punctuationList = buildList(this.dict.punctuation);
        this.punctuationSymbols = this.punctuationList.map((x) => x.symbol);

        function buildList(dict) {
            var symbolList = [];
            var matchList = [];

            for (const type in dict) {
                for (const name in dict[type]) {

                    if (typeof (dict[type][name].symbol) !== "undefined") {
                        symbolList.push({
                            type: type,
                            name: name,
                            symbol: dict[type][name].symbol,
                            precendence: dict[type][name].precendence,
                            length: dict[type][name].symbol.length
                        });
                    }
                    else {
                        matchList.push({
                            type: type,
                            name: name,
                            match: "^" + dict[type][name].match
                        });
                    }
                }
            }

            symbolList.sort((a, b) => b.length - a.length);
            return matchList.concat(symbolList);
            
        }
    }

}

module.exports = Glossary;
class Glossary {
    constructor(tokenDictionary) {
        this.dict = tokenDictionary;
        this.opList = buildOperatorList(this.dict.operators);
        this.opSymbols = this.opList.map((o) => o.symbol);



        function buildOperatorList(opDict) {
            var opList = [];

            for (const type in opDict) {
                for (const name in opDict[type]) {
                    opList.push({
                        type: type,
                        name: name,
                        symbol: opDict[type][name].symbol,
                        precendence: opDict[type][name].precendence,
                        length: opDict[type][name].symbol.length
                    });
                }
            }

            opList.sort((a, b) => b.length - a.length);
            return opList;
            
        }
    }

}

module.exports = Glossary;
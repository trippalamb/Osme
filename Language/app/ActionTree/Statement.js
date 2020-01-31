const Assignment = require("./Assignment.js");

class Statement{
    constructor(astStatement){
        if(astStatement.type === "assignment"){
            this.content = new Assignment(astStatement);
            this.type = "assignment";
        }
        else{
            throw new Error("only assignment statements are currently supported");
        }
    }

    compileToJS(){

        return this.content.compileToJS();

    }

    eval(){
         if(this.type === "assignment"){
            return this.content.eval();
        }
        else{
            throw new Error("only assignment statements are currently supported in evaluation");
        }
    }

}

module.exports = Statement;

"use strict"


function indexMain(){

    const Language = require("../../Language/app/Language.js");
    const Program = require("../../Language/app/ActionTree/Program.js");
    var editor;

    var osme = new Language("osme");
    $("#btn-compile").on("click", function(){
        var code = editor.getValue();
        var tokens = osme.lex(code);
        var ast = osme.parse(tokens);
        var program = new Program(ast);
        var jsCode = program.compileTo("js");
        $("#compiled-container").text(jsCode);
    });

    $("#btn-eval").on("click", function(){
        var code = editor.getValue();
        var tokens = osme.lex(code);
        var ast = osme.parse(tokens);
        var program = new Program(ast);
        program.eval();
        $("#compiled-container").text(JSON.stringify(program.vm, null, 2));
    });

    //monaco

    const path = require('path');
	const amdLoader = require('../node_modules/monaco-editor/min/vs/loader.js');
	const amdRequire = amdLoader.require;
	const amdDefine = amdLoader.require.define;

	function uriFromPath(_path) {
		var pathName = path.resolve(_path).replace(/\\/g, '/');
		if (pathName.length > 0 && pathName.charAt(0) !== '/') {
			pathName = '/' + pathName;
		}
		return encodeURI('file://' + pathName);
	}

	amdRequire.config({
		baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
	});

	// workaround monaco-css not understanding the environment
	self.module = undefined;

	amdRequire(['vs/editor/editor.main'], function() {
		editor = monaco.editor.create(document.getElementById('container'), {
			value: [
				'x = 30 - 403i'
			].join('\n'),
			language: 'osme'
		});
	});

    
}

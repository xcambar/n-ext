require.paths.unshift('./lib');


//Ext.require('NoSQL.model.Document');

exports.testExtCanSandBox = function(test) {
	test.expect(1);
	var sencha = require('n-ext'); 
	sencha.setPath(__dirname + '/../lib/Ext-core-srv/');
	var e = sencha.bootstrapCore(true);
	test.ok(typeof(Ext) === 'undefined', 'Global variable Ext should not be defined');
	test.done();
}

exports.testExtCanBeGlobal = function(test) {
	test.expect(1);
	var sencha = require('n-ext'); 
	sencha.setPath(__dirname + '/../lib/Ext-core-srv/');
	sencha.bootstrapCore();
	test.ok(typeof(Ext) !== 'undefined', 'Global variable Ext should be defined');
	test.done();
}

exports.testCanRequireExistingExtClasses = function(test){
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

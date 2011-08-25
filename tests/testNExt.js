exports['Ext can be unset by the module'] = function(test){
	test.expect(1);
	var sencha = require('n-ext'); 
	sencha.bootstrapCore();
	sencha.unset();
	test.ok(typeof(Ext) === 'undefined');
	test.done();
};

exports['Ext can be unset and reset safely'] = function(test) {
	test.expect(3);
	var sencha = require('n-ext'); 
	sencha.bootstrapCore();
	test.ok(typeof(Ext) !== 'undefined');
	sencha.unset();
	test.ok(typeof(Ext) === 'undefined');
	sencha.bootstrapCore();
	test.ok(typeof(Ext) !== 'undefined', 'Global variable Ext should be defined');
	test.done();
}
/**
**/
exports['Namespaces can not be loaded if path is undefined'] = function(test) {
	test.expect(1);
	var sencha = require('n-ext');
	sencha.bootstrapCore();
	test.throws(function() {
		Ext.require('Test.Class');
	});
	sencha.unset();
	test.done();
}
exports['Ext is globally defined'] = function(test) {
	test.expect(1);
	var sencha = require('n-ext'); 
	sencha.bootstrapCore();
	test.ok(typeof(Ext) !== 'undefined', 'Global variable Ext should be defined');
	test.done();
}
/**
**/
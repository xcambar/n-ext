var assert = require('assert');
exports['Ext can be unset by the module'] = function(test){
	var sencha = require('n-ext'); 
	sencha.bootstrapCore();
	sencha.unset();
	assert.throws(function() {
		Ext; // Ext is not defined
	});

};

exports['Ext can be unset and reset safely'] = function(test) {
	var sencha = require('n-ext'); 
	sencha.bootstrapCore();
	assert.isDefined(Ext);
	sencha.unset();
	assert.throws(function() {
		Ext; // Ext is not defined
	});
	sencha.bootstrapCore();
	assert.isDefined(Ext);
}

exports['Namespaces can not be loaded if path is undefined'] = function(test) {
	var sencha = require('n-ext');
	sencha.bootstrapCore();
	assert.throws(function() {
		Ext.require('Test.Class');
	});
	sencha.unset();
}
exports['Ext is globally defined'] = function(test) {
	var sencha = require('n-ext'); 
	sencha.bootstrapCore();
	assert.isDefined(Ext);
}

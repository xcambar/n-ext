/**
 * This CLI example demonstrates a number of possible
 * yet basic usages of Ext using the proxy based upon the node-mongodb-native adapter.
 * It is mainly a sandbox for the MongoDB proxy.
 * @link node-mongodb-native https://github.com/christkv/node-mongodb-native
 */

require.paths.unshift('/usr/local/lib/node_modules'); //Specific to my dev environment
var sencha = require('n-ext');
sencha.bootstrapCore();


Ext.require('Next.model.NoSQL.Document');
var store = Ext.create('Ext.data.Store', {
	model: 'Next.model.NoSQL.Document',
	autoLoad: {
		callback: function(records, operation, success) {
			console.log('The collection has ' + this.getCount() + ' items.');

		}
	}
});

var model = Ext.create('Next.model.NoSQL.Document', {
    'number' : Math.round(Math.random()*1000)
});
model.save({
    callback: function() {
        console.log('Done');
    },
    failure: function() {
        console.log('failure!');
    },
    success: function() {
        console.log(this.getId());
    }
});

require.paths.unshift('/usr/local/lib/node_modules');
require.paths.unshift('./../lib');

var sencha = require('n-ext');
sencha.setPath(__dirname + '/../lib/Ext-core-srv/'); //Path
sencha.bootstrapCore();


Ext.require('NoSQL.model.Document');
var store = Ext.create('Ext.data.Store', {
	model: 'NoSQL.model.Document',
	autoLoad: {
		callback: function(records, operation, success) {
			//Counts the number of items in the collection
			console.log('The collection has ' + this.getCount() + ' items.');
			//Retrieves an object
			var obj = store.getById('b51c524e45d38b3100000000');
			//Updates the object
			obj.set('ga', true);
			obj.save();
		}
	}
});

var model = Ext.create('NoSQL.model.Document', {
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

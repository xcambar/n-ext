require.paths.unshift('/usr/local/lib/node_modules'); //Specific to my dev environment

var sencha = require('n-ext');
sencha.bootstrapCore();


Ext.require('NoSQL.model.Document');
var store = Ext.create('Ext.data.Store', {
	model: 'NoSQL.model.Document',
	autoLoad: {
		callback: function(records, operation, success) {
			//Counts the number of items in the collection
			console.log('The collection has ' + this.getCount() + ' items.');
			//Retrieves and updates an object
			//var obj = store.getById('4b65524e0c41b12600000000');
			//obj.set('ga', true);
			//obj.update();
			//obj.destroy();
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

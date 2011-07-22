require.paths.unshift('/usr/local/lib/node_modules');
require.paths.unshift('./../lib');

var sencha = require('n-ext');
sencha.setPath(__dirname + '/../lib/Ext-core-srv/'); //Path
sencha.bootstrapCore();


console.log('start');


Ext.require('NoSQL.model.Document');
var store = Ext.create('Ext.data.Store', {
	model: 'NoSQL.model.Document',
	autoLoad: {
		callback: function(records, operation, success) {
			//console.log('records: ', records);
			console.log(this.getCount());
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
console.log('end');

/**
**/
require.paths.unshift('./../lib');
require.paths.push('/usr/local/lib/node_modules');


var sencha = require('n-ext'); 
sencha.setPath(__dirname + '/../lib/Ext-srv/');
sencha.bootstrapCore();

Ext.Loader.setPath('NoSQL', __dirname + '/../lib/NoSQL');

Ext.require('NoSQL.model.Document');
console.log('start');
/**
var store = new Next.data.Store({
	model: 'NoSQL.model.Document',
	autoLoad: {
		callback: function(records, operation, success) {
			console.log('records: ', records);
			console.log(this.getCount());
			this.getProxy().close();
		}
	}
});
**/

var model = Ext.create('NoSQL.model.Document', {
    'a' : '987',
    onReady: function() {
		model.save();
		console.log('end');
    }
});
//console.log(store.load().data.items);


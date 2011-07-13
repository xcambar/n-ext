require.paths.unshift('./../lib');

var sencha = require('n-ext'); 
sencha.setPath(__dirname + '/../lib/Ext-srv/');
sencha.bootstrapCore();

Ext.Loader.setPath('NoSQL', __dirname + '/../lib/NoSQL');


var store = new Ext.data.Store({
	model: 'NoSQL.model.Document',
	autoLoad: true
});
	
var model = Ext.create('NoSQL.model.Document', {
    'name' : 'XC',
    'id'   : 3
});
model.save();
console.log(store.load().data.items);

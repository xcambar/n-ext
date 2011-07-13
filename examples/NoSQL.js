require.paths.unshift('./../lib');

var sencha = require('n-ext'); 
sencha.setPath(__dirname + '/../lib/Ext/src/');
sencha.bootstrapCore();

Ext.Loader.setPath('NoSQL', __dirname + '/../lib/NoSQL');

var model = Ext.create('NoSQL.model.Document', {
    'name' : 'XC'
});

model.save();

var store = new Ext.data.Store({model: 'NoSQL.model.Document'});
console.log(store.load());

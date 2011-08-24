require.paths.unshift('/usr/local/lib/node_modules');
var sencha = require('n-ext');
sencha.bootstrapCore();
sencha.enableNSAutoloader();
Ext.require('NoSQL.model.Document');

var d = Ext.create('NoSQL.model.Document');

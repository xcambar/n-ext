/**
 * This is a minimalistic example that shows how to bootstrap
 * the library in order to use ExtJS in a Node.JS environment
 */

require.paths.unshift('/usr/local/lib/node_modules');
var sencha = require('n-ext');
sencha.bootstrapCore();


//That's all that is required to be able to use the data package of ExtJS in a node environment
Ext.require('NoSQL.model.Document');
var d = Ext.create('NoSQL.model.Document');

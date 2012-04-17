/**
 * This is a minimalistic example that shows how to bootstrap
 * the library in order to use ExtJS in a Node.JS environment
 */

var sencha = require('n-ext');
sencha.bootstrapCore();
Ext.Loader.setPath('Next', 'lib/Next');


//That's all that is required to be able to use the data package of ExtJS in a node environment
Ext.require('Next.model.NoSQL.Document');
var d = Ext.create('Next.model.NoSQL.Document');

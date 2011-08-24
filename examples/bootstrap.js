require.paths.unshift('./lib');

var sencha = require('n-ext'); 
sencha.setPath(__dirname + '/lib/Ext-core-srv/');
var Ext = sencha.bootstrapCore(true);

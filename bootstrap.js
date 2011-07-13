require.paths.unshift('./lib');

var sencha = require('n-ext'); 
sencha.setDebug(true);
sencha.setPath(__dirname + '/lib/Ext-srv/');
var E = sencha.bootstrapCore(true);
//sencha.bootstrapCore(false); //with the param set to false, Ext is available app-wide

//Ext.Loader.setPath('Xc', __PROJECT_DIR + '/library/Xc');
//Ext.Loader.setPath('Tab', __PROJECT_DIR + '/library/Tab');

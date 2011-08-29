/**
 * This example demonstrates that used with a micro framework like Express
 * one can build quickly an API which model fits line by line
 * with the one used client-side 
 * 
 * @link Express Framework (https://github.com/visionmedia/express) 
 */

require.paths.unshift('/usr/local/lib/node_modules'); //specific to my dev environment
try {
	var util = require('util');
	var sencha = require('n-ext');
	sencha.bootstrapCore();
	sencha.addLibPath(__dirname + '/lib/');
	var express = require('express');
} catch (e) {
	util.debug(e.toString());
	util.debug(e);
	process.exit();
}

Ext.require('Next.model.NoSQL.Document');
var app = express.createServer();
app.use(express.bodyParser());

var router = Ext.create('Next.router', {
	path: __dirname + '/config/routes.json',
	app: app
});
router.handle();

app.listen(3000);
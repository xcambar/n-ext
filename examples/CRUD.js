/**
 * This example demonstrates that used with a micro framework like Express
 * one can build quickly an API which model fits line by line
 * with the one used client-side 
 * 
 * @link Express Framework (https://github.com/visionmedia/express) 
 */

require.paths.unshift('/usr/local/lib/node_modules'); //specific to my dev environment
try {
	var sencha = require('n-ext');
	sencha.bootstrapCore();
	var util = require('util');
	var express = require('express');
} catch (e) {
	util.debug(e.toString());
	util.debug(util.inspect(e));
	process.exit();
}

Ext.require('Next.model.NoSQL.Document');
var app = express.createServer();
app.use(express.bodyParser());

/**
 * List the items in the Doc collection
 */
app.get('/doc/:start?/:limit?', function(req, res, next) {
	if (req.params.start && !req.params.limit) {
		next();
		return;
	}
	var store = Ext.create('Next.data.Store.Mongo', {
		autoLoad: {
			skip: req.params.start,
			limit: req.params.limit,
			callback: function(records, operation, success) {
				var _array = new Array();
				Ext.Array.forEach(records, function(item){
					var data = item.data;
					data[item.idProperty] = item.data._id.toString();
					_array.push(data);
				})
				res.json(_array);
			}
		}
	});
});

/**
 * Count the items in the Doc collection
 */
app.get('/doc/count', function(req, res) {
	var store = Ext.create('Next.data.Store.Mongo');
	store.load(function() {
		res.send(store.getTotalCount().toString());
	});
});

/**
 * Creates an item
 */
app.post('/doc', function(req, res) {
	var model = Ext.create('Next.model.NoSQL.Document');
	model.set(req.body);
	model.save({
	    failure: function() {
	        res.json({
	        	'status': 'Unable to save the data'
	        }, 500);
	    },
	    success: function() {
	        res.json({'id' : this.get(this.idProperty.toString())});
	    }
	});
});


/**
 * Retrieves an item by its id
 */
app.get('/doc/:id', function(req, res) {
	var store = Ext.create('Next.data.Store.Mongo');
	store.getById(req.params.id, function(obj) {
		res.json(obj ? obj.data : null);
	});
});

/**
 * Updates an item by its id
 */
app.put('/doc/:id', function(req, res) {
	var store = Ext.create('Next.data.Store.Mongo');
	store.getById(req.params.id, function(obj) {
		if (obj === null) {
			res.json({
				'status': 'error',
				'message' : 'No data with ID: ' + req.params.id
			}, 400);
		} else {
			var body = req.body;
			for (var idx in body) {
				obj.set(idx, body[idx]);
			}
			obj.save();
			res.send(obj.data);
		}
	});
});

/**
 * Deletes an item by its id
 */
app.del('/doc/:id', function(req, res) {
	var store = Ext.create('Next.data.Store.Mongo');
	
	store.getById(req.params.id, function(obj) {
		if (obj === null) {
			res.json({
				'status': 'error',
				'message' : 'No data with ID: ' + req.params.id
			}, 400);
		} else {
			obj.destroy({
				success: function() {
					res.send(obj.data);
				},
			    failure: function() {
			        res.json({
			        	'status': 'Unable to save the data'
			        }, 500);
			    },
			});
		}
	});
});

app.listen(3000);
require.paths.unshift('/usr/local/lib/node_modules'); //specific to my dev environment
var express = require('express');
var sencha = require('n-ext');
sencha.bootstrapCore();

Ext.require('NoSQL.model.Document');
var app = express.createServer();
app.use(express.bodyParser());

/**
 * List the items in the Doc collection
 */
app.get('/doc', function(req, res) {
	var store = Ext.create('Ext.data.Store', {
		model: 'NoSQL.model.Document',
		autoLoad: {
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
	var store = Ext.create('Ext.data.Store', {
		model: 'NoSQL.model.Document',
		autoLoad: {
			callback: function(records, operation, success) {
				res.send(this.getCount().toString());
			}
		}
	});
});

/**
 * Creates an item
 */
app.post('/doc', function(req, res) {
	var model = Ext.create('NoSQL.model.Document');
	for(var idx in req.body) {
		model.set(idx, req.body[idx]);
	}
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
	var store = Ext.create('Ext.data.Store', {
		model: 'NoSQL.model.Document',
		autoLoad: {
			callback: function(records, operation, success) {
				var obj = store.getById(req.params.id);
				res.json(obj ? obj.data : null);
			}
		}
	});
});

/**
 * Updates an item by its id
 */
app.put('/doc/:id', function(req, res) {
	var store = Ext.create('Ext.data.Store', {
		model: 'NoSQL.model.Document',
		autoLoad: {
			callback: function(records, operation, success) {
				var obj = store.getById(req.params.id);
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
			}
		}
	});
});

/**
 * Deletes an item by its id
 */
app.del('/doc/:id', function(req, res) {
	var store = Ext.create('Ext.data.Store', {
		model: 'NoSQL.model.Document',
		autoLoad: {
			callback: function(records, operation, success) {
				var obj = store.getById(req.params.id);
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
			}
		}
	});
});

app.listen(3000);
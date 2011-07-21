Ext.define('NoSQL.data.proxy.Mongo', {
	extend: 'Ext.data.proxy.Proxy',
	constructor: function() {
		NoSQL.data.proxy.Mongo.superclass.constructor.apply(this, arguments);
		var mongo = require('mongodb'),
			Db = mongo.Db,
			Connection = mongo.Connection,
			Server = mongo.Server,
			host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost',
			port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT,
			me = this;
		this.db = new Db('simple', new Server(host, port, {}), {native_parser:true});
		this.db.open(function(err, db) {
			db.collection('test', function(err, collection) {
				me.collection = collection;
				me.fireEvent('collectionReady');
			});
		});
		var me = this;
	},
	alias: 'proxy.mongo',
	create: function(operation, callback, scope) {
		var me = this;
		console.log('creating');
		operation.setStarted();
		if (!this.collection) {
			operation.setException('collection not ready');
			return;
		}
		console.log(operation.records);
		for(var obj in operation.getRecords()) {
			this.collection.insert(obj);
		}
	},
	read: function(operation, callback, scope) {
		var me = this,
			myCollection = [],
			model = this.model;
		console.log('reading');
		operation.setStarted();
		if (!this.collection) {
			operation.setException('collection not ready');
			return;
		}
		this.collection.find(function(err, cursor) {
            cursor.each(function(err, item) {
	    		if(item != null) {
	    			var obj = new model(item);
		  			myCollection.push(obj);
				}
				// Null signifies end of iterator
				if(item == null) {
				    me.requestComplete.call(me, operation, callback, scope, myCollection);
				}
			});			
		});
	},
	update: function() {
		console.log('updating');
//		console.log(arguments);
	},
	destroy: function() {
		console.log('destroying');
	},
	requestComplete: function(operation, callback, scope, myCollection) {
		operation.resultSet = Ext.create('Ext.data.ResultSet', {
		    records: myCollection,
		    total  : myCollection.length,
		    loaded : true
		});
		operation.setSuccessful();
		operation.setCompleted();
		var _callback = callback || Ext.emptyFn;
		
		_callback.call(scope, operation);
	},
	close: function() {
		this.db.close();
	}
});

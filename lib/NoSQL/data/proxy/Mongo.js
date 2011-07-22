Ext.define('NoSQL.data.proxy.Mongo', function() {
    var _collectionName,
        _collection,
        _db;
    var _wrapSingleAction = function(actionName, currentAction) {
        var newAction = function() {
            var _args = arguments,
                me = this;
            if (_db.state !== 'connected') {
                _db.open(function(err, db) {
                    if (db === null) {
                        if (_db !== null) {
                            if (err && (_db.state !== 'connected')) {
                                Ext.Error.raise(err);
                            } else {
                                db = _db;
                            }
                        }
                    }
                    
                    db.collection(_collectionName, function(err, collection) {
                        if (!collection && err) {
                            Ext.Error.raise(err.message);
                        }
                        _collection = collection;
                        currentAction.apply(me, _args);
                    });
                });
            } else {
                currentAction.apply(me, _args);
            }
        };
        this[actionName] = newAction;
    };
    var _wrapActions = function(actions) {
        for (var actionIndex in actions) {
            var actionName = actions[actionIndex],
                currentAction = this[actionName],
                me = this;
            _wrapSingleAction.call(this, actionName, currentAction);
        }
    };
    return {
    	extend: 'Ext.data.proxy.Proxy',
    	constructor: function(config) {
            if (!config.db) {
                Ext.Error.raise('A database name is required to perform operations');
            }
            var dbName = config.db;
            delete config.db;
            if (!config.collection) {
                Ext.Error.raise('A collection name is required to perform operations');
            }
            _collectionName = config.collection;
            delete config.collection;
    		NoSQL.data.proxy.Mongo.superclass.constructor.apply(this, arguments);
    		var mongo = require('mongodb'),
    			Db = mongo.Db,
    			Connection = mongo.Connection,
    			Server = mongo.Server,
    			host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost',
    			port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT,
    			me = this;
    		_db = new Db(dbName, new Server(host, port, {}), {native_parser:true});
    		this._count = 0;
    		console.log('I ' + this._count);
    		_wrapActions.call(this, ['read', 'update', 'destroy', 'create']);
    	},
    	alias: 'proxy.mongo',
    	create: function(operation, callback, scope) {
            this._count++;
            console.log('C ' + this._count);
            var me = this;
            console.log('creating');
            operation.setStarted();
            if (!_collection) {
                console.log('collection not ready');
                operation.setException('collection not ready');
                return;
            }
            for(var obj in operation.records) {
                var _primary = _db.pkFactory.createPk(),
                    _record  = operation.records[obj],
                    _data = _record.data;
                _data[_record.idProperty] = _primary;
                _collection.insert(_data);
                _record.setId(_primary);
                _record.phantom = false;
                _record.commit();
            }
            me.requestComplete.call(me, operation, callback, scope, operation.records);
    	},
    	read: function(operation, callback, scope) {
            this._count++;
            console.log('R ' + this._count);
    		var me = this,
    			myCollection = [],
    			model = this.model;
    		console.log('reading');
    		operation.setStarted();
    		if (!_collection) {
    			operation.setException('collection not ready');
    			return;
    		}
    		_collection.find(function(err, cursor) {
                cursor.each(function(err, item) {
    	    		if(item != null) {
    	    			var obj = new model(item);
    		  			myCollection.push(obj);
    				}
    				// Null signifies end of iterator
    				if(item == null) {
    				    console.log('finished reading');
    				    me.requestComplete.call(me, operation, callback, scope, myCollection);
    				}
    			});			
    		});
    	},
    	update: function() {
            this._count++;
    		console.log('updating');
    //		console.log(arguments);
    	},
    	destroy: function(operation, callback, scope) {
            this._count++;
    		console.log('R ' + this._count);
    		console.log('destroying');
            var me = this,
                model = this.model;
            operation.setStarted();
            if (!_collection) {
                operation.setException('collection not ready');
                return;
            }
            _collection.find(function(err, cursor) {
                cursor.each(function(err, item) {
                    if(item != null) {
                        var obj = new model(item);
                        myCollection.push(obj);
                    }
                    // Null signifies end of iterator
                    if(item == null) {
                        console.log('finished reading');
                        me.requestComplete.call(me, operation, callback, scope, myCollection);
                    }
                });         
            });
    	},
    	requestComplete: function(operation, callback, scope, myCollection) {
    	    --this._count;
    	    console.log('RC ' + this._count);
    		operation.resultSet = Ext.create('Ext.data.ResultSet', {
    		    records: myCollection,
    		    total  : myCollection.length,
    		    loaded : true
    		});
    		operation.setSuccessful();
    		operation.setCompleted();
    		var _callback = callback || Ext.emptyFn;
    		
    		_callback.call(scope, operation);
            if ((this._count === 0) && (_db.state === 'connected')) {
                _db.close();
            }
    	},
    	
	}
}());

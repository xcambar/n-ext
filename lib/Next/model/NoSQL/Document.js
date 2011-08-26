Ext.require('Next.data.proxy.Mongo');
Ext.require('Ext.data.Store');

Ext.define('Next.model.NoSQL.Document', {
    extend: 'Ext.data.Model',
    constructor: function() {
    	this.callParent(arguments);
    	this.store = new Ext.data.Store({
    		model: Ext.getClassName(this)
    	});
    },
    idProperty: '_id',
//    fields: [ //Optional. In Mongo we use Documents, not tables.
//        {name: 'number', type: 'int'} 
//    ],
    proxy: {
        type: 'mongo',
        db: 'test',
        collection: 'simple',
        reader: {
            type: 'json'
        }
    },
    getId: function() {
    	var objectID = this.callParent();
    	if (objectID) {
	    	return objectID.toHexString();
    	}
    	return null;
    }
});

Ext.require('NoSQL.data.proxy.Mongo');
Ext.require('Next.data.Store');

Ext.define('NoSQL.model.Document', {
    extend: 'Ext.data.Model',
    constructor: function() {
    	this.callParent(arguments);
    	this.store = new Next.data.Store({
    		model: Ext.getClassName(this),
    		onReady: arguments[0].onReady
    	});
    },
    idProperty: '_id',
    fields: [
        {name: 'number', type: 'int'} 
    ],
    proxy: {
        type: 'mongo',
        db: 'test',
        collection: 'simple',
        reader: {
            type: 'json',
            root: 'docs'
        }
    }
});

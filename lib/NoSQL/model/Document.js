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
        {name: '_id', type: 'string'},
        {name: 'a', type: 'int'} 
    ],
    proxy: {
        type: 'mongo',
        reader: {
            type: 'json',
            root: 'docs'
        }
    }
});

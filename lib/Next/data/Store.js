Ext.define('Next.data.Store', {
	extend: 'Ext.data.Store',
	constructor: function() {
	    this.callParent(arguments);
		/**
		this.getProxy().on('ready', function() { // Debug purposes
			console.log('collection ready');
		});
		**/
		this.getProxy().addListener('ready', arguments[0].onReady || Ext.emptyFn);
	}
})

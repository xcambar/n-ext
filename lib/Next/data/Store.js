Ext.define('Next.data.Store', {
	extend: 'Ext.data.Store',
	constructor: function() {
		this.callParent(arguments);
		this.getProxy().addListener('collectionReady', function() {
			console.log('collection ready');
		});
		this.getProxy().addListener('collectionReady', arguments[0].onReady);
	}
})

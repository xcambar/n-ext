Ext.define('Next.data.Store.Mongo', {
	extend: 'Ext.data.Store',
	model : 'Next.model.NoSQL.Document',
	constructor: function() {
		this.callParent(arguments);
	},
	getById: function(_id, callback) {
		var obj;
		if (this.isLoaded()) {
			obj = this.callParent([_id]);
		}
		if (obj) {
			(callback || Ext.emptyFn).call(this, obj);
		} else {
			var me = this,
			    op = new Ext.data.Operation({
				action: 'read',
				callback: function(records, operation, success) {
					(callback || EmptyFn).call(me, records[0]);
				},
				limit: 1,
				scope: this,
				criteria: {_id : this.getProxy().createObjectIDFromHexString(_id)}
			});
			this.read(op);
		}
	},
	isLoaded: function() {
		return typeof(this.totalCount) !== 'undefined';
	}
})

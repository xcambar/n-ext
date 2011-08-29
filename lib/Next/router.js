Ext.define('Next.router', {
	app: null,
	constructor: function(config) {
		if (!config.app) {
			Ext.Error.raise({
				msg: 'no Application provided'
			});
		}
		this.app = config.app;
		if (!config.path) {
			Ext.Error.raise({
				msg: 'no route file specified'
			});
		}
		this.routes = config.path;
	},
	handle: function() {
		var me = this;
		try {
			var routeConfig = require(this.routes);
		} catch (e) {
			console.error(e);
			Ext.Error.raise({
				msg: e
			});
		};
		Ext.Array.each(routeConfig.routes, function(item, index, all) {
			var handler;
			if (item.handlerCls) {
				handler = Ext.create(item.handlerCls)[item.method];
			} else {
				var handlerConf = item.handler;
				handler = Ext.create(handlerConf.class)[handlerConf.method];
			}
			me.app[Ext.util.Format.lowercase(item.method)].call(me.app, item.route, handler);
		})
	}
})
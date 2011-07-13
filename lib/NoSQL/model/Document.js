var data = {
    docs: [
        {
            id: 1,
            name: 'Ed Spencer'
        },
        {
            id: 2,
            name: 'Abe Elias'
        }
    ]
};

Ext.define('NoSQL.model.Document', {
    requires: [
        'Ext.data.proxy.Memory'
    ],
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'} 
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'docs'
        },
        data: data
    }
});


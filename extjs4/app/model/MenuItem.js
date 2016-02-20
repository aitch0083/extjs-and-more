Ext.define('ExtJS4.model.MenuItem', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id' },
		{ name: 'text', type: 'string' },
		{ name: 'action', type: 'string', defaultValue:'' },
	]
});
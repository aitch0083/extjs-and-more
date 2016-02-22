Ext.define('ExtJS5.view.Detail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.extjs5-detail-form',

	requires: [
		'ExtJS5.view.DetailViewModel'
	],

	title: 'Detail Form',
	frame: true,
	padding: 10,

	viewModel: [
		{ type: 'extjs5-viewmodel-detailviewmodel' }
	],

	columnWidth: 0.5,

	items : [
        {
            xtype      : 'textfield',
            bind       : '{record.name}',
            fieldLabel : 'Name'
        },
		{
            xtype      : 'textfield',
            bind       : '{record.email}',
            fieldLabel : 'Email'
        },
        {
            xtype      : 'textfield',
            bind       : '{record.phone}',
            fieldLabel : 'Phone'
        },
        {
            xtype : 'hiddenfield',
            bind  : '{record.id}'
        },
        {
            xtype  : 'button',
            text   : 'Save',
            itemId : 'SaveRecord'
        }
    ]
});
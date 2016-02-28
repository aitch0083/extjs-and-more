Ext.define('ExtJS5.view.Detail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.extjs5-detail-form',

	title: 'Detail Form',
	frame: true,
	padding: 10,

    requires: [
        'ExtJS5.view.DetailViewModel'
    ],

	viewModel: [
		{ type: 'extjs5-viewmodel-detailviewmodel' }
	],

	columnWidth: 0.5,

	items : [
        {
            xtype      : 'textfield',
            bind       : '{magic_record.name}',
            fieldLabel : 'Name'
        },
		{
            xtype      : 'textfield',
            bind       : '{magic_record.email}',
            fieldLabel : 'Email'
        },
        {
            xtype      : 'textfield',
            bind       : '{magic_record.phone}',
            fieldLabel : 'Phone'
        },
        {
            xtype : 'hiddenfield',
            bind  : '{magic_record.id}'
        },
        {
            xtype  : 'button',
            text   : 'Save',
            itemId : 'SaveRecord'
        }
    ]
});
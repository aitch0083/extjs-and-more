exports.main_border_panel = {
	xtype:  'panel',
	layout: 'border',
	title:  'Main',
	items: [
		{
			id:          'MainMenu',
			title:       'Navigation',
			xtype:       'panel',
			alias:       'widget.mainMenu',
			region:      'west',
			layout:      'anchor',
			width:       200,
			split:       true,
			collapsible: true
		},//eo Navigation panel
		{
			id:          'MainContainer',
			title:       'Container',
			xtype:       'tabpanel',
			layout:      'fit',
			region:      'center',
			bodyPadding: 10,
			frame:       true,
			overflowY:   'auto',
			itemCls: 	 'container-entry'
		}//eo Container panel
	],
	onRender: function(){
		console.info('Main Border Panel in the house');
	}
};
Ext.define('ExtJS5.controller.MainMenu', {
	extend: 'ExtJS5.controller.Basic',

	requires: [
		'Ext.tree.Panel'
	],

	stores:[
		'MenuItems'
	],

	init: function(config){

		var user = Ext.util.Cookies.get('user');
		user = Ext.decode(user);

		var mainMenu = Ext.getCmp('MainMenu');
		var treeMenu = Ext.create('Ext.tree.Panel',{
			id:          'MainMenuTree',
			rootVisible: false,
			animate:     false,
			layout:      'vbox',
			flex:        1,
			border:      false,
			store:       'MenuItems',
			anchor:      '100% 50%',
		});

		var infoPanel = Ext.create('Ext.panel.Panel', {
			id:          'MainMenuInfoPanel',
			title:       'Info',
			anchor:      '100% 50%',
			layout:      'fit',
			bodyPadding: 10,
			border:      false,
			tools:       [
                { type:'pin' },
                { type:'refresh' },
                { type:'search' },
                { type:'save' }
            ],
            html: (new Ext.Template('<h5>Welcom, {name}</h5><p>Your last login time: {time}</p>')
            				.apply({name:user.username, time:user.login_time}))
		});

		mainMenu.add(treeMenu);
		mainMenu.add(infoPanel);

		this.control({
			'[id=MainMenuTree]' : {
				select: this.onNodeSelected
			}
		});

		this.callParent(config);
	},//eo init

	onNodeSelected: function(node, record, index, eOpts){
		var action = record.get('action');

		if(action){
			//fire the event to someone who is insterested with
			this.fireEvent('fireInHole', { action: action });
		}
	},//onNodeSelected

	onFireHandler: function(action){

	}
});
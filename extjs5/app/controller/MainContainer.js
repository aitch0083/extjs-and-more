Ext.define('ExtJS5.controller.MainContainer', {
	extend: 'ExtJS5.controller.Basic',
	
	requires: [
		'Ext.tree.Panel',
		'Ext.tab.Panel',
		'Ext.fx.target.Sprite',
		'ExtJS5.view.Detail',
		'ExtJS5.view.Master'
	],

	listeners: {
		fireInHole : {
			fn: function(action){
				console.info('onFireHandler:', action);
			}
		}
	},

	views:[
		'UserGrid',
		'Detail',
		'Master'
	],

	stores: [
		'ExtJS5.store.chart.HitRecords',
		'ExtJS5.store.chart.HitRecords2',
		'ExtJS5.store.chart.HitRecords3',
		'ExtJS5.store.chart.HitRecords4',
		'ExtJS5.store.chart.Browsers',
		'ExtJS5.store.chart.IncomeRecords',
		'ExtJS5.store.chart.IncomeRecords2',
		'ExtJS5.store.chart.RadarRecords',
		'ExtJS5.store.chart.RadarRecords2',
		'Users',
		'People'
	],

	init: function(config){

		this.control({
			'[id=MainContainer]' : {
				render: this.onMainContainerRender
			}
		});

		this.listen({
			controller : {
				//or use this '*'
				'#MainMenu' : {
					fireInHole: function(params){
						Ext.getCmp('MainContainer').setTitle(params.action);
					}
				}
			}
		});

		this.callParent(config);

		this.onMainContainerRender({target:{id:'MainContainer'}});
	},//eo init

	onMainContainerRender: function(event){
		var container = Ext.getCmp(event.target.id);
		var user      = Ext.decode(Ext.util.Cookies.get('user'));
		var i         = 0;

		var char_container = Ext.create('Ext.panel.Panel', {
			layout: 'column',
			title: 'Charts',
			glyph: 99,
			autoScroll: true
		});

		var grid_container = Ext.create('Ext.panel.Panel', {
			layout: 'fit',
			title: 'Grid',
			glyph: 42,
			items: [
				{ xtype: 'userGrid', store: 'Users' }
			]
		});

		var people_container = Ext.create('Ext.panel.Panel', {
			layout: 'column',
			title: 'MVVM - Example',
			glyph: 120,
			items: [
				{xtype: 'extjs5-master-grid', flex: 2},
				{xtype: 'extjs5-detail-form', flex: 1}
			],
		});

		container.add(char_container);
		container.add(grid_container);
		container.add(people_container);
		container.setActiveTab(0);

		var timer = setInterval(function(){
			if(i < 32){
				i++;
				char_container.add({
					xtype:'panel',
					title: 'Panel ' + i,
					columnWidth: 0.25,
					height: 250,
					layout: 'fit',
					cls: 'container-entry',
					tools: [
						{ 
							type:'refresh', 
							handler: function(event){
								var toolbar = Ext.getCmp(event.target.parentElement.id);
								var panel   = Ext.getCmp(toolbar.toolOwner.id);
								var chart   = Ext.getCmp(panel.items.items[0].id);
								chart.getStore().reload();
							} 
						},
					],
					loader: {
                        loadMask: true,
                        url: '/api/getGraph',
                        renderer: 'component',
                        params: {
                            user_token : user._id
                        },
                        autoLoad: true
                    }
				});	
			} else {
				clearInterval(timer);
			}
		}, 100);
	}
});
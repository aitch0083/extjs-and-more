Ext.define('ExtJS4.controller.MainContainer', {
	extend: 'ExtJS4.controller.Basic',
	
	requires: [
		'Ext.tree.Panel',
		'Ext.fx.target.Sprite'
	],

	listeners: {
		fireInHole : {
			fn: function(action){
				console.info('onFireHandler:', action);
			}
		}
	},

	stores: [
		'ExtJS4.store.chart.HitRecords',
		'ExtJS4.store.chart.HitRecords2',
		'ExtJS4.store.chart.HitRecords3',
		'ExtJS4.store.chart.HitRecords4',
		'ExtJS4.store.chart.Browsers',
		'ExtJS4.store.chart.IncomeRecords',
		'ExtJS4.store.chart.IncomeRecords2',
		'ExtJS4.store.chart.RadarRecords',
		'ExtJS4.store.chart.RadarRecords2'
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
		var timer     = setInterval(function(){
			if(i < 32){
				i++;
				container.add({
					xtype:'panel',
					title: 'Panel ' + i,
					columnWidth: 0.25,
					height: 250,
					layout: 'fit',
					tools: [
						{ 
							type:'refresh', 
							handler: function(event){
								var toolbar = Ext.getCmp(event.target.parentElement.id);
								var panel = Ext.getCmp(toolbar.toolOwner.id);
								var chart = Ext.getCmp(panel.items.items[0].id);
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
Ext.define('ExtJS6.controller.Main', {
	extend: 'Ext.app.Controller',
	counterTmpl : 'Panel: {count} rendered...',
	statics: {
		counter : 0
	},
    requires: [
    	'Ext.util.Cookies'
    ],
    init: function(){

    	this.counterTmpl = new Ext.Template(this.counterTmpl);

    	this.control({
    		'viewport > panel': { 
    			render: this.onPanelRender 
    		},
    		'viewport > loginForm button[action=submit]' : {
    			click: function(button){

    				console.info('login form button clicked...');

    				var form_ele = button.up('loginForm');
    				var form     = form_ele.getForm();

    				if(form.isValid()){
	    				form.submit({
	    					success : function(form, action){

	    						console.info('login succeed');

	                            form_ele.el.addCls('label-success')
	                                .removeCls('label-danger label-info')
	                                .setHTML('Login...');

	                            Ext.util.Cookies.set('user_token', action.result.extra._id);
	                            Ext.util.Cookies.set('user',       Ext.encode(action.result.extra));

	                            var cmp = Ext.create('Ext.Viewport', {
	                                renderTo: Ext.getBody(),
	                                layout: 'fit',
	                                alias: 'widget.dynamicViewport',
	                                loader: {
	                                    loadMask: true,
	                                    url: '/api/getDash',
	                                    renderer: 'component',
	                                    params: {
	                                        user_token : action.result.extra._id
	                                    },
	                                    success: function(){
	                                		ExtJS6.getApplication().getController('MainMenu');
	                                		ExtJS6.getApplication().getController('MainContainer');
	                                	}
	                                }
	                            });

	                            cmp.getLoader().load();
	    					},//eo success
	    					failure : function(form, action){

	    						console.info('login failed');

	    						form_ele.el.down('.custom-label')
	                                .removeCls('label-info')
	                                .addCls('label-danger')
	                                .setHTML('Unalbe to find your auth info.');
	    					}//eo failure
	    				});
	    			}//eo if
    			}//eo click handler
    		}//eo button[action=submit]
    	});//eo this.control
    },//eo init

    onPanelRender: function(){
    	console.info(this.counterTmpl.apply({count: ++ExtJS6.controller.Main.counter}));
    },//onPanelRender
});

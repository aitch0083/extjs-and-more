Ext.define('ExtJS6.store.MenuItems', {
	extend : 'Ext.data.TreeStore',
	requires: [
    	'Ext.util.Cookies'
    ],
	autoload: true,
	model: 'ExtJS6.model.MenuItem',
	proxy: {
        type: 'ajax',
        url: '/api/getMainMenu',
        actionMethods: {
        	read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'children',
            successProperty: 'success',
            idProperty: 'id'              
        }
    },//eo proxy
	
	rootProperty: {
		text: 'ROOT',
		expanded: true
	},//eo root

	listeners: {
		//Inject the extra parameters
		beforeload: function(store, operation, eOpts){
			//operation.params.user_token = Ext.util.Cookies.get('user_token');
			store.getProxy().setExtraParam('user_token', Ext.util.Cookies.get('user_token'));
		}
	}
});
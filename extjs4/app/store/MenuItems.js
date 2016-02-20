Ext.define('ExtJS4.store.MenuItems', {
	extend : 'Ext.data.TreeStore',
	requires: [
    	'Ext.util.Cookies'
    ],
	autoload: true,
	model: 'ExtJS4.model.MenuItem',
	proxy: {
        type: 'ajax',
        url: '/api/getMainMenu',
        actionMethods: {
        	read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'children',
            successProperty: 'success',
            idProperty: 'id'              
        }
    },//eo proxy
	
	root: {
		text: 'ROOT',
		expanded: true
	},//eo root

	listeners: {
		//Inject the extra parameters
		beforeload: function(store, operation, eOpts){
			operation.params.user_token = Ext.util.Cookies.get('user_token');
		}
	}
});
Ext.define('ExtJS4.controller.Main', {
    extend: 'Ext.app.Controller',
    init : function(){
    	this.control({
    		'viewport > panel' : { render : this.onPanelRender }
    	});
    },

    onPanelRender : function(){
    	console.info('Panel rendered');
    }
});

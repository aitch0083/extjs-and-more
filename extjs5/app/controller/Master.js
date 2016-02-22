Ext.define('ExtJS5.controller.Master', {
    extend : 'Ext.app.Controller',

    requires: [
    	'ExtJS5.view.Master',
    	'ExtJS5.view.Detail',
    ],

    init: function() {
         this.control({
             'extjs5-master-grid': {
                 select : this.onGridSelect
             }
         });
     },
    
    onGridSelect : function(grid, record, index, eOpts) {
        var detailView = Ext.ComponentQuery.query('extjs5-detail-form')[0];

        detailView.getViewModel().setData({ record: record });
    }
});
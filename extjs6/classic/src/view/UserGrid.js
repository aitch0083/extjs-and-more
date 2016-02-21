Ext.define('ExtJS6.view.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userGrid',

    requires: [
        'Ext.grid.*',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem',
        'ExtJS6.model.User'
    ],

    title: 'Users',

    initComponent: function(){
        
        this.editor = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls: 'icon-grid',
            frame: true,
            plugins: [this.editor],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'fa fa-plus',
                    text: 'Add',
                    scope: this,
                    handler: this.onAddClick
                }, {
                    iconCls: 'fa fa-times',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: this.onDeleteClick
                }]
            }, {
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    xtype: 'tbtext',
                    text: '<b>@cfg</b>'
                }, '|', {
                    text: 'autoSync',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.autoSync = pressed;
                    }
                }, {
                    text: 'batch',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().batchActions = pressed;
                    }
                }, {
                    text: 'writeAllFields',
                    enableToggle: true,
                    pressed: false,
                    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().getWriter().writeAllFields = pressed;
                    }
                }]
            }, {
                weight: 1,
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'fa fa-save',
                    text: 'Sync',
                    scope: this,
                    handler: this.onSync
                }]
            }],
            columns: [{
                text:         'ID',
                width:        40,
                sortable:     true,
                resizable:    false,
                draggable:    false,
                hideable:     false,
                menuDisabled: true,
                dataIndex:    'id',
                renderer:     function(value, metaData, record, rowIndex) {
                    return rowIndex + 1;
                }//eo renderer

            }, {
                header:    'Username',
                flex:      1,
                sortable:  true,
                dataIndex: 'username',
                field:     {
                    type: 'textfield'
                }
            }, {
                header:    'Email',
                flex:      1,
                sortable:  true,
                dataIndex: 'email',
                field:     {
                    type: 'textfield'
                }
            }, {
                header:    'First',
                width:     100,
                sortable:  true,
                dataIndex: 'first',
                field:     {
                    type: 'textfield'
                }
            }, {
                header:    'Last',
                width:     100,
                sortable:  true,
                dataIndex: 'last',
                field:     {
                    type: 'textfield'
                }
            }]
        });//eo Ext.apply

        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);

    },//eo initComponent

    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function(){
        this.store.sync();
    },

    onDeleteClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function(){
        var rec = new ExtJS6.model.User({
            username: '',
            first:    '',
            last:     '',
            email:    ''
        }), edit = this.editor;

        edit.cancelEdit();
        this.store.insert(0, rec);
        edit.startEditByPosition({
            row: 0,
            column: 1
        });
    }
});
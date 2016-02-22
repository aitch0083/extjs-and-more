Ext.define('ExtJS5.view.Master', {
    extend : 'Ext.grid.Panel',
    
    alias  : 'widget.extjs5-master-grid',

    title : 'Master Panel',
    
    store : 'People',
    columnWidth: 0.5,
    
    columns: [
        { 
            text      : 'Name',  
            dataIndex : 'name' 
        },
        { 
            text      : 'Email', 
            dataIndex : 'email', 
            flex      : 1 
        },
        { 
            text      : 'Phone',
            dataIndex : 'phone' 
        }
    ]
});
Ext.define('ExtJS4.model.User', {
    extend: 'Ext.data.Model',
    
    fields: [
        '_id',
        'username',
        'email', 
        'first', 
        'last'
    ],

    validations: [{
        type: 'length',
        field: 'email',
        min: 1
    }, {
        type: 'length',
        field: 'first',
        min: 1
    }, {
        type: 'length',
        field: 'last',
        min: 1
    }]
});
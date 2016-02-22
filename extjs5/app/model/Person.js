Ext.define('ExtJS5.model.Person', {
	extend: 'Ext.data.Model',

	fields : [
        {
            name : 'name',
            type : 'string'
        },
        {
            name : 'email',
            type : 'string'
        },
        {
            name : 'phone',
            type : 'string'
        },
        {
            name : 'id',
            type : 'int'
        }
    ]
});
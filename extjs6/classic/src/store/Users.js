Ext.define('ExtJS6.store.Users', {
    extend: 'Ext.data.Store',
    model: 'ExtJS6.model.User',
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'ajax',
        actionMethods: {
            read:    'POST',
            create:  'POST',
            update:  'POST',
            destroy: 'POST'
        },
        api: {
            read:    '/api/users/view',
            create:  '/api/users/create',
            update:  '/api/users/update',
            destroy: '/api/users/destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'records',
            successProperty: 'success',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            rootProperty: 'records',
            writeAllFields: true,
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.info(response, operation);
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        write: function(proxy, operation){
            console.info('operation:', operation);

            if (operation.action == 'destroy') {
                //main.child('#form').setActiveRecord(null);
            }
            Ext.MessageBox.show({
                title: 'WRITER INFO',
                msg: operation.getResultSet().message,
                icon: Ext.MessageBox.INFO,
                buttons: Ext.Msg.OK
            });
        }
    }
});
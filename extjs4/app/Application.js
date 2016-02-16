Ext.define('ExtJS4.Application', {
    name:        'ExtJS4',
    extend:      'Ext.app.Application',
    requires:    ['Ext.container.Viewport'],
    controllers: ['ExtJS4.controller.Main'],
    views:       ['ExtJS4.view.LoginForm'],
    launch:      function(){
        Ext.create('Ext.container.Viewport', {
            layout : {
                type:  'hbox',
                align: 'middle',
                pack:  'center'
            },
            items: [
                { xtype:'loginForm' }
            ]
        });
    }
});

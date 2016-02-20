Ext.define('ExtJS4.Application', {
    name:        'ExtJS4',
    extend:      'Ext.app.Application',
    requires:    [
        'Ext.container.Viewport',
        'Ext.layout.container.Border',
        'Ext.layout.container.Column',
        'ExtJS4.controller.Basic',
        'ExtJS4.controller.MainMenu',
        'ExtJS4.controller.MainContainer',
        'Ext.chart.*',
        'Ext.util.Point'
    ],//eo requires
    controllers: [
        'ExtJS4.controller.Main'
    ],//eo controllers
    views:       [
        'ExtJS4.view.LoginForm'
    ],//eo views
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

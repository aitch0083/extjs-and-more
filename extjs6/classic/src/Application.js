Ext.define('ExtJS6.Application', {
    name:        'ExtJS6',
    extend:      'Ext.app.Application',
    requires:    [
        'Ext.container.Viewport',
        'Ext.layout.container.Border',
        'Ext.layout.container.Column',
        'ExtJS6.controller.Basic',
        'ExtJS6.controller.MainMenu',
        'ExtJS6.controller.MainContainer',
        'Ext.util.Point',
        'Ext.chart.*',
    ],//eo requires
    controllers: [
        'ExtJS6.controller.Main'
    ],//eo controllers
    views:       [
        'ExtJS6.view.LoginForm'
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

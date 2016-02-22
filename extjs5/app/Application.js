Ext.define('ExtJS5.Application', {
    name:        'ExtJS4',
    extend:      'Ext.app.Application',
    requires:    [
        'Ext.container.Viewport',
        'Ext.layout.container.Border',
        'Ext.layout.container.Column',
        'ExtJS5.controller.Basic',
        'ExtJS5.controller.MainMenu',
        'ExtJS5.controller.MainContainer',
        'ExtJS5.controller.Master',
        'Ext.util.Point',
        'Ext.chart.*',
    ],//eo requires
    controllers: [
        'ExtJS5.controller.Main',
        'ExtJS5.controller.Master',
    ],//eo controllers
    views:       [
        'ExtJS5.view.LoginForm'
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

Ext.require('Ext.app.Application');

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name : 'ExtJS4',

    //turn off the autoCreateViewport for Jasmine V2.0
    autoCreateViewport: false,

    controllers: [
        'Basic'
    ],

    launch: function() {
        console.info('Start Unit Test');
    }
});
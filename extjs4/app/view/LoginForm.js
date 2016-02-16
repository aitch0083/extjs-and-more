Ext.define('ExtJS4.view.LoginForm', {
	extend : 'Ext.form.Panel',
    title: 'Login',
    alias: 'widget.loginForm',
    bodyPadding: 5,
    defaultType: 'textfield',
    items: [
    	{ fieldLabel : 'Username', name:'username', allowBlank: false },
    	{ fieldLabel : 'Password', name:'password', allowBlank: false, inputType:'password' },
    ],
    width: 300,
    height: 150,
    url: '/api/login',
    buttons: [
    	{ //Submit button
    		text:     'Submit',  
    		formBind: true,
    		disabled: true,
    		cls:      'btn btn-primary btn-sm',
    		handler:  function(){
    			var form = this.up('form').getForm();

    			if(form.isValid()){
    				form.submit({
    					success : function(form, action){
    						console.info('login submit succeed', action);
    					},
    					failure : function(form, action){
    						console.info('login submit failed', action);
    					}
    				});
    			}//eo if
    		}//eo handler
    	},//eo Submit button

    	{ //Reset Button
    		text:    'Reset',
    		cls:     'btn btn-danger btn-sm',
    		handler: function(){
    			this.up('form').getForm().reset()
    		}
    	},//eo Reset button
    ]
});
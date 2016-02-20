Ext.define('ExtJS4.view.LoginForm', {
	extend : 'Ext.form.Panel',
    title: 'Login',
    alias: 'widget.loginForm',
    id: 'LoginForm',
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
            action:   'submit',
    		formBind: true,
    		disabled: true,
    		cls:      'btn btn-primary btn-sm'
    	},//eo Submit button

    	{ //Reset Button
    		text:    'Reset',
    		cls:     'btn btn-danger btn-sm',
    		handler: function(){
                this.down('.custom-label')
                    .addCls('label-info')
                    .removeCls('label-danger label-success')
                    .setHTML('Please enter your credentials...');
    			this.up('form').getForm().reset()
    		}
    	},//eo Reset button
    ],
    onRender : function(){
        console.info('Login form rendered @ ', (new Date()));

        var labelElement = new Ext.Element(document.createElement('label'));
        labelElement.addCls('label label-info custom_comp custom-label').setHTML('Please enter your credentials...');

        Ext.get('LoginForm').appendChild(labelElement);

        this.callParent(arguments);
    }//eo onRender
});
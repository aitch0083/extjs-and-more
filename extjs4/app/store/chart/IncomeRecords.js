Ext.define('ExtJS4.store.chart.IncomeRecords', {
	//DON'T EVEN TRY TO EXTEND JSONSTORE!
	extend: 'Ext.data.Store',
	fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6'],
	proxy: {
        type: 'ajax',
        url: '/api/getRandomData',
        reader: {
        	type: 'json',
            root: 'items'
        }
    },//eo proxy
    autoLoad: true
});
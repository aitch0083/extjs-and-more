Ext.define('ExtJS6.store.chart.RadarRecords2', {
	//DON'T EVEN TRY TO EXTEND JSONSTORE!
	extend: 'Ext.data.Store',
	fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9'],
	proxy: {
        type: 'ajax',
        url: '/api/getRandomData',
        reader: {
        	type: 'json',
            rootProperty: 'items'
        }
    },//eo proxy
    autoLoad: true
});
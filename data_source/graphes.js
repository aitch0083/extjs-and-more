var graphes = [
 	{ 
 		xtype: 'chart',
 		style: 'background:#fff',
        animate: true,
        store: 'ExtJS4.store.chart.HitRecords',
        legend: {
            position: 'bottom'
        },
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['data1', 'data2', 'data3', 'data4'],
            title: 'Hits No.',
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 1
                }
            },
            minimum: 0,
            adjustMinimumByMajorUnit: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Month of the Year',
            grid: true,
            label: {
                rotate: {
                    degrees: 315
                }
            }
        }],
        series: [{
            type: 'area',
            highlight: false,
            axis: 'left',
            xField: 'name',
            yField: ['data1', 'data2', 'data3', 'data4'],
            style: {
                opacity: 0.93
            }
        }]
    }, //eo chart1
    {//cahr2
    	xtype: 'chart',
    	style: 'background:#fff',
        animate: true,
        defaultInsets: 30,
        store: 'ExtJS4.store.chart.Browsers',
        legend: {
            position: 'right'
        },
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['IE', 'Chrome', 'Firefox', 'Safari', 'Opera', 'Other'],
            title: 'Usage %',
            grid: true,
            decimals: 0,
            minimum: 0,
            maximum: 100
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['date'],
            title: 'Month of the Year',
            label: {
                renderer: function(v) {
                    return v.match(/([0-9]*)\/[0-9]*\/[0-9][0-9]([0-9]*)/).slice(1).join('/');
                }
            }
        }],
        series: [{
            type: 'area',
            axis: 'left',
            highlight: true,
            tips: {
                trackMouse: true,
                renderer: function(storeItem, item) {
                    var d = Ext.Date.format(new Date(storeItem.get('date')), 'M y'),
                        percent = storeItem.get(item.storeField) + '%';
                      
                    this.setTitle(item.storeField + ' - ' + d + ' - ' + percent);
                }
            },
            xField: 'name',
            yField: ['IE', 'Chrome', 'Firefox', 'Safari', 'Opera', 'Other'],
            style: {
                lineWidth: 1,
                stroke: '#666',
                opacity: 0.86
            }
        }]
    },//eo char2
    { //chart3
     	xtype: 'chart',
        animate: true,
        store: 'ExtJS4.store.chart.IncomeRecords',
        shadow: true,
        legend: {
            position: 'right'
        },
        insetPadding: 10,
        series: [{
            type: 'pie',
            field: 'data6',
            showInLegend: true,
            donut: false,
            tips: {
                trackMouse: true,
                renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 0;
                    store1.each(function(rec) {
                        total += rec.get('data6');
                    });
                    this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data6') / total * 100) + '%');
                }
            },
            highlight: {
                segment: {
                    margin: 20
                }
            },
            label: {
                field: 'name',
                display: 'rotate',
                contrast: true,
                font: '18px Arial'
            }
        }]
    },//eo chart3
    {//chart4
    	xtype: 'chart',
        style: 'background:#fff',
        insetPadding: 10,
        animate: true,
        store: 'ExtJS4.store.chart.RadarRecords',
        legend: {
            position: 'right'
        },
        axes: [{
            type: 'Radial',
            position: 'radial',
            label: {
                display: true
            }
        }],
        series: [{
            showInLegend: true,
            type: 'radar',
            xField: 'name',
            yField: 'data7',
            style: {
                opacity: 0.4
            }
        },{
            showInLegend: true,
            type: 'radar',
            xField: 'name',
            yField: 'data8',
            style: {
                opacity: 0.4
            }
        },{
            showInLegend: true,
            type: 'radar',
            xField: 'name',
            yField: 'data9',
            style: {
                opacity: 0.4
            }
        }]
    },//eo chart4
    {//chart5
    	xtype: 'chart',
        style: 'background:#fff',
        theme: 'Category2',
        insetPadding: 20,
        animate: true,
        store: 'ExtJS4.store.chart.RadarRecords2',
        legend: {
            position: 'right'
        },
        axes: [{
            type: 'Radial',
            position: 'radial',
            label: {
                display: true
            }
        }],
        series: [{
            showInLegend: true,
            type: 'radar',
            xField: 'name',
            yField: 'data1',
            style: {
                opacity: 0.4
            }
        },{
            showInLegend: true,
            type: 'radar',
            xField: 'name',
            yField: 'data4',
            style: {
                opacity: 0.4
            }
        },{
            showInLegend: true,
            type: 'radar',
            xField: 'name',
            yField: 'data5',
            style: {
                opacity: 0.4
            }
        }]
    },//chart5
    {//chart6
    	xtype: 'chart',
        animate: true,
        shadow: true,
        store: 'ExtJS4.store.chart.IncomeRecords2',
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['data4'],
            title: 'Hits',
            grid: true,
            minimum: 0,
            maximum: 100
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Months',
            label: {
                rotate: {
                    degrees: 270
                }
            }
        }],
        series: [{
            type: 'column',
            axis: 'left',
            gutter: 80,
            xField: 'name',
            yField: ['data4'],
            tips: {
                trackMouse: true,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name'));
                    this.update(storeItem.get('data4'));
                }
            },
            style: {
                fill: '#38B8BF'
            }
        }]
    },//eo chart6
    {//chart7
    	xtype: 'chart',
        style: 'background:#fff',
        animate: {
            easing: 'elasticIn',
            duration: 1000
        },
        store: 'ExtJS4.store.chart.HitRecords2',
        insetPadding: 25,
        flex: 1,
        axes: [{
            type: 'gauge',
            position: 'gauge',
            minimum: 0,
            maximum: 100,
            steps: 10,
            margin: -10
        }],
        series: [{
            type: 'gauge',
            field: 'data1',
            donut: false,
            colorSet: ['#F49D10', '#ddd']
        }]
    },//eo chart7
    {//chart8
        xtype: 'chart',
        style: 'background:#fff',
        animate: true,
        store: 'ExtJS4.store.chart.HitRecords3',
        insetPadding: 25,
        flex: 1,
        axes: [{
            type: 'gauge',
            position: 'gauge',
            minimum: 0,
            maximum: 100,
            steps: 10,
            margin: 7
        }],
        series: [{
            type: 'gauge',
            field: 'data1',
            donut: 30,
            colorSet: ['#82B525', '#ddd']
        }]
    },//eo chart8
    {//chart9
        xtype: 'chart',
        style: 'background:#fff',
        animate: {
            easing: 'bounceOut',
            duration: 500
        },
        store: 'ExtJS4.store.chart.HitRecords4',
        insetPadding: 25,
        flex: 1,
        axes: [{
            type: 'gauge',
            position: 'gauge',
            minimum: 0,
            maximum: 100,
            steps: 10,
            margin: 7
        }],
        series: [{
            type: 'gauge',
            field: 'data1',
            donut: 80,
            colorSet: ['#3AA8CB', '#ddd']
        }]
    },//eo chart9
    {//chart10
    	xtype: 'chart',
        style: 'background:#fff',
        animate: true,
        theme: 'Category1',
        store: 'ExtJS4.store.chart.HitRecords4',
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['data6', 'data4', 'data5'],
            title: 'Number of Hits',
            grid: true
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Month of the Year'
        }],
        series: [{
            type: 'column',
            axis: 'left',
            xField: 'name',
            yField: 'data6',
            markerConfig: {
                type: 'cross',
                size: 3
            }
        }, {
            type: 'scatter',
            axis: 'left',
            xField: 'name',
            yField: 'data4',
            markerConfig: {
                type: 'circle',
                size: 5
            }
        }, {
            type: 'line',
            axis: 'left',
            smooth: true,
            fill: true,
            fillOpacity: 0.5,
            xField: 'name',
            yField: 'data5'
        }]
    }//eo chart10
];

exports.getRandomOne = function(){
	var idx = Math.floor( Math.random() * graphes.length );
	return graphes[idx];
};//eo getRandomOne
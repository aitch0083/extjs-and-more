var graphes = [
 	{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: '100%',
        insetPadding: 40,
        store: {
            type: 'chart.browsers'
        },
        legend: {
            docked: 'top'
        },
        sprites: [{
            type: 'text',
            text: 'Browser Hits',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }],
        axes: [{
            type: 'numeric',
            fields: 'data1',
            position: 'left',
            grid: true,
            minimum: 0,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            fields: 'month',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'area',
            title: [ 'IE', 'Firefox', 'Chrome', 'Safari' ],
            xField: 'month',
            yField: [ 'data1', 'data2', 'data3', 'data4' ],
            style: {
                opacity: 0.80
            }
        }]
    },
    {
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        legend: {
            docked: 'right'
        },
        store: {
            type: 'chart.browsers'
        },
        insetPadding: 40,
        sprites: [{
            type: 'text',
            text: 'Line Charts - Marked Lines',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Browser Stats 2012',
            fontSize: 10,
            x: 12,
            y: 470
        }, {
            type: 'text',
            text: 'Source: http://www.w3schools.com/',
            fontSize: 10,
            x: 12,
            y: 485
        }],
        axes: [{
            type: 'numeric',
            fields: ['data1', 'data2', 'data3', 'data4' ],
            position: 'left',
            grid: true,
            minimum: 0,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            fields: 'month',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            title: 'IE',
            xField: 'month',
            yField: 'data1',
            marker: {
                type: 'square',
                fx: {
                    duration: 200,
                    easing: 'backOut'
                }
            },
            highlightCfg: {
                scaling: 2
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }, {
            type: 'line',
            title: 'Firefox',
            xField: 'month',
            yField: 'data2',
            marker: {
                type: 'triangle',
                fx: {
                    duration: 200,
                    easing: 'backOut'
                }
            },
            highlightCfg: {
                scaling: 2
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }, {
            type: 'line',
            title: 'Chrome',
            xField: 'month',
            yField: 'data3',
            marker: {
                type: 'arrow',
                fx: {
                    duration: 200,
                    easing: 'backOut'
                }
            },
            highlightCfg: {
                scaling: 2
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }, {
            type: 'line',
            title: 'Safari',
            xField: 'month',
            yField: 'data4',
            marker: {
                type: 'cross',
                fx: {
                    duration: 200,
                    easing: 'backOut'
                }
            },
            highlightCfg: {
                scaling: 2
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }]
    },
    
    {
        title: 'Time Axis',
        layout: 'fit',
        items: {
            xtype: 'cartesian',
            reference: 'time-chart',
            insetPadding: '40 40 20 20',
            width: '100%',
            height: 500,
            store: {
                type: 'chart.hit2'
            },
            axes: [{
                type: 'numeric',
                minimum: 0,
                maximum: 20,
                grid: true,
                position: 'left',
                title: 'Number of Hits'
            }, {
                type: 'time',
                dateFormat: 'G:i:s',
                segmenter: {
                    type: 'time',
                    step: {
                        unit: 's',
                        step: 1
                    }
                },
                label: {
                    fontSize: 10
                },
                grid: true,
                position: 'bottom',
                title: 'Seconds',
                fields: ['xValue'],
                majorTickSteps: 10
            }],
            series: [{
                type: 'line',
                title: 'Metric 1',
                marker: {
                    type: 'cross',
                    size: 5
                },
                style: {
                    miterLimit: 0
                },
                xField: 'xValue',
                yField: 'metric1'
            }, {
                type: 'line',
                title: 'Metric 2',
                marker: {
                    type: 'arrow',
                    size: 5
                },
                style: {
                    miterLimit: 0
                },
                xField: 'xValue',
                yField: 'metric2'
            }],
            listeners: {
                afterrender: 'onTimeChartRendered',
                destroy: 'onTimeChartDestroy'
            }
        }
    }, {
        title: 'Numeric Axis',
        layout: 'fit',
        items: {
            xtype: 'cartesian',
            reference: 'number-chart',
            insetPadding: '40 40 20 20',
            width: '100%',
            height: 500,
            store: {
                type: 'chart.hit3'
            },
            axes: [{
                type: 'numeric',
                minimum: 0,
                maximum: 100,
                grid: true,
                position: 'left',
                title: 'Number of Hits'
            }, {
                type: 'numeric',
                grid: true,
                position: 'bottom',
                title: 'Seconds',
                fields: ['xValue'],
                renderer: 'onAxisLabelRender'
            }],
            series: [{
                type: 'line',
                title: 'Values',
                label: {
                    display: 'over',
                    field: 'yValue'
                },
                marker: {
                    radius: 4
                },
                style: {
                    lineWidth: 4,
                    miterLimit: 0
                },
                xField: 'xValue',
                yField: ['yValue']
            }],
            listeners: {
                afterrender: 'onNumberChartRendered',
                destroy: 'onNumberChartDestroy'
            }
        }
    },
    {
        xtype: 'cartesian',
        reference: 'chart',
        height: '100%',
        store: {
            type: 'chart.hit4'
        },
        padding: 10,
        insetPadding: 0,
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        series: [
            {
                type: 'line',
                xField: 'x',
                yField: 'y1',
                style: {
                    lineWidth: 2,
                    strokeStyle: 'rgb(0, 119, 204)'
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['y1'],
                titleMargin: 20,
                title: {
                    text: 'f(x)',
                    fillStyle: 'rgb(255, 0, 136)'
                },
                minimum: -4,
                maximum: 4,
                minorTickSteps: 3,
                style: {
                    minorTicks: true,
                    minorTickSize: 4,
                    majorTickSize: 7
                },
                floating: {
                    value: 0,
                    alongAxis: 1
                },
                grid: true
            },
            {
                type: 'numeric',
                position: 'bottom',
                fields: ['x'],
                titleMargin: 6,
                minorTickSteps: 3,
                style: {
                    minorTicks: true,
                    minorTickSize: 4,
                    majorTickSize: 7
                },
                title: {
                    text: 'x',
                    fillStyle: 'rgb(255, 0, 136)'
                },
                floating: {
                    value: 0,
                    alongAxis: 0
                },
                grid: true
            }
        ]
    },
    {
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        store: {
            type: 'spline'
        },
        insetPadding: {
            top: 40,
            right: 40,
            bottom: 20,
            left: 20
        },
        legend: {
            docked: 'right'
        },
        sprites: [{
            type: 'text',
            text: 'Put through',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }],
        axes: [{
            type: 'numeric',
            fields: ['sin', 'cos', 'tan' ],
            position: 'left',
            grid: true,
            renderer: 'onAxisLabelRender2'
        }, {
            type: 'category',
            title: 'Theta',
            fields: 'theta',
            position: 'bottom',
            style: {
                textPadding: 0 // remove extra padding between labels to make sure no labels are skipped
            },
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            xField: 'theta',
            yField: 'sin',
            smooth: true,
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            }
        }, {
            type: 'line',
            xField: 'theta',
            yField: 'cos',
            smooth: true,
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            }
        }, {
            type: 'line',
            xField: 'theta',
            yField: 'tan',
            smooth: true,
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            }
        }]
    },

    {
        xtype: 'polar',
        reference: 'chart',
        width: '100%',
        height: '100%',
        legend: {
            docked: 'right'
        },
        animation: {
            duration: 200
        },
        store: {
            type: 'chart.browsers'
        },
        insetPadding: '40 40 60 40',
        interactions: ['rotate'],
        sprites: [{
            type: 'text',
            text: 'Radar Charts - Marked',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }],
        axes: [{
            type: 'numeric',
            position: 'radial',
            minimum: 0,
            maximum: 50,
            majorTickSteps: 9
        }, {
            type: 'category',
            position: 'angular',
            grid: true
        }],
        series: [{
            type: 'radar',
            title: 'IE',
            angleField: 'month',
            radiusField: 'data1',
            style: {
                lineWidth: 2,
                fillStyle: 'none'
            },
            marker: true,
            highlightCfg: {
                radius: 6,
                fillStyle: 'yellow'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesLabelRender'
            }
        }, {
            type: 'radar',
            title: 'Firefox',
            angleField: 'month',
            radiusField: 'data2',
            style: {
                lineWidth: 2,
                fillStyle: 'none'
            },
            marker: true,
            highlightCfg: {
                radius: 6,
                fillStyle: 'yellow'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesLabelRender'
            }
        }, {
            type: 'radar',
            title: 'Chrome',
            angleField: 'month',
            radiusField: 'data3',
            style: {
                lineWidth: 2,
                fillStyle: 'none'
            },
            marker: true,
            highlightCfg: {
                radius: 6,
                fillStyle: 'yellow'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesLabelRender'
            }
        }, {
            type: 'radar',
            title: 'Safari',
            angleField: 'month',
            radiusField: 'data4',
            style: {
                lineWidth: 2,
                fillStyle: 'none'
            }
        }]
    },
    {
        xtype: 'polar',
        height: 240,
        width: 300,
        padding: '10 0 0 0',
        insetPadding: 30,
        axes: {
            title: 'Temp',
            type: 'numeric',
            position: 'gauge',
            maximum: 250,
            majorTickSteps: 2,
            renderer: 'onTempAxisLabelRender'
        },
        series: {
            type: 'gauge',
            angleField: 'temp',
            donut: 50
        }
    }
];

exports.getRandomOne = function(){
	var idx = Math.floor( Math.random() * graphes.length );
	return graphes[idx];
};//eo getRandomOne
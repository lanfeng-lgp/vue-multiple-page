<template>
    <div class="page-echart">
        <div class="part1" ref="mychart">
        </div>
    </div>
</template>
<script>
import $echarts from 'echarts';
import { Message } from 'element-ui';

import 'echarts/map/js/china.js';

import mapData from '@/assets/json/echartsMapData.json';
import cityData from '@/assets/json/ACity.json';

export default {
    name: 'Echarts',
    components: {},
    data() {
        return {
            myCharts:null,
        }
    },
    watch: {

    },
    computed: {

    },
    filters: {

    },
    methods: {
        getJson(postUrl,callbcak){
            // let Result = require(postUrl);
            // callbcak && callbcak(Result);
            if(postUrl.indexOf("Map") > -1){
                callbcak && callbcak(mapData);
            }else{                
                callbcak && callbcak(cityData);
            }
            return;
        },
        getMapData() {
            let _this = this;
            let postUrl = '../assets/json/echartsMapData.json';
            this.getJson(postUrl,function(Result) {
                if (Result.status == "200") {
                    let resultData = Result.data;
                    _this.handelMapData(resultData.BaseTimeMapCount);
                } else {
                    Message.error({ message: Result.message })
                }
            });
        },
        handelMapData(list) {
            let _this = this;
            let convertedData = [];
            let option = {
                backgroundColor: '#404a59',
                animation: true,
                animationDuration: 500,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                title: [{
                        text: '案件量分布',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    {
                        id: 'statistic',
                        right: 120,
                        top: 40,
                        width: 100,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        }
                    }
                ],
                toolbox: {
                    iconStyle: {
                        normal: {
                            borderColor: '#fff'
                        },
                        emphasis: {
                            borderColor: '#b1e4ff'
                        }
                    }
                },
                brush: {
                    outOfBrush: {
                        color: '#abc'
                    },
                    brushStyle: {
                        borderWidth: 2,
                        color: 'rgba(0,0,0,0.2)',
                        borderColor: 'rgba(0,0,0,0.5)',
                    },
                    seriesIndex: [0, 1],
                    throttleType: 'debounce',
                    throttleDelay: 300,
                    geoIndex: 0
                },
                geo: {
                    map: 'china',
                    left: '10',
                    right: '10%',
                    center: [117.98561551896913, 31.205000490896193],
                    zoom: 2,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                grid: {
                    right: 40,
                    top: 100,
                    bottom: 40,
                    width: '30%'
                },
                xAxis: {
                    type: 'value',
                    scale: true,
                    position: 'top',
                    boundaryGap: false,
                    splitLine: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { margin: 2, textStyle: { color: '#aaa' } },
                },
                yAxis: {
                    type: 'category',
                    name: '',
                    nameGap: 16,
                    axisLine: { show: false, lineStyle: { color: '#ddd' } },
                    axisTick: { show: false, lineStyle: { color: '#ddd' } },
                    axisLabel: { interval: 0, textStyle: { color: '#ddd' } },
                    data: []
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                series: [{
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                return params.name + "<br/> 总量：" + params.value[2];
                            },
                        },
                        name: '地区',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: [],
                        symbolSize: function() {
                            return 8;
                        },
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}    ',
                                position: 'left',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                return params.name + "<br/> 总量：" + params.value[2];
                            },
                        },
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: [],
                        symbolSize: function() {
                            return 20;
                        },
                        /* showEffectOn: 'emphasis',*/
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}  ',
                                position: 'left',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    },
                    {
                        id: 'bar',
                        zlevel: 2,
                        symbol: 'none',
                        type: 'bar',
                        data: []
                    }
                ]
            };
            let renderBrushed = function(params) {
                let mainSeries = params.batch[0].selected[0];
                let selectedItems = [];
                let categoryData = [];
                let maxBar = 8;

                for (let i = 0; i < mainSeries.dataIndex.length; i++) {
                    let rawIndex = mainSeries.dataIndex[i];
                    let dataItem = convertedData[0][rawIndex];

                    selectedItems.push(dataItem);
                }
                selectedItems.sort(function(a, b) {
                    return a.value[2] - b.value[2];
                });
                if (mainSeries.dataIndex.length >= maxBar) {
                    selectedItems = selectedItems.slice((0 - maxBar));
                }
                let INoption = option.series.slice(0, 2);
                let INvalue = {},
                    INline = {};
                for (let i in selectedItems) {
                    for (let j in selectedItems[i].detail) {
                        if (!INline[j]) {
                            INline[j] = 0;
                            INvalue[j] = [];
                        }
                    }
                }
                for (let i in selectedItems) {
                    categoryData.push(selectedItems[i].name);
                    for (let j in INline) {
                        if (!selectedItems[i].detail[j]) {
                            INvalue[j].push(0);
                        } else {
                            INvalue[j].push(selectedItems[i].detail[j])
                        }
                    }
                }
                for (let i in INvalue) {
                    if (i == "总量") continue;
                    let item = {
                        name: i,
                        type: 'bar',
                        data: INvalue[i],
                        stack: '总量',
                        label: {
                            normal: {
                                show: false,
                            }
                        }
                    }
                    INoption.push(item);
                }
                _this.myCharts.setOption({
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: categoryData
                    },
                    title: {
                        id: 'statistic',
                        text: '案件详细数据',
                        right: "12%"
                    },
                    series: INoption
                });
            }
            let name = [],value = [];
            for (let i in list) {
                name.push(i);
                let item = {
                    name: i,
                    value: list[i]["总量"],
                    detail: list[i]
                }
                value.push(item)
            }
            _this.myCharts.on('brushselected', renderBrushed);
            _this.myCharts.on("geoRoam", function() {
                let option2 = _this.myCharts.getOption();
                if (option2.geo[0].zoom < 1.5) {
                    option2.series[0].label.normal.show = false;
                    option2.series[0].label.emphasis.show = false;
                    option2.series[1].label.normal.show = false;
                    option2.series[1].label.emphasis.show = false;
                } else {
                    option2.series[0].label.normal.show = true;
                    option2.series[0].label.emphasis.show = true;
                    option2.series[1].label.normal.show = true;
                    option2.series[1].label.emphasis.show = true;
                }
                _this.myCharts.setOption(option2, true);
            })

            let postUrl = '../assets/json/ACity.json';
            _this.getJson(postUrl,function(geoCoordMap) {
                let convertData = function(data) {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        let geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value),
                                detail: data[i].detail
                            });
                        }
                    }
                    return res;
                };
                convertedData = [
                    convertData(value),
                    convertData(value.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 15))
                ];
                option.series[0].data = convertedData[0];
                option.series[1].data = convertedData[1];
                _this.myCharts.hideLoading();
                _this.myCharts.setOption(option);
            }, true, true);
        }
    },

    mounted() {
        // 绘制图表
        this.myCharts = $echarts.init(this.$refs.mychart);
        this.myCharts.showLoading();
        this.getMapData();
    }
};
</script>
<style lang="less">
.page-echart {
    padding:16px 0 0 16px;
    .part1 {
        width: 100%;
        height: calc(100vh - 156px);
        border-radius:4px;
        overflow:hidden;
        box-shadow:0 0 20px rgba(0,0,0,0.1); 
    }
}
</style>
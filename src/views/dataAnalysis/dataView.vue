<template>
    <div class="data-view">
        <el-row :gutter="12">
            <el-col :span="12">
                <el-card shadow="always">
                    <div id="view1" class="view-box" ></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always">
                <div id="view2" class="view-box"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="12">
                <el-card shadow="always">
                    <div id="view3" class="view-box"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always">
                <div id="view4" class="view-box"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getDataview } from '@/api/index.js'
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.drawBar()
        this.getDataview()
        this.drawPie()
        this.drawMixLineBar()
        
    },
    methods: {
        drawBar() {
            let id = document.getElementById('view1')
            const myChart = this.$echarts.init(id)
            const options = {
                title: {
                    text: '柱状条'
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            }
            options && myChart.setOption(options);
        },

        getDataview() {
            getDataview().then(res => {
                const { legend,xAxis,series} = res.data
                this.drawLines(legend,xAxis,series)
            })
        },
        drawLines(legend,xAxis,series) {
            let id = document.getElementById('view2')
            const myCahrt = this.$echarts.init(id)
            let options = {
                title: {
                    text: '会话量'
                },
                tooltip: {},
                legend:{
                    data: legend
                },
                xAxis: {
                    type: 'category',
                    data:xAxis
                },
                yAxis: {
                    type: 'value'
                },
                series:series


            }
            options && myCahrt.setOption(options)
        },
        drawPie() {
            let chartDom = document.getElementById('view3');
            let myChart = this.$echarts.init(chartDom);
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        };

            option && myChart.setOption(option);
        },
        drawMixLineBar() {
            let chartDom = document.getElementById('view4');
            let myChart = this.$echarts.init(chartDom);
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['Evaporation', 'Precipitation', 'Temperature']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Precipitation',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Temperature',
                        min: 0,
                        max: 25,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [
                    {
                        name: 'Evaporation',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                            return value + ' ml';
                            }
                        },
                        data: [
                            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                        ]
                    },
                    {
                        name: 'Precipitation',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                            return value + ' ml';
                            }
                        },
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                        ]
                    },
                    {
                        name: 'Temperature',
                        type: 'line',
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                            return value + ' °C';
                            }
                        },
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            };
            option && myChart.setOption(option);
        }
    },

}
</script>
<style lang="less" scoped>
.data-view {
    width: 100%;
    height: 100%;
    .view-box {
        height: 240px;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
}
</style>
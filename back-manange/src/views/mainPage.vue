<template>
  <div>
    <div ref="chart" class="mychart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'mainPage',
  data () {
    return {
      option: {
        // 图表位置
        grid: {
          left: '3%',
          right: '6%',
          bottom: '8%',
          top: '15%'
        },
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
          data: ['新注册用户', '新增订单', '新增管理员']
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#666',
                fontSize: 14
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '用户',
            min: 0,
            max: 200,
            interval: 50,
            // 更改坐标轴文字颜色
            axisLabel: {
              textStyle: {
                color: '#666'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            }
          },
          {
            type: 'value',
            name: '订单',
            min: 0,
            max: 200,
            interval: 50,
            axisLabel: {
              formatter: '{value} 个',
              show: true,
              textStyle: {
                color: '#666'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            }
          }
        ],
        series: [
          {
            name: '新注册用户',
            type: 'bar',
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: '新增订单',
            type: 'bar',
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: '新增管理员',
            type: 'line',
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      }
    }
  },
  mounted () {
    // 写echarts代码
    console.log(this.$refs.chart)
    let myChart = echarts.init(this.$refs.chart)
    // 绘制图表
    myChart.setOption(this.option)
  }
}
</script>

<template>
  <div :class="className" :style="{height:height,width:width,}" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '430px'
    },
    chartData: {
      required: true
    }
  },
  data() {
    return {
      chart: null,
      map: {}
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log(val,'asdasd')
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  created() {

  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'statisticsxChart')
      this.setOptions(this.chartData)
    },
    setOptions(chartData) {
      this.chart.setOption({
        title: {
          text: '计划完成度',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: chartData[1], name: '未完成' },
              { value: chartData[0], name: '已完成' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

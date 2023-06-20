<template>
  <line-chart-config :height="450" :chartData="chartData"></line-chart-config>
</template>
<script>
import LineChartConfig from "./LineChartConfig";
export default {
  props: {
    chartData: {
      type: Object,
      default: null
    },
  },
  components: {
    LineChartConfig
  },
  data() {
    return {
      dataCollection: null,
      loaded: false
    }
  },
  methods: {
    fillData() {
      this.dataCollection = {
        labels: [0,1,2,3,4,5,6,7,8,9],
        datasets: [
          {
            label: 'Temp (°C)',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderColor: 'lightblue',
            pointBackgroundColor: 'blue',
            borderWidth: 1,
            pointBorderColor: 'blue',
            data: [4,3,2,3,7,5,6,8,8,5]
          }
        ]
      }
    }
  },
  mounted() {
    this.fillData();
  }
}
</script>
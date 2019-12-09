<template>
  <div>
    <div id="mapChart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import nanjing from "../../assets/320100.json";
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    getmap() {
      echarts.registerMap("nanjing", nanjing);
      let myChart = echarts.init(document.getElementById("mapChart"));
      let mapOption = {
        backgroundColor: "#fff",
        series: [
          {
            type: "map",
            map: "nanjing"
          }
        ]
      };
      myChart.setOption(mapOption);
    }
  },
  created() {},
  mounted() {
    this.getmap();
  }
};
</script>

<style scoped>
#mapChart {
  width: 100%;
  height: calc(100vh - 166px);
}
</style>

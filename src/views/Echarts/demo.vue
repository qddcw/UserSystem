<template>
  <div>
    <!-- <div id="mapChart"></div> -->
    <div id="demo">
      <button v-on:click="c1">
        Toggle
      </button>
     
        <div :class='myclass'>hello</div>

    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import nanjing from "../../assets/320100.json";
export default {
  data() {
    return {
      show: true,
      myclass:'class1'
    };
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
    },
    c1(){
      this.myclass = this.myclass=='class1'?'class2':'class1'
    }
  },
  created() {},
  mounted() {
    // this.getmap();
  }
};
</script>

<style scoped>
#mapChart {
  width: 100%;
  height: calc(100vh - 166px);
}
.class1{
  width:100px;
  height:100px;
  transition: height 2s linear;
  background: red;
}
.class2{
  height:20px;
  transition: height 2s linear;
}
</style>

<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<script>
  import BMap from 'BMap'
  export default {
    data() {
      return {}
    },

    components: {},

    methods: {
      initMap() {
        // 百度地图API功能
        var map = new BMap.Map("map");
        let point = new BMap.Point(118.801902, 31.940456);

        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom(true);
        var marker = new BMap.Marker(point); // 创建标注    
        map.addOverlay(marker);
        map.addControl(new BMap.NavigationControl())
      }

    },
    mounted() {
      this.initMap();
    }
  }
</script>

<style scoped>
  .map{
    height:calc(100vh - 164px);
  }
</style>
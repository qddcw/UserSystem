
<template>
  <div id="practice">
    <button @click="move">start</button>

    <l-map
      style="width: 100%;height: calc(100vh - 166px);"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker" ref="marker"> </l-marker>
      <l-polyline
        :lat-lngs="polyline.latlngs"
        :color="polyline.color"
        ref="polyline"
      ></l-polyline>
      <l-polyline
        :lat-lngs="polyline.passed"
        :color="polyline.color1"
        ref="passed"
      ></l-polyline>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolyline } from "vue2-leaflet";
import "./em.geometryutil";
import "./markerTrack";
export default {
  name: "VueLeaflet",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
  },
  data() {
    return {
      zoom: 13,
      center: L.latLng(34.694, 113.587),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> Haut-Gis-Org',
      marker: L.latLng(34.694, 113.587),
      polyline: {
        latlngs: [[34.694, 113.587], [34.794, 113.487], [34.894, 113.787]],
        passed: [],
        color: "red",
        color1: "yellow",
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.marker.mapObject.on("update_position", (e) => {
        //每次坐标更新。然后也更新路径
        // this.$nextTick(() => {
        //   console.log(this.$refs.passed);
        // });
        this.$refs.passed.mapObject.setLatLngs(e.path);
      });
    });
  },
  methods: {
    move() {
      this.$refs.marker.mapObject.moveAlong(
        this.$refs.polyline.mapObject,
        3000
      );
      // console.log(this.$refs.passed)
    },
  },
  created() {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  },
};
</script>

<style scoped>
#practice {
}
</style>

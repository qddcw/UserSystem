<template>
  <div ref="layout">
    <app-header></app-header>
    <app-navbar></app-navbar>
    <app-main></app-main>
  </div>
</template>

<script>
import appHeader from "./Header";
import appMain from "./Main";
import appNavbar from "./Navbar";
export default {
  data() {
    return {};
  },

  components: { appHeader, appMain, appNavbar },

  mounted() {
    let today = new Date();
    if (today.getMonth() == 11 && today.getDate() == 13) {
      for (let i = 0; i < this.$refs.layout.childNodes.length; i++) {
        this.$refs.layout.childNodes[i].style.filter = "grayscale(1)";
      }
    }
  }
};
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 75px;
  top: 0;
  left: 0;
  right: 0;
  background-color: #2d3a4b;
}
.navbar {
  position: absolute;
  width: 12vw;
  background-color: #545c64;
  top: 75px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}
.main {
  position: absolute;
  width: 88vw;
  padding: 10px;
  background-color: #ddd;
  top: 75px;
  left: 12vw;
  bottom: 0;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>

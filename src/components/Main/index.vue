<template>
    <div class="main">
        <bread-crumb></bread-crumb>
        <router-view></router-view>
    </div>
</template>

<script>
import breadCrumb from "./breadcrumb"
export default {
  data () {
    return {
    }
  },

  components: {breadCrumb},

  methods: {}
}
</script>

<style scoped>

</style>
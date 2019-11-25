<template>
  <el-cascader :options="regionData" v-bind="$attrs" :value="value" v-on="$listeners"></el-cascader>
</template>

<script>
  import {
    regionData,
    CodeToText,
    TextToCode
  } from 'element-china-area-data'

  export default {
    name: 'g-areacascader',
    props: {
      value: {
        default: ''
      }
    },
    data() {
      return {
        regionData
      }
    },
  }
</script>

<style scoped>
</style>
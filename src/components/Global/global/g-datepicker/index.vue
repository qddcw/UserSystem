<template>
  <el-date-picker  type="date" align="right"  v-bind="$attrs"  :value="value" v-on="$listeners"
    value-format="yyyy-MM-dd" :picker-options="pickerOptions">
  </el-date-picker>

</template>

<script>
  const pickerOptions = {
    shortcuts: [{
      text: '今天',
      onClick(picker) {
        picker.$emit('pick', new Date());
      }
    }, {
      text: '昨天',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        picker.$emit('pick', date);
      }
    }, {
      text: '一周前',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', date);
      }
    }]
  }
  export default {
    name: 'g-datepicker',
    props: {
      value:{
        default:''
      }
    },
    data(){
      return {
        pickerOptions
      }
    },
  }
</script>

<style scoped>
</style>
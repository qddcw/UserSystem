<template>
  <el-table :data="tableData" height="500" border stripe style="width: calc(100% - 1px);margin-bottom:10px;"
    ref='table' highlight-current-row @current-change="handleCurrentChange" v-on="$listeners">
    <el-table-column type="index" width="50">
    </el-table-column>
    <el-table-column v-for='(item,index) in tableColumn' :key="index" :prop="item.prop" :label="item.label"
      :width="item.width">
      <template v-slot="scope" v-if='item.slot'>
        <slot :name="item.prop" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  const table = Symbol("table")
  export default {
    name: 'g-table-dialog',
    props: {
      tableData: {
        type: Array,
        required: true
      },
      tableColumn: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        table
      }
    },
    methods: {
      handleCurrentChange(val){ 
        this.$emit("supplierSelect",val)
      }
    },
    updated() {
      this.$refs.table.doLayout();
    }
  }
</script>

<style scoped>
</style>
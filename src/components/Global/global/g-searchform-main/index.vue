<template>
  <el-form :inline="true" :model="Model" :ref="symbolref">
    <el-form-item v-for="(item,index) in formItems" :key="index" v-bind="item.itemAttrs || {}" >
      <component :is="item.type" v-model="Model[item.attrs.model]" v-bind="item.attrs || {}" v-on="item.listener || {}">
      </component>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search" v-if="submit">查询</el-button>
      <el-button type="primary" @click="handleAdd" v-if="add">新增</el-button>
      <el-button @click="resetAll" v-if="reset">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  const symbolref = Symbol();
  export default {
    name: 'g-searchform-main',
    props: {
      formItems: {
        type: Array,
        required: true
      },
      submit: {
        type: Boolean,
        default: true
      },
      add: {
        type: Boolean,
        default: true
      },
      reset: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        Model: {},
        copyModel: {},
        symbolref
      }
    },
    methods: {
      search() {  
        this.$emit("handleSearch", this.Model);
      },
      resetAll() {
        this.$refs[this.symbolref].resetFields();
        this.Model = JSON.parse(JSON.stringify(this.copyModel))
        this.$emit("handleSearch", this.Model);
      },
      handleAdd() {
        this.$emit("handleAdd");
      }
    },

    watch: {
      formItems: {
        handler() {
          this.formItems.forEach(item => {
            this.$set(this.Model,
              item.attrs.model,
              item.attrs.value ? item.attrs.value : "")
          })
          this.copyModel = JSON.parse(JSON.stringify(this.Model))
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped>
  div.el-form-item {
    margin-bottom: 0px;
  }
</style>
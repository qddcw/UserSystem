<template>
    <el-form :model="Model" :ref="symbolref" class='dialogform' label-width="150px" label-position="right">
      <el-form-item v-for="(item,index) in formItems" :key="index" v-bind="item.itemAttrs || {}">
        <component :is="item.type" v-model="Model[item.attrs.model]" v-bind="item.attrs || {}"
          v-on="item.listener || {}">
        </component>
      </el-form-item>
      <div style="text-align: right;">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-form>
</template>

<script>
  const symbolref = Symbol();
  export default {
    name: 'g-form-dialog',
    props: {
      formItems: {
        type: Array,
        required: true
      },
      mergeItems: {
        type: Object
      },

    },
    data() {
      return {
        Model: {},
        copyModel: {},
        symbolref
      }
    },
    methods: {
      submitForm() {
        this.$refs[symbolref].validate(valid => {
          if (valid) {
            this.$emit("afterSubmit",this.Model);
          } else {
            return false
          }
        })
      },
      closeDialog(){
        this.$emit("closeDialog");
      }

    },
    watch: {
      formItems:{
        handler() {
          this.formItems.forEach(item => {
            this.$set(this.Model,
              item.attrs.model,
              item.attrs.value ? item.attrs.value : "")
          })
          this.copyModel = JSON.parse(JSON.stringify(this.Model));
        },
        deep: true,
        immediate: true
      },
      mergeItems: {
        handler() {
          if(Object.keys(this.mergeItems).length===0){
            Object.keys(this.Model).forEach(key => {
              this.Model[key]="";
            })
          }
          else{
            this.$nextTick(()=>{
              Object.assign(this.Model,this.mergeItems)
            })
          }    
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped>
  .dialogform div.el-form-item {
    margin-bottom: 30px;
  }
</style>
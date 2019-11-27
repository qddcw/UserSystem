<template>
  <div>
    <el-input clearable  @focus="dialogVisible=true" v-bind="$attrs" style='margin-bottom:5px'></el-input>
    <el-dialog title="选择供应商" :visible.sync="dialogVisible" append-to-body>
      <g-searchform-dialog :form-items="formItems_supplier" :add='false' @handleSearch="searchSupplier"
        ref="searchFrom" style='margin-bottom:8px'></g-searchform-dialog>
      <g-table-dialog :table-data="tableDataSource_dialog" :table-column='column' @current-change="supplierSelect">
      </g-table-dialog>
      <el-pagination @size-change="handleSizeChange_dialog" @current-change="handleCurrentChange_dialog"
        :current-page="page_dialog" :page-sizes="[10, 20, 30, 40]" :page-size="psize_dialog"
        layout="total, sizes, prev, pager, next, jumper" :total="dataTotal_dialog">
      </el-pagination>
      <div style='text-align: right;'>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import supplierApi from '@/api/supplier'
  export default {
    name: 'g-suppliername',
    data() {
      return {
        dialogVisible: false,
        formItems_supplier: [{
            type: 'el-input',
            itemAttrs: {
              prop: "supplier"
            },
            attrs: {
              model: 'supplier',
              placeholder: '供应商名称',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "linkman"
            },
            attrs: {
              model: 'linkman',
              placeholder: '联系人',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "phone"
            },
            attrs: {
              model: 'phone',
              placeholder: '电话号码',
              value: ''
            }
          }
        ],
        column: [{
            prop: "supplier",
            label: '供应商',
            width: 300
          },
          {
            prop: "linkman",
            label: '联系人',
            width: 200
          },
          {
            prop: "phone",
            label: '电话号码',
            width: 200
          },
          {
            prop: "remark",
            label: '备注',

          }
        ],
      }
    },
    methods: {
      searchSupplier(model) {
        this.searchForm_dialog = JSON.parse(JSON.stringify(model));
        this.getList_dialog(this.url_dialog)
      },
      supplierSelect(val) {
        this.$emit("supplierchange", val.supplier)
        this.dialogVisible = false;
      }
    },
    created() {
      this.getList_dialog("/supplier/list/search");
    }
  }
</script>

<style scoped>
  
</style>
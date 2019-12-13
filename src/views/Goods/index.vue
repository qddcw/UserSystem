<template>
  <div>
    <el-card>
      <g-searchform-main :form-items="formItems" @handleSearch="formSearch" @handleAdd="addMember" ref="searchFrom">
      </g-searchform-main>
    </el-card>

    <g-table-main :table-data='tableDataSource' :table-column="column" ref="table">
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </g-table-main>

    <el-card :body-style="{padding:'7px 20px'}" class='pagination'>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
        :page-sizes="[10, 20, 30, 40]" :page-size="psize" layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal">
      </el-pagination>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :append-to-body="true">
      <g-form-dialog :form-items="formItems_dialog" :merge-items="mergefrom" @closeDialog="closeDialog" ref="dialogForm"
        @afterSubmit="submitForm">
      </g-form-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import goodsApi from '@/api/goods'
  export default {
    data() {
      return {
        formItems: [{
            type: 'el-input',
            itemAttrs: {
              prop: "name"
            },
            attrs: {
              model: 'name',
              placeholder: '商品名称',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "code"
            },
            attrs: {
              model: 'code',
              placeholder: '商品编号',
              value: ''
            }
          },
          {
            type: 'g-suppliername',
            itemAttrs: {
              prop: "supplierName"
            },
            attrs: {
              model: 'supplierName',
              placeholder: '供应商',
              value: ''
            },
            listener: {
              supplierchange: this.supplierchange
            }

          },


        ],
        formItems_dialog: [{
            type: 'el-input',
            itemAttrs: {
              prop: "name",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
              label: '商品名称'
            },
            attrs: {
              model: 'name',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "code",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur',
              }],
              label: '商品编号'
            },
            attrs: {
              model: 'code',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "spec",
              label: '商品规格',
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
            },
            attrs: {
              model: 'spec',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "retailPrice",
              label: '商品零售价'
            },
            attrs: {
              model: 'retailPrice',
              value: '',
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "purchasePrice",
              label: '商品进价'
            },
            attrs: {
              model: 'purchasePrice',
              value: '',
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "storageNum",
              label: '商品库存'
            },
            attrs: {
              model: 'storageNum',
              value: '',
            }
          },
          {
            type: 'g-suppliername',
            itemAttrs: {
              prop: "supplierName",
              label: '供应商'
            },
            attrs: {
              model: 'supplierName',
              value: ''
            },
            listener: {
              supplierchange: this.supplierchange1
            }

          },

        ],

        column: [{
            prop: "name",
            label: '商品名称',

          },
          {
            prop: "code",
            label: '商品编号',

          },
          {
            prop: "spec",
            label: '商品规格',

          },
          {
            prop: "retailPrice",
            label: '零售价',

          },
          {
            prop: "purchasePrice",
            label: '进价',

          },
          {
            prop: "storageNum",
            label: '库存',

          },
          {
            prop: "supplierName",
            label: '供应商',

          },

        ],

        dialogFormVisible: false,
        dialogTitle: '',

        mergefrom: {},

      }
    },


    methods: {
      //编辑
      handleEdit(row) {
        this.mergefrom = Object.assign({}, row);
        this.$nextTick(() => {
          this.$refs.dialogForm.$children[0].resetFields();
        })
        this.dialogFormVisible = true;
        this.dialogTitle = "修改商品";
      },
      //删除
      handleDelete(row) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          goodsApi.deleteGoods({
            id: row.id
          }).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.success(resp.message)
            } else {
              this.warn(resp.message)
            }
            this.dialogFormVisible = false;
          })

        }).catch(() => {
          this.normal("已取消删除")
        });
      },

     
      //新增
      addMember() {
        this.mergefrom={};
        this.$nextTick(() => {
          this.$refs.dialogForm.$children[0].resetFields();
        })
        this.dialogFormVisible = true;
        this.dialogTitle = "新增商品";
      },
      //新增提交
      submitForm(data) {
        let subobj = JSON.parse(JSON.stringify(data))
        if (this.dialogTitle.includes("新增")) {
          goodsApi.addGoods(subobj).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.success(resp.message)
            } else {
              this.warn(resp.message)
            }
            this.dialogFormVisible = false;
          })
        } else if (this.dialogTitle.includes("修改")) {
          goodsApi.editGoods(subobj).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.success(resp.message)
            } else {
              this.warn(resp.message)
            }
            this.dialogFormVisible = false;
          })
        }
      },

      supplierchange(val) {
        this.$nextTick(() => {
          this.$refs.searchFrom.Model.supplierName = val;
        })
      },
      supplierchange1(val) {
        this.$refs.dialogForm.Model.supplierName = val;
      }

    },

    created() {
      this.getList("/goods/list/search");
    },



  }
</script>

<style scoped>
  .el-card {
    margin-bottom: 7px;
  }

  .pagination {
    margin-top: -7px;
  }
</style>
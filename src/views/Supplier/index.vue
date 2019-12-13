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
  import supplierApi from '@/api/supplier'
  export default {
    data() {
      return {
        formItems: [{
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
          },


        ],
        formItems_dialog: [{
            type: 'el-input',
            itemAttrs: {
              prop: "supplier",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
              label: '供应商名称'
            },
            attrs: {
              model: 'supplier',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "linkman",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur',
              }],
              label: '联系人'
            },
            attrs: {
              model: 'linkman',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "phone",
              label: '手机号码',
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
            },
            attrs: {
              model: 'phone',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "remark",
              label: '备注'
            },
            attrs: {
              model: 'remark',
              value: '',
              type: 'textarea',
              rows: '4'
            }
          },
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
        this.dialogTitle = "修改供应商";
      },
      //删除
      handleDelete(row) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          supplierApi.deleteSupplier({
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
        this.dialogTitle = "新增供应商";
        
      },
      
      //新增提交
      submitForm(data) {
        let subobj = JSON.parse(JSON.stringify(data))
        if (this.dialogTitle.includes("新增")) {
          supplierApi.addSupplier(subobj).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.success(resp.message)
            } else {
              this.warn(resp.message)
            }
            this.dialogFormVisible = false;
          })
        } else if (this.dialogTitle.includes("修改")) {
          supplierApi.editSupplier(subobj).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.success(resp.message)
            } else {
              this.warn(resp.message)
            }
            this.dialogFormVisible = false;
          })
        }

      }

    },

    created() {
      this.getList("/supplier/list/search");
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
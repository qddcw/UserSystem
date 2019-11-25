<template>
  <div>
    <el-card>
      <g-searchform-main :form-items="formItems" @handleSearch="formSearch" @handleAdd="addStaff" ref="searchFrom">
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <g-form-dialog :form-items="formItems_dialog" :merge-items="mergefrom" @closeDialog="closeDialog" ref="dialogForm"
        @afterSubmit="submitForm">
      </g-form-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import staffApi from '@/api/staff'
  export default {
    data() {
      return {
        formItems: [{
            type: 'el-input',
            itemAttrs: {
              prop: "username"
            },
            attrs: {
              model: 'username',
              placeholder: '员工账号',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "name"
            },
            attrs: {
              model: 'name',
              placeholder: '姓名',
              value: ''
            }
          },
        ],
        formItems_dialog: [{
            type: 'el-input',
            itemAttrs: {
              prop: "username",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
              label: '员工账号'
            },
            attrs: {
              model: 'username',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "name",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur',
              }],
              label: '姓名'
            },
            attrs: {
              model: 'name',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "age",
              label: '年龄',
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
            },
            attrs: {
              model: 'age',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "mobile",
              label: '手机号',
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
            },
            attrs: {
              model: 'mobile',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "salary",
              label: '工资',
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
            },
            attrs: {
              model: 'salary',
              value: ''
            }
          },
          {
            type: 'g-datepicker',
            itemAttrs: {
              prop: "entryDate",
              label: '注册时间',
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
            },
            attrs: {
              model: 'entryDate',
              value: ''
            }
          }
        ],

        column: [{
            prop: "username",
            label: '账号',
          },
          {
            prop: "name",
            label: '姓名',

          },
          {
            prop: "age",
            label: '年龄',

          },
          {
            prop: "mobile",
            label: '手机号',

          },
          {
            prop: "salary",
            label: '工资',

          },
          {
            prop: "entryDate",
            label: '注册时间',

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
        this.dialogTitle = "修改员工信息";
        
      },
      //删除
      handleDelete(row) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          staffApi.deleteStaff({
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
      addStaff() {
        this.mergefrom={};
        this.$nextTick(() => {
          this.$refs.dialogForm.$children[0].resetFields();
        })
        this.dialogFormVisible = true;
        this.dialogTitle = "新增员工";
        
      },
      //新增提交
      submitForm(data) {
        let subobj = JSON.parse(JSON.stringify(data))
        if (this.dialogTitle.includes("新增")) {
          staffApi.addStaff(subobj).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.success(resp.message)
            } else {
              this.warn(resp.message)
            }
            this.closeDialog();
          })
        } else if (this.dialogTitle.includes("修改")) {
          staffApi.editStaff(subobj).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.success(resp.message)
            } else {
              this.warn(resp.message)
            }
            this.closeDialog();
          })
        }

      }

    },

    created() {
      this.getList("/staff/list/search");
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
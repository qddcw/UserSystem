<template>
  <div>
    <el-card>
      <g-searchform-main :form-items="formItems" @handleSearch="formSearch" @handleAdd="addMember" ref="searchFrom">
      </g-searchform-main>
    </el-card>

    <g-table-main :table-data='tableDataSource' :table-column="column" ref="table">
      <template v-slot:payType="{ scope }">
        {{scope.row.payType | payTypeFilter}}
      </template>
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
        @afterSubmit="submitForm" >
      </g-form-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import memberApi from '@/api/member'
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
              placeholder: '会员姓名',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "cardNum"
            },
            attrs: {
              model: 'cardNum',
              placeholder: '会员卡号',
              value: ''
            }
          },
          {
            type: 'g-select',
            itemAttrs: {
              prop: "payType"
            },
            attrs: {
              model: 'payType',
              placeholder: '支付方式',
              value: '',
              options: [{
                  label: '现金',
                  value: '1'
                },
                {
                  label: '支付宝',
                  value: '2'
                },
                {
                  label: '微信',
                  value: '3'
                },
                {
                  label: '银行卡',
                  value: '4'
                },
              ]
            },

          },
          {
            type: 'g-datepicker',
            itemAttrs: {
              prop: "birthday"
            },
            attrs: {
              model: 'birthday',
              placeholder: '会员生日',
              value: ''
            }
          }
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
              label: '会员姓名'
            },
            attrs: {
              model: 'name',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "cardNum",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur',
              }],
              label: '会员卡号'
            },
            attrs: {
              model: 'cardNum',
              value: ''
            }
          },
          {
            type: 'g-select',
            itemAttrs: {
              prop: "payType",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'change'
              }],
              label: '支付方式'
            },
            attrs: {
              model: 'payType',
              value: '',
              options: [{
                  label: '现金',
                  value: '1'
                },
                {
                  label: '支付宝',
                  value: '2'
                },
                {
                  label: '微信',
                  value: '3'
                },
                {
                  label: '银行卡',
                  value: '4'
                },
              ]
            }
          },
          {
            type: 'g-datepicker',
            itemAttrs: {
              prop: "birthday",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
              label: '生日'
            },
            attrs: {
              model: 'birthday',
              value: ''
            }
          },
          {
            type: 'g-areacascader',
            itemAttrs: {
              prop: "address",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'change'
              }],
              label: '地址'
            },
            attrs: {
              model: 'address',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "money",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
              label: '余额'
            },
            attrs: {
              model: 'money',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "integral",
              rules: [{
                required: true,
                message: '必填项',
                trigger: 'blur'
              }],
              label: '积分'
            },
            attrs: {
              model: 'integral',
              value: ''
            }
          },
          {
            type: 'el-input',
            itemAttrs: {
              prop: "phone",
              label: '手机号',
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
        ],

        column: [{
            prop: "name",
            label: '姓名'
          },
          {
            prop: "address",
            label: '地址',
            width: 400
          },
          {
            prop: "birthday",
            label: '生日',
            width: 200
          },
          {
            prop: "money",
            label: '余额'
          },
          {
            prop: "integral",
            label: '积分'
          },
          {
            prop: "cardNum",
            label: '卡号',
            width: 200
          },
          {
            prop: "payType",
            label: '支付方式',
            slot: true
          },
          {
            prop: "phone",
            label: '电话'
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
        this.dialogTitle = "修改会员";
      },
      //删除
      handleDelete(row) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          memberApi.deleteMember({id:row.id}).then(res => {
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
        this.dialogTitle = "新增会员";
        
      },
      //新增提交
      submitForm(data) {
        let subobj = JSON.parse(JSON.stringify(data))
        if (this.dialogTitle.includes("新增")) {
          memberApi.addMember(subobj).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.success(resp.message)
            } else {
              this.warn(resp.message)
            }
            this.dialogFormVisible = false;
          })
        } else if (this.dialogTitle.includes("修改")) {
          memberApi.editMember(subobj).then(res => {
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
      this.getList("/member/list/search");
    },

    filters: {
      payTypeFilter(type) {
        let changeType = "";
        switch (type) {
          case "1":
            changeType = '现金';
            break;
          case "2":
            changeType = '支付宝';
            break;
          case "3":
            changeType = '微信';
            break;
          case "4":
            changeType = '银行卡';
            break;
        }
        return changeType;
      }
    }
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
<template>
  <div class="content">
    <div id="map" class="map"></div>
    <div id="searchInput">
      <el-input
        placeholder="请输入会员姓名"
        prefix-icon="el-icon-search"
        v-model="searchModel"
        clearable
        @focus="memberListVisible = true"
        @input="inputChange"
      >
      </el-input>
    </div>
    <div id="memberList" v-show="memberListVisible">
      <el-card
        shadow="hover"
        body-style="cursor:pointer"
        @click.native="detailsShow(index)"
        v-for="(item, index) in memberList"
        :key="item.id"
      >
        <div>
          <el-tag effect="dark">{{ item.name }}</el-tag
          ><el-button
            @click.stop="showDialog(item)"
            plain
            size="mini"
            type="success"
            circle
            icon="el-icon-edit-outline"
            style="float:right"
          ></el-button>
        </div>
        <span
          ><el-tag effect="plain">{{ item.address }}</el-tag>
          <el-button
            plain
            size="mini"
            type="warning"
            circle
            icon="el-icon-arrow-down"
            style="float:right"
            v-show="!item.show"
          ></el-button>
          <el-button
            plain
            size="mini"
            type="warning"
            circle
            icon="el-icon-arrow-up"
            style="float:right"
            v-show="item.show"
          ></el-button>
        </span>
        <el-card v-show="item.show">
          <el-tag effect="plain">卡号:{{ item.cardNum }}</el-tag
          ><br />
          <el-tag effect="plain">生日:{{ item.birthday }}</el-tag
          ><br />
          <el-tag effect="plain">电话:{{ item.phone }}</el-tag
          ><br />
          <el-tag effect="plain">积分:{{ item.integral }}</el-tag
          ><br />
          <el-tag effect="plain">余额:{{ item.money }}</el-tag
          ><br />
        </el-card>
      </el-card>
      <el-card body-style="padding: 5px 2px;">
        <el-pagination
          @current-change="currentChange"
          :current-page="page"
          :page-size="size"
          layout="total , prev, pager, next"
          :total="dataTotal"
        >
        </el-pagination>
      </el-card>
    </div>
    <el-dialog title="修改会员" :visible.sync="dialogFormVisible">
      <g-form-dialog
        :form-items="formItems_dialog"
        :merge-items="mergefrom"
        @closeDialog="closeDialog"
        ref="dialogForm"
        @afterSubmit="submitForm"
      >
      </g-form-dialog>
    </el-dialog>
  </div>
</template>

<script>
import BMap from "BMap";
import memberApi from "@/api/member.js";
export default {
  data() {
    return {
      searchModel: "",
      memberListModel: [],
      size: 5,
      memberListVisible: false,
      map: {},
      dialogFormVisible: false,
      mergefrom: {},
      formItems_dialog: [
        {
          type: "el-input",
          itemAttrs: {
            prop: "name",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              }
            ],
            label: "会员姓名"
          },
          attrs: {
            model: "name",
            value: ""
          }
        },
        {
          type: "el-input",
          itemAttrs: {
            prop: "cardNum",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              }
            ],
            label: "会员卡号"
          },
          attrs: {
            model: "cardNum",
            value: ""
          }
        },
        {
          type: "g-select",
          itemAttrs: {
            prop: "payType",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "change"
              }
            ],
            label: "支付方式"
          },
          attrs: {
            model: "payType",
            value: "",
            options: [
              {
                label: "现金",
                value: "1"
              },
              {
                label: "支付宝",
                value: "2"
              },
              {
                label: "微信",
                value: "3"
              },
              {
                label: "银行卡",
                value: "4"
              }
            ]
          }
        },
        {
          type: "g-datepicker",
          itemAttrs: {
            prop: "birthday",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              }
            ],
            label: "生日"
          },
          attrs: {
            model: "birthday",
            value: ""
          }
        },
        {
          type: "g-areacascader",
          itemAttrs: {
            prop: "address",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "change"
              }
            ],
            label: "地址"
          },
          attrs: {
            model: "address",
            value: ""
          }
        },
        {
          type: "el-input",
          itemAttrs: {
            prop: "money",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              }
            ],
            label: "余额"
          },
          attrs: {
            model: "money",
            value: ""
          }
        },
        {
          type: "el-input",
          itemAttrs: {
            prop: "integral",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              }
            ],
            label: "积分"
          },
          attrs: {
            model: "integral",
            value: ""
          }
        },
        {
          type: "el-input",
          itemAttrs: {
            prop: "phone",
            label: "手机号",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              }
            ]
          },
          attrs: {
            model: "phone",
            value: ""
          }
        }
      ]
    };
  },
  created() {
    this.initMemberList();
  },
  computed: {
    memberList() {
      return this.memberListModel;
    }
  },

  methods: {
    initMap() {
      // 百度地图API功能
      this.map = new BMap.Map("map");
      let point = new BMap.Point(118.801902, 31.940456);

      this.map.centerAndZoom(point, 15);
      this.map.enableScrollWheelZoom(true);
      this.map.addControl(new BMap.NavigationControl());
    },
    initMemberList() {
      memberApi
        .getMemberList({
          page: this.page,
          size: this.size,
          searchModel: this.searchModel
        })
        .then(res => {
          this.memberListModel = res.data.data.rows;
          this.dataTotal = res.data.data.total;
          this.map.clearOverlays();
          this.memberListModel.forEach(item => {
            let point = new BMap.Point(item.longitude, item.latitude);
            let marker = new BMap.Marker(point); // 创建标注
            this.map.addOverlay(marker);
          });
        });
    },
    //更换页数
    currentChange(val) {
      this.page = val;
      this.initMemberList();
    },
    detailsShow(index) {
      this.memberListModel.forEach((item, ind) => {
        if (ind !== index) {
          item.show = false;
        }
      });
      this.memberListModel[index].show = !this.memberListModel[index].show;
    },
    inputChange() {
      this.initMemberList();
    },
    showDialog(row) {
      this.mergefrom = Object.assign({}, row);
      this.$nextTick(() => {
        this.$refs.dialogForm.$children[0].resetFields();
      });
      this.dialogFormVisible = true;
    },
    submitForm(data) {
      let subobj = JSON.parse(JSON.stringify(data));

      memberApi.editMember(subobj).then(res => {
        const resp = res.data;
        if (resp.flag) {
          this.success(resp.message);
        } else {
          this.warn(resp.message);
        }
        this.dialogFormVisible = false;
      });
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style scoped>
.content {
  position: relative;
}
.map {
  height: calc(100vh - 164px);
  position: relative;
}
#searchInput {
  position: absolute;
  left: 110px;
  top: 20px;
  width: 480px;
}
#memberList {
  position: absolute;
  left: 110px;
  top: 60px;
  width: 480px;
}
.detailsCard {
  display: none;
}
.el-tag {
  margin-bottom: 2px;
}
i {
  font-size: 1.4rem;
}
</style>

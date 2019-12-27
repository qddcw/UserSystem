<template>
  <div class="content">
    <div id="map" class="map"></div>
    <div id="searchInput">
      <el-input
        ref="searchInput"
        placeholder="请输入会员姓名"
        prefix-icon="el-icon-search"
        v-model="searchModel"
        clearable
        @focus="memberListVisible = true"
        @input="inputChange"
      >
      </el-input>
    </div>
    <el-collapse-transition>
      <div id="memberList" v-show="memberListVisible">
        <el-card
          shadow="hover"
          body-style="cursor:pointer"
          @click.native="detailsShow(index)"
          v-for="(item, index) in memberList"
          :key="item.id"
        >
          <div>
            <el-row>
              <el-col :span="4"
                ><el-tag effect="dark">{{ item.name }}</el-tag></el-col
              >
              <el-col :span="5"
                ><el-tag
                  effect="dark"
                  :type="
                    item.right == 1
                      ? 'success'
                      : item.right == 2
                      ? 'danger'
                      : 'warning'
                  "
                  >{{ item.right | rightFilter }}</el-tag
                ></el-col
              >
              <el-col :span="15"
                ><el-button
                  @click.stop="showDialog(item)"
                  plain
                  size="mini"
                  type="success"
                  circle
                  icon="el-icon-edit-outline"
                  style="float:right"
                ></el-button
              ></el-col>
            </el-row>
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
    </el-collapse-transition>
    <el-dialog
      title="修改会员"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <g-form-dialog
        :form-items="formItems_dialog"
        :merge-items="mergefrom"
        @closeDialog="closeDialog"
        ref="dialogForm"
        @afterSubmit="submitForm"
      >
      </g-form-dialog>
    </el-dialog>
    <div id="lengend">
      <el-card :body-style="cardBodyStyle">标注</el-card>
      <el-checkbox-group v-model="checkList">
        <el-card :body-style="cardBodyStyle"
          ><el-checkbox label="1">普通会员</el-checkbox
          ><img src="../../assets/marker/normalVip_small.gif" alt=""
        /></el-card>

        <el-card :body-style="cardBodyStyle"
          ><el-checkbox label="2">高级会员</el-checkbox
          ><img src="../../assets/marker/higherVip_small.gif" alt=""
        /></el-card>

        <el-card :body-style="cardBodyStyle"
          ><el-checkbox label="3">超级会员</el-checkbox
          ><img src="../../assets/marker/superVip_small.gif" alt=""
        /></el-card>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import BMap from "BMap";
import memberApi from "@/api/member.js";
import normalIcon from "@/assets/marker/normalVip.gif";
import higherIcon from "@/assets/marker/higherVip.gif";
import superIcon from "@/assets/marker/superVip.gif";
//import styleJson from "../../assets/custom_map_config.json";
export default {
  data() {
    return {
      cardBodyStyle: "padding: 15px 15px 5px;height:30px;",
      checkList: ["1", "2", "3"],
      searchModel: "",
      memberListModel: [],
      allMemberModel: [],
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
      this.map.centerAndZoom(point, 8);
      this.map.enableScrollWheelZoom(true);
      this.map.addControl(new BMap.NavigationControl());
      this.map.addEventListener("click", () => {
        this.$refs.searchInput.blur();
        this.memberListVisible = false;
      });
    },
    drawMarkers(list) {
      this.map.clearOverlays();
      list.forEach(item => {
        let point = new BMap.Point(item.longitude, item.latitude);
        let Icon =
          item.right == "1"
            ? normalIcon
            : item.right == "2"
            ? higherIcon
            : superIcon;
        var myIcon = new BMap.Icon(Icon, new BMap.Size(50, 60));
        let marker = new BMap.Marker(point, { icon: myIcon }); // 创建标注
        this.map.addOverlay(marker);
      });
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
        });
    },
    getAllMembers() {
      memberApi
        .getAllMemberList({
          checkList: this.checkList
        })
        .then(res => {
          this.map.clearOverlays();
          this.allMemberModel = res.data.data.rows;
          this.drawMarkers(this.allMemberModel);
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
  watch: {
    checkList: {
      handler(n, o) {
        let markerList = [];
        n.forEach(item => {
          markerList = markerList.concat(
            this.allMemberModel.filter(listItem => {
              return listItem.right == item;
            })
          );
        });
        this.drawMarkers(markerList);
      },
      immediate: false
    }
  },
  mounted() {
    this.initMap();
    this.getAllMembers();
  },
  filters: {
    rightFilter(right) {
      let changeType = "";
      switch (right) {
        case "1":
          changeType = "普通会员";
          break;
        case "2":
          changeType = "高级会员";
          break;
        case "3":
          changeType = "超级会员";
          break;
      }
      return changeType;
    }
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
#lengend {
  position: absolute;
  right: 30px;
  bottom: 60px;
  width: 200px;
}
#lengend img {
  float: right;
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

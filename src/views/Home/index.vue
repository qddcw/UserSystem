<template>
  <div class="content">
    <div id="map" class="map"></div>
    <div id="searchInput">
      <el-input
        placeholder="请输入会员姓名"
        prefix-icon="el-icon-search"
        v-model="searchModel"
        clearable
        @focus="memberListVisible = true;"
        @blur="memberListVisible = false;"
        @input="inputChange"
      >
      </el-input>
    </div>
    <div id="memberList" v-show='memberListVisible'>
      <el-card shadow="hover"  body-style="cursor:pointer"
        @click.native="detailsShow(index)"
       v-for="(item,index) in memberList" :key='item.id'>
        <h3>{{item.name}}</h3>
        <span>{{item.address}} 
          <i class="el-icon-arrow-down" style='float:right' v-show='!item.show'></i>
          <i class="el-icon-arrow-up" style='float:right' v-show='item.show'></i>
        </span>
        <el-card v-show='item.show'>
          <p>卡号:{{item.cardNum}}</p>
          <p>生日:{{item.birthday}}</p>
          <p>电话:{{item.phone}}</p>
          <p>积分:{{item.integral}}</p>
          <p>余额:{{item.money}}</p>
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
      memberListVisible:false,
    };
  },
  created() {
    this.initMemberList();
  },
  computed:{
    memberList(){
      return this.memberListModel
    }
  },

  methods: {
    initMap() {
      // 百度地图API功能
      var map = new BMap.Map("map");
      let point = new BMap.Point(118.801902, 31.940456);

      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker);
      map.addControl(new BMap.NavigationControl());
    },
    initMemberList() {
      memberApi
        .getMemberList({
          page: this.page,
          size: this.size,
          searchModel:this.searchModel
        })
        .then(res => {
          this.memberListModel = res.data.data.rows;
          this.dataTotal = res.data.data.total;
        });
    },
    //更换页数
    currentChange(val) {
      this.page = val;
      this.initMemberList();
    },
    detailsShow(index){
      this.memberListModel.forEach((item,ind) => {
        if(ind !== index){
          item.show = false ;
        }
      })
      this.memberListModel[index].show=!this.memberListModel[index].show;
    },
    inputChange(){
      this.initMemberList();
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
.detailsCard{
  display: none;
}
</style>

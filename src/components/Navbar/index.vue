<template>
  <div class="navbar">
    <el-menu
      :default-active="path"
      class="el-menu-vertical-demo"
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        v-for="(item, index) in noChildrenMenu"
        :key="'noch'+index"
        :index="item.path"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-submenu
        v-for="(item, index) in hasChildrenMenu"
        :key="index"
        :index="item.path"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(subitem, subIndex) in item.children"
            :key="subIndex"
            :index="subitem.path"
          >
            <i :class="subitem.icon"></i>
            <span>{{ subitem.title }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getMenu } from "@/api/login";
export default {
  data() {
    return {
      path: "/home",
      menuList: []
    };
  },

  components: {},

  methods: {},
  created() {
    this.path = this.$route.path;
    getMenu(JSON.parse(localStorage.getItem("token"))).then(res => {
      this.menuList = res.data.data.menu;
    });
  },
  computed: {
    hasChildrenMenu() {
      return this.menuList.filter(item => item.children);
    },
    noChildrenMenu() {
      return this.menuList.filter(item => !item.children);
    }
  }
};
</script>

<style scoped>
.el-menu {
  border: 0px;
}
span {
  font-size: 20px;
}
.el-menu-item {
  font-size: 18px;
}
</style>

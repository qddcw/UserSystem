<template>
    <div class="navbar">
        <el-menu :default-active="path"  class="el-menu-vertical-demo" :router="true" 
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/member/">
                <i class="el-icon-user-solid"></i>
                <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="/supplier/">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">供应商管理</span>
            </el-menu-item>
            <el-menu-item index="/goods/">
                <i class="el-icon-s-goods"></i>
                <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/staff/">
                <i class="el-icon-user"></i>
                <span slot="title">员工管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                path:'/home'
            }
        },

        components: {},

        methods: {},
        created(){
            this.path=this.$route.path;
        }
    }
</script>

<style scoped>
    .el-menu{
        border:0px;
    }
    span{
        font-size:20px;
    }
</style>
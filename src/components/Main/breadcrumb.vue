<template>
    <el-card>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item  v-for="(item,index) in $route.meta.title" :key="index">
              {{item}}  </el-breadcrumb-item>
        </el-breadcrumb>
    </el-card>
</template>

<style scoped>
    .el-breadcrumb{
        font-size:20px;
        border-left:6px solid green;
        padding-left:20px;
    }
    .el-card{
        margin-bottom: 7px;
    }
</style>
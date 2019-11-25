<template>
    <el-card>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: $router.path }">{{$route.meta.title}}</el-breadcrumb-item>
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
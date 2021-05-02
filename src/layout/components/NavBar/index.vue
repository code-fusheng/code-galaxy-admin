<template>
  <div class="navbr-containr">
    <!-- TODO 侧边栏控制 -->
    <i class="el-icon-caret-left side-controller"></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">活动管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="right-box">
      <el-dropdown>
      <span class="el-dropdown-link">
        <div>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-s-custom">账户</el-dropdown-item>
          <el-dropdown-item icon="el-icon-right" divided>注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.navbr-containr {
  line-height: inherit;
}

.side-controller {
  float: left;
  width: 20px;
  height: 60px;
  line-height: 60px;
}

.el-breadcrumb {
  margin-left: 20px !important;
  font-size: 14px;
  line-height: 60px !important;
  float: left;
}

.right-box {
  margin-right: 20px;
  line-height: 60px;
  float: right;
}
</style>

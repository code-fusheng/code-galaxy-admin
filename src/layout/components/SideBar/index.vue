<template>
  <div class="sidebar-container">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router="true"
    >
      <!-- 首页 -->
      <el-submenu index="dashboard">
        <template #title>
          <i class="el-icon-s-home"></i>
          <span>首页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </template>
      </el-submenu>
      <!-- 基础管理 -->
      <el-submenu index="base">
        <template #title>
          <i class="el-icon-s-tools"></i>
          <span>基础管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="dictType">字典类型</el-menu-item>
          <el-menu-item index="1-2">公告管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 用户管理 -->
      <el-submenu index="2">
        <template #title>
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">用户管理</el-menu-item>
          <el-menu-item index="2-2">角色管理</el-menu-item>
          <el-menu-item index="2-3">权限管理</el-menu-item>
          <el-menu-item index="2-4">部门管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 考试管理 -->
      <el-submenu index="3">
        <template #title>
          <i class="el-icon-tickets"></i>
          <span>考试管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">题库管理</el-menu-item>
          <el-menu-item index="3-2">试题管理</el-menu-item>
          <el-menu-item index="3-3">规则管理</el-menu-item>
          <el-menu-item index="3-4">试卷管理</el-menu-item>
          <el-menu-item index="3-4">试卷管理</el-menu-item>
          <el-menu-item index="3-5">成绩管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 文章管理 -->
      <el-submenu index="4">
        <template #title>
          <i class="el-icon-reading"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">类型管理</el-menu-item>
          <el-menu-item index="4-2">文章管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  aside {
    width: 181px !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px !important;
    min-height: 400px;
  }
  .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 180px !important;
  }
</style>

<template>
  <div class="sidebar-container">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <!-- 首页 -->
      <el-submenu index="dashboard">
        <template #title>
          <i class="el-icon-s-home"></i>
          <span>首页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </template>
        <el-menu-item-group>
          <router-link to="/dashboard">
            <el-menu-item>数据报表</el-menu-item>
          </router-link>
          <router-link to="/dashboard">
            <el-menu-item>开发测试</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!-- 基础管理 -->
      <el-submenu index="base">
        <template #title>
          <i class="el-icon-s-tools"></i>
          <span>基础管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/base/dictType">
            <el-menu-item>字典类型</el-menu-item>
          </router-link>
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
      <el-submenu index="exam">
        <template #title>
          <i class="el-icon-tickets"></i>
          <span>考试管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/exam/exam">
            <el-menu-item>考试管理</el-menu-item>
          </router-link>
          <router-link to="/exam/repository">
            <el-menu-item>题库管理</el-menu-item>
          </router-link>
          <router-link to="/exam/question">
            <el-menu-item>试题管理</el-menu-item>
          </router-link>
          <router-link to="/exam/rule">
            <el-menu-item>规则管理</el-menu-item>
          </router-link>
          <router-link to="/exam/paper">
            <el-menu-item>试卷管理</el-menu-item>
          </router-link>
          <router-link to="/exam/grades">
            <el-menu-item>成绩管理</el-menu-item>
          </router-link>
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
        isCollapse: true
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
    width: 65px !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 64px !important;
    min-height: 400px;
  }
  .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 180px !important;
    color: black !important;
  }
  a {
    text-decoration: none;
  }
</style>

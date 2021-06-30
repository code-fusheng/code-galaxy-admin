<template>
  <div class="navbr-containr">
    <!-- TODO 侧边栏控制 -->
    <!-- <i class="el-icon-caret-left side-controller"></i> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item @click="changeSideBarState()"><i :class="sideBarState ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span
            v-if="item.redirect==='noRedirect'||index==levelList.length-1"
            class="no-redirect"
          >{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb> -->
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
            <el-dropdown-item icon="el-icon-right" divided @click="toLogin()">登入</el-dropdown-item>
            <el-dropdown-item icon="el-icon-right" divided>注销</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from '@/store/index'

export default defineComponent({
  data() {
    return {
      levelList: null,
      sideBarState: false
    };
  },
  watch: {},
  created() {},
  methods: {
    toLogin() {
      window.location.href = `http://localhost:7000?redirectURL=${window.location.href}`
    },
    changeSideBarState() {
      this.sideBarState = !this.sideBarState
      console.log(this.sideBarState)
      store.commit('setSideBarState', this.sideBarState)
      console.log(store.getters.sideBarState)
    }
  },
});
</script>


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
  /* margin-left: 20px !important; */
  font-size: 14px;
  line-height: 60px !important;
  float: left;
}

.right-box {
  /* margin-right: 20px; */
  line-height: 60px;
  float: right;
}
</style>

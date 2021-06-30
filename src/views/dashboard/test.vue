<template>
  <div>
    <el-button type="primary" @click="testAxios()">获取端口号：{{ port}}</el-button>
    <el-form :inline="true" label-position="left" label-width="80px" :model="loginDto">
      <el-form-item label="用户名">
        <el-input v-model="loginDto.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginDto.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
      <div class="token-text">token:{{ token }}</div>
    </el-form>
    <el-button type="primary" @click="info()">获取用户信息</el-button>
    <div>{{ user }}</div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { Component, Vue } from "vue-property-decorator";
import axios from "@/utils/axios";
import { login, info } from "@/api/user/login";
import store from '@/store/index'

const industryList = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

export default defineComponent({
  data() {
    return {
      port: 0,
      token: '',
      user: {},
      loginDto: {
        loginType: 0,
        username: "code-fusheng",
        password: "123456",
      }
    };
  },
  methods: {
    testAxios() {
      axios.get("/test-server/debug/getPort").then((res) => {
        console.log(res.data);
        this.port = res.data;
      });
    },
    login() {
      login(this.loginDto).then(res => {
        this.token = res.data.access_token
        store.commit('setToken', this.token)
        console.log(store.getters.token)
        this.user = res.data.userInfo
        store.commit('setUser', this.user)
        console.log(store.getters.user)
      })
    },
  },
});
</script>

<style scoped>
.token-text {
  /* 超出隐藏 */
  overflow: hidden;
  /* 超出部分省略号 */
  text-overflow: ellipsis;
}
</style>

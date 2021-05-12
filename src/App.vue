<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getRepositoryList } from '@/api/exam/repository'
import { getRuleList } from '@/api/exam/rule'
import store from '@/store/index'

export default defineComponent({
  name: 'App',
    data() {
    return {
      repositoryList: [],
      ruleList: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getRepositoryList().then((res) => {
        this.repositoryList = res.data
        store.commit('setRepositoryList', this.repositoryList)
      }),
      getRuleList().then((res) => {
        this.ruleList = res.data
        store.commit('setRuleList', this.ruleList)
      })
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000 !important;
  /* margin-top: 60px; */
}

/* 滚动条的宽度 */
::-webkit-scrollbar {
    width: 5px;
    height: 10px;
}
/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-image: linear-gradient(to right,rgba(100, 163, 214, 0.5),rgba(62, 124, 182, 0.5));
}

.pagination {
  margin-top: 15px;
}

  .el-drawer__body {
    overflow-y: auto !important;
  }

</style>

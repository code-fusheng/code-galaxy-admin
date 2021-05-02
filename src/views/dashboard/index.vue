<template>
    <div>
      <el-button type="primary" @click="testAxios()">获取端口号：{{ port}}</el-button>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import axios from '../../utils/axios'
export default defineComponent({
  data() {
    return {
      port: 0
    }
  },
  methods: {
    testAxios() {
      axios.get('/test-server/debug/getPort').then((res) => {
        console.log(res.data)
        this.port = res.data.data
      })
    }
  }
})
</script>

<template>
  <div class="dicttype-container">
    字典数据列表 {{ dictType }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      dictType: {}
    }
  },
  created() {
    this.dictType = this.$route.params.dictType
  },
  methods: {

  }
})
</script>



<template>
  <div>
    <iframe id="mobsf" :src="swaggerUrl" scrolling="no" frameborder="0" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      swaggerUrl: ''
    }
  },
  created() {
    this.swaggerUrl = import.meta.env.VITE_APP_SWAGGER_URL
    console.log('swagger ui:' + this.swaggerUrl)
  },
  mounted() {
    /**
      * iframe-宽高自适应显示
      */
    function changeMobsfIframe() {
      const mobsf = document.getElementById('mobsf')
      const deviceWidth = document.documentElement.clientWidth || document.body.clientWidth
      const deviceHeight = document.documentElement.clientHeight || document.body.clientHeight
      mobsf.style.width = (Number(deviceWidth) - 100) + 'px' // 数字是页面布局宽度差值
      mobsf.style.height = (Number(deviceHeight) - 200) + 'px' // 数字是页面布局高度差
      mobsf.style.width = '100%'
    }

    changeMobsfIframe()

    window.onresize = function() {
      changeMobsfIframe()
    }
  }
})
</script>

<template>
  <div>
    <el-container>
      <el-aside max-width="180px" class="aside">
        <side-bar />
      </el-aside>
      <el-container>
        <el-header>
          <nav-bar />
        </el-header>
        <el-main class="main">
          <router-view :key="key" />
        </el-main>
        <!-- <el-footer class="footer"></el-footer>s -->
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/NavBar/index.vue';
import SideBar from './components/SideBar/index.vue';

export default defineComponent({
  components: {
    NavBar,
    SideBar
  }
});
</script>

<style scoped>
.main {
  min-height: 540px;
}
</style>

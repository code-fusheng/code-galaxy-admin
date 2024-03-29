// vite 配置文件
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// npm i @types/node -D
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 5000, // 设置服务启动端口号
    open: false, // 设置服务器启动是是否自动打开浏览器
    cors: true, // 设置是否允许跨域

    // 配置代理转发
    proxy: {
      '/admin': {
        target: 'http://localhost:9999',
        // target: 'http://42.192.222.62:59999',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/admin', '')
      }
    }
  }
});

## code-galaxy-admin

### 开发日志
```shell
(2021/05/01 09:00 --- 2021/05/03 00:16) build : 工程搭建 --- 搭建 vue3 + vite2 + element-plus + axios + typescript 工程架构、初步完成后台布局设计
(2021/05/03 09:00 --- 2021/05/03 12:27) feature : 模拟登录 --- 初步模拟登录操作,封装 Axios 请求,简单使用 Vuex
(2021/05/03 18:00 --- 2021/05/03 22:46) feature : 字典类型 --- 新增字典类型分页列表页,UI风格整体简约清新化设计 
(2021/05/05 14:00 --- 2021/05/06 00:38) feature : 题库/试题 --- 新增题库与试题的分页查询列表展示
(2021/05/06 09:00 --- 2021/05/06 23:12) feature : 试题/规则 --- 新增试题详情页、组卷规则列表
(2021/05/10 21:00 --- 2021/05/11 03:19) feature : 试卷管理 --- 新增试卷列表、试卷详情页
(2021/05/12 10:00 --- 2021/05/13 02:19) feature : 系统完善
(2021/05/13 02:25 --- 2021/05/13 04:17) fix : 资源配置 --- 修复 vite 根目录配置与 ts 冲突的问题
(2021/05/13 09:00 --- 2021/05/14 01:06) build/feature : 工程部署/系统监控 --- 处理 vite 与 nginx 的代理转发问题，新增生产开发环境变量配置/新增系统监控相关页面(存在问题) 
(2021/06/01 00:00 --- 2021/06/01 00:00) feature/fix : 在线考试/登录认证 --- 新增在线考试相关的实体以及考试试卷试题信息页
```

### 技术说明
> 编程语言：Typecript4.X + JavaScript
> 构建工具：Vite
> 前端框架：Vue3

### 项目初始化搭建
> 集成 Vue Router 、Vuex 、Element Plus 、Axios 、Stylus/Sass/Less

1、安装 vue-router 配置 router/index.ts 
```shell
npm i vue-router@4
```
2、集成状态管理工具 Vuex 配置 store/index.ts
```shell
npm i vuex@next
```
3、集成 UI 框架 Element Plus
```shell
npm i element-plus
```
4、集成 Axios 
```shell
npm i axios
```
5、集成 CSS 预编译器 Stylue/Sass/Less
```shell
npm i stylus -D
# or
npm i sass -D
npm i less -D
```
6、集成 ESLint 并配置
```shell
# 安装
npm i eslint -D
# 初始化配置 .eslintrc.js
npx eslint --init
? How would you like to use ESLint?
- To check syntax, find problems, and enforce code style(检查语法,发现问题并且强制执行代码风格)
? What type of modules does your project use?
- JavaScript modules (import/export)
? Which framework does your project use?
- Vue.js
? Does your project use TypeScript? › No / Yes
- Yes
? Where does your code run?
- Browser and Node (空格键选择,回车确认)
? How would you like to define a style for your project?
- guide
? Which style guide do you want to follow?
- Airbnb: https://github.com/airbnb/javascript
? What format do you want your config file to be in?
- JavaScript
? Would you like to install them now with npm? › No / Yes
- Yes
``` 
7、集成 TS 开发装饰器
```shell
$ npm i -s vue-class-component
$ npm i -S vue-property-decorator
```

8、根目录问题处理
```
// npm i @types/node -D
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
})

// Ts 配置文件 tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["src/*"]
    }
  },
}
```

9、vite 环境配置
```
import.meta.env.VITE_*
```

10 nginx 代理转发问题
```
server {
        gzip on;
        gzip_min_length 5k;
        gzip_buffers 4 16k;
        gzip_http_version 1.0;
        gzip_comp_level 5;
        gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
        gzip_vary on;

        listen       5000;
        server_name  localhost;

        location / {
           root   code_galaxy_admin;
           index  index.html;
           try_files $uri $uri/ /index.html;
           error_page 405 =200 http://$host$request_uri;
        }
    
        location ^~  /api/ {
              proxy_pass http://47.111.158.6:9999/;
              proxy_set_header Host $http_host; 
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Real-Port $remote_port;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
```

11、Echarts 图表库
```shell script
$ npm install echarts --save
```
```
rsync -avz --progress  . root@47.111.158.6:/usr/local/nginx/code_galaxy_admin

rsync -avz --progress  . root@175.24.45.179:/usr/local/nginx/code_galaxy_admin zH1314520?
```

12、$router & $route 路由传值
>> PS: vue3 中 如果路由传参时使用了 path 将忽略 params 的参数。对 query 传参不影响
```vue.js
this.$router.push({
  name: 'Online-exam',
  params: {
    examId: this.examId,
    paperId: paperVo.paperId
  }
})
```

### 后台界面元素设计
#### SideBar 侧边栏

#### NavBar 顶部导航栏（面包屑）

### 常用指令
```shell
rsync -P "-e ssh -p 22221"  -avz --progress  . root@47.111.158.6:/root/App/code-galaxy/code-galaxy-admin
```







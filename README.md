## code-galaxy-admin

### 开发日志
```shell
(2021/05/01 09:00 --- 2021/05/03 00:16) build : 工程搭建 --- 搭建 vue3 + vite2 + element-plus + axios + typescript 工程架构、初步完成后台布局设计
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
$ npm i -S vue-property-decorator
```

### 后台界面元素设计
#### SideBar 侧边栏

#### NavBar 顶部导航栏（面包屑）







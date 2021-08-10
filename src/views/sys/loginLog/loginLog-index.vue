<template>
  <div class="loginLog-container">
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="请求状态">
        <el-select v-model="page.params.loginStatus" placeholder="请求状态" clearable filterable>
          <el-option label="登录成功" :value="0" />
          <el-option label="登录失败" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.loginLogTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <!-- 表单按钮 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini" @click="pageLoginLog">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini" @click="refresh">恢复</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格工具按钮开始 -->
    <el-row :gutter="10" style="margin-bottom: 8px;">
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" class="add-button" size="mini">批量删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-download" disabled class="add-button" size="mini">全部导出</el-button>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <!--
      1. :data 绑定数据 分页对象的的list数据
      2. show-overflow-tooltip 超出部分隐藏
     -->
    <el-table
      v-loading="loading"
      :data="page.list"
      border
      fit
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="changeSort"
    >
      <el-table-column
        type="selection"
        align="center"
        width="45"
      />
      <el-table-column prop="loginLogId" fixed="left" label="#" min-width="60" align="center" />
      <el-table-column prop="userName" label="用户名" align="center" min-width="150" show-overflow-tooltip sortable="custom" />
      <el-table-column prop="ipAddress" label="IP地址" align="center" min-width="100" show-overflow-tooltip />
      <el-table-column prop="loginLocation" label="地理位置" align="center" min-width="150" show-overflow-tooltip />
      <el-table-column prop="browserType" label="浏览器" align="center" min-width="120" />
      <el-table-column prop="osType" label="操作系统" min-width="120" align="center" show-overflow-tooltip />
      <el-table-column prop="loginStatus" label="请求状态" align="center" min-width="120" sortable="custom">
        <template #default={row}>
          <!-- v-if / v-else 用于条件判断 -->
          <el-tag v-if="row.loginStatus === 0" type="success">登录成功</el-tag>
          <el-tag v-else type="danger">登录失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="msg" label="消息提示" min-width="120" align="center" sortable="custom" />
      <el-table-column prop="loginTime" label="登录时间" min-width="160" align="center" sortable="custom" />
      <el-table-column label="操作" min-width="100" align="center">
        <template #default={row}>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="toDelete(row.loginLogId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      align="center"
      class="pagination"
      :current-page="page.currentPage"
      :page-sizes="[10,20,50,100]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { pageLoginLog } from "@/api/sys/loginLog";

export default defineComponent({
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
        params: {
          loginStatus: '',
          loginLogTime: undefined
        },
        list: [],
        sortColumn: "login_time",
        sortMethod: "asc",
      },
      loading: true, // 控制是否显示加载效果
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      selectRows: [], // 被选中的列

    };
  },
  created() {
    this.pageLoginLog()
  },
  methods: {
    pageLoginLog() {
      this.loading = true
        pageLoginLog(this.page).then((res) => {
          this.page = res.data
          this.loading = false
        })
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.loginStatus = ''
      this.page.params.loginLogTime = undefined
      this.pageLoginLog()
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.pageLoginLog()
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.pageLoginLog()
    },
    // 条件排序 e 和 val 都行
    changeSort(e) {
      if (e.order) {
        this.page.sortColumn = e.prop
        this.page.sortMethod = e.order
      } else {
        this.page.sortColumn = ''
        this.page.sortMethod = 'asc'
      }
      this.pageLoginLog()
    },
    // 数据表格的多选择框选择时触发
    handleSelectionChange(selection) {
      this.selectRows = selection.map(item => item.loginLogId)
      console.log(this.selectRows)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
  }
});
</script>


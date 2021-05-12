<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="题库名称">
        <el-input v-model="page.params.repositoryName" placeholder="请输入题库名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini" @click="search">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini" @click="refresh">重置</el-button>
      </el-form-item>
      <!-- 表格工具按钮开始 -->
    <el-row :gutter="10" style="margin-bottom: 8px;">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="openAddDialog">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="openUpdateDialog">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="toDelete">删除</el-button>
      </el-col>
    </el-row>
    <!-- 表格工具按钮结束 -->
    </el-form>
    <el-table
      v-loading="loading"
      :data="page.list"
      border
      fit
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :row-style="{cursor: 'pointer'}"
      @selection-change="handleSelectionChange"
      @sort-change="changeSort"
    >
      <el-table-column type="selection" max-width="50" align="center" />
      <!-- <el-table-column type="index" fixed="left" label="#" min-width="50" align="center" /> -->
      <el-table-column prop="repositoryId" label="题库编号" show-overflow-tooltip align="center" />
      <el-table-column prop="repositoryName" label="题库名称" min-width="200" align="center" sortable="custom" show-overflow-tooltip />
      <el-table-column prop="questionCount" label="试题数" show-overflow-tooltip align="center" sortable="custom" />
      <el-table-column prop="createdTime" label="创建时间" show-overflow-tooltip align="center" sortable="custom" />
      <!-- <el-table-column prop="createdName" label="创建者" min-width="120" align="center" />
      <el-table-column prop="updatorName" label="更新者" min-width="120" align="center" /> -->
      <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip />
      <el-table-column prop="isEnabled" label="状态" align="center">
        <template #default={row}>
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template #default={row}>
          <el-button type="text" size="mini" icon="el-icon-edit" @click="openUpdateDialog(row)">修改</el-button>
          <el-button type="text" size="mini" icon="el-icon-view" >查看</el-button>
          <el-button v-if="row.isEnabled === 0" type="text" icon="el-icon-check" size="mini" >启用</el-button>
          <el-button v-if="row.isEnabled === 1" type="text" icon="el-icon-close" size="mini" >弃用</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="toDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="center"
      class="pagination"
      :current-page="page.currentPage"
      :page-sizes="[5,10,20,50]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 添加弹窗 -->
    <el-dialog title="添加题库" v-model="addDialog">
      <repository-add @closeAddDialog="closeAddDialog" @getRepositoryByPage="getRepositoryByPage" />
    </el-dialog>
    <!--
      修改弹窗 :repository="repository" 用于传递参数对象
    -->
    <el-dialog title="修改题库" v-model="updateDialog">
      <repository-update :repository="repository" @closeUpdateDialog="closeUpdateDialog" @getRepositoryByPage="getRepositoryByPage" />
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getRepositoryByPage, getRepositoryById, deleteRepositoryByIds } from "../../../api/exam/repository";
import { ElMessageBox, ElMessage } from 'element-plus'

import RepositoryAdd from './repository-add.vue'
import RepositoryUpdate from './repository-update.vue'

export default defineComponent({
  components: {
    RepositoryAdd,
    RepositoryUpdate
  },
  data() {
    return {
      repository: {},
      page: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
        params: {
          repositoryName: ''
        },
        list: [],
        sortColumn: 'created_time',
        sortMethod: 'asc'
      },
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      selectRepositorys: [], // 被选中的列
      loading: true, // 控制是否显示加载效果
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    };
  },
  created() {
    this.getRepositoryByPage();
  },
  methods: {
    getRepositoryByPage() {
      getRepositoryByPage(this.page).then((res) => {
        this.page = res.data;
        this.loading = false
      });
    },
    // 删除
    toDelete(row) {
      this.ids = []
      var id: number = row.repositoryId
      this.ids = this.selectRepositorys
      console.log('批量删除' + this.ids)
      ElMessageBox.confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRepositoryByIds(this.ids).then(res => {
          this.getRepositoryByPage()
        })
      }).catch(() => {
        ElMessage.info('操作提示: 已取消删除!')
      })
    },
    // 页面功能组件
    // 条件搜索
    search() {
      this.page.currentPage = 1
      this.getRepositoryByPage()
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.repositoryName = ''
      this.getRepositoryByPage()
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getRepositoryByPage()
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getRepositoryByPage()
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
      this.getRepositoryByPage()
    },
    // 数据表格的多选择框选择时触发
    handleSelectionChange(selection) {
      this.selectRepositorys = selection.map(item => item.repositoryId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    openAddDialog() {
      // 打开添加弹窗
      this.addDialog = true
    },
    // 修改
    openUpdateDialog(row) {
      var id = row.repositoryId
      if (id === undefined) {
        id = this.selectRepositorys[0]
      }
      getRepositoryById(id).then(res => {
        this.repository = res.data
        this.updateDialog = true
      })
    },
    closeAddDialog() {
      // 关闭添加弹窗
      this.addDialog = false
    },
    closeUpdateDialog() {
      // 关闭修改弹窗
      this.updateDialog = false
    }
  },
});
</script>


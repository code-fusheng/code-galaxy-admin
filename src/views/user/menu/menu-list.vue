<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="权限名称">
        <el-input v-model="page.params.name" placeholder="请输入权限名称" clearable />
      </el-form-item>
      <el-form-item label="权限级别">
        <el-select v-model="page.params.level" placeholder="请选择权限级别" clearable filterable>
          <el-option label="一级" :value="1" />
          <el-option label="二级" :value="2" />
          <el-option label="三级" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini" @click="pageMenu">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini" @click="refresh">重置</el-button>
      </el-form-item>
            <!-- 表格工具按钮开始 -->
      <el-row :gutter="10" style="margin-bottom: 8px;">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="openAddDialog">添加</el-button>
        </el-col>
      </el-row>
      <!-- 表格工具按钮结束 -->
    </el-form>

        <!-- 列表 -->
    <!--
      1. :data v-bind:model="page.list" 绑定数据 分页对象的的list数据
      2. show-overflow-tooltip 超出部分隐藏
      3. @selection-change="handleSelectionChange" selection-change	当选择项发生变化时会触发该事件
      4. @sort-change="changeSort" sort-change 事件回中可以获取当前排序的字段名[prop]和排序顺序[order]
     -->
    <el-table
      v-loading="loading"
      :data="page.list"
      border
      fit
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :row-style="{cursor: 'pointer'}"
    >
      <el-table-column prop="menuId" label="权限Id" width="100" align="center" sortable="custom" fixed="left" />
      <el-table-column prop="name" label="权限名称" min-width="180" align="center" show-overflow-tooltip/>
      <el-table-column prop="permission" label="权限标识" min-width="180" align="center" show-overflow-tooltip/>
      <el-table-column prop="path" label="权限路径" min-width="180" align="center" show-overflow-tooltip/>
      <el-table-column prop="level" label="级别" width="150" align="center" sortable="custom">
        <template #default={row}>
          <el-tag v-if="row.level === 1" type="danger">一级</el-tag>
          <el-tag v-if="row.level === 2" type="success">二级</el-tag>
          <el-tag v-if="row.level === 3">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pid" label="父级Id" width="100" align="center" sortable="custom" />
      <el-table-column prop="createdTime" label="创建时间" min-width="220" align="center" sortable="custom" />
      <!-- <el-table-column prop="updatedTime" label="更新时间" min-width="220" align="center" sortable="custom" /> -->
      <el-table-column prop="enable" label="状态" width="150" align="center">
        <template #default={row}>
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300" align="center">
        <template #default={row}>
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="toUpdate(row.menuId)">修改</el-button>
          <el-button v-if="row.isEnabled === 0" icon="el-icon-check" size="mini" type="success" @click="toEnable(row.menuId)">启用</el-button>
          <el-button v-if="row.isEnabled === 1" icon="el-icon-close" size="mini" type="warning" @click="toDisable(row.menuId)">弃用</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="toDelete(row.menuId)">删除</el-button>
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
    />

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { pageMenu } from '@/api/user/menu'

export default defineComponent({
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
        params: {
          menuName: "",
        },
        list: [],
        sortColumn: "created_time",
        sortMethod: "asc",
      },
      loading: true, // 控制是否显示加载效果
      selectmenus: [], // 被选中的模版列
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  created() {
    this.pageMenu()
  },
  methods: {
    pageMenu() {
      pageMenu(this.page).then((res) => {
        this.page = res.data
        this.loading = false
      })
    },
    // 页面功能组件
    // 条件搜索
    search() {
      this.page.currentPage = 1;
      this.getUserByPage();
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1;
      this.getUserByPage();
    },
  }
})
</script>


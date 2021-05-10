<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="题库名称">
        <el-input v-model="page.params.repositoryName" placeholder="请输入题库名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini">恢复</el-button>
      </el-form-item>
      <!-- 表格工具按钮开始 -->
    <el-row :gutter="10" style="margin-bottom: 8px;">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple">删除</el-button>
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
    >
      <el-table-column type="selection" width="50" align="center" />
      <!-- <el-table-column type="index" fixed="left" label="#" min-width="50" align="center" /> -->
      <el-table-column prop="repositoryId" label="题库编号" width="200" align="center" />
      <el-table-column prop="repositoryName" label="题库名称" min-width="220" align="center" sortable="custom" show-overflow-tooltip />
      <el-table-column prop="questionCount" label="试题数" width="120" align="center" sortable="custom" />
      <el-table-column prop="createdTime" label="创建时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="updatedTime" label="更新时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="createdName" label="创建者" min-width="120" align="center" />
      <el-table-column prop="updatorName" label="更新者" min-width="120" align="center" />
      <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip />
      <el-table-column prop="isEnabled" label="状态" min-width="100" align="center">
        <template #default={row}>
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300" align="center">
        <template #default={row}>
          <el-button type="text" size="mini" icon="el-icon-edit" >修改</el-button>
          <el-button type="text" size="mini" icon="el-icon-view" >查看</el-button>
          <el-button v-if="row.isEnabled === 0" type="text" icon="el-icon-check" size="mini" >启用</el-button>
          <el-button v-if="row.isEnabled === 1" type="text" icon="el-icon-close" size="mini" >弃用</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" >删除</el-button>
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

<script lang="ts">
import { defineComponent } from "vue";
import { getRepositoryByPage } from "../../../api/exam/repository";

export default defineComponent({
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
        params: {},
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
      loading: true, // 控制是否显示加载效果
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
  },
});
</script>


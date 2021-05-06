<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="规则名称">
        <el-input v-model="page.params.ruleName" placeholder="请输入试卷规则名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini">恢复</el-button>
      </el-form-item>
    </el-form>
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
        <el-table
      v-loading="loading"
      :data="page.list"
      border
      fit
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :row-style="{cursor: 'pointer'}"
    >
      <el-table-column type="expand">
        <template #default={row}>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="规则名称">
              <span>{{ row.ruleName }}</span>
            </el-form-item>
            <el-form-item label="总分">
              <span>{{ row.totalScore }}</span>
            </el-form-item>
            <el-form-item label="合格分数">
              <span>{{ row.eligibilityScore }}</span>
            </el-form-item>
            <el-form-item label="时长">
              <span>{{ row.totalTime }}</span>
            </el-form-item>
            <el-form-item label="单选题数">
              <span>{{ row.singleCount }}</span>
            </el-form-item>
            <el-form-item label="单选总分">
              <span>{{ row.singleScore }}</span>
            </el-form-item>
            <el-form-item label="多选题数">
              <span>{{ row.multipleCount }}</span>
            </el-form-item>
            <el-form-item label="多选总分">
              <span>{{ row.multipleScore }}</span>
            </el-form-item>
            <el-form-item label="填空题数">
              <span>{{ row.fillCount }}</span>
            </el-form-item>
            <el-form-item label="填空总分">
              <span>{{ row.fillScore }}</span>
            </el-form-item>
            <el-form-item label="判断题数">
              <span>{{ row.judgeCount }}</span>
            </el-form-item>
            <el-form-item label="判断总分">
              <span>{{ row.judgeScore }}</span>
            </el-form-item>
            <el-form-item label="简答题数">
              <span>{{ row.shortCount }}</span>
            </el-form-item>
            <el-form-item label="简答总分">
              <span>{{ row.shortScore }}</span>
            </el-form-item>
            <el-form-item label="创建者">
              <span>{{ row.createdUserName }}</span>
            </el-form-item>
            <el-form-item label="更新者">
              <span>{{ row.updateUserName }}</span>
            </el-form-item>
            <el-form-item label="规则题库">
              <span>{{ row.repositoryId }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="ruleId" label="规则编号" width="200" align="center" />
      <el-table-column prop="ruleName" label="规则名称" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column prop="createdTime" label="创建时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="updatedTime" label="更新时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="createdName" label="创建者" min-width="120" align="center" />
      <el-table-column prop="updatorName" label="更新者" min-width="120" align="center" />
      <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip />
      <el-table-column prop="isEnable" label="状态" min-width="100" align="center">
        <template #default={row}>
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300" align="center">
        <template #default={row}>
          <el-button type="text" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="text" size="mini" icon="el-icon-view">查看</el-button>
          <el-button v-if="row.isEnabled === 0" type="text" icon="el-icon-check" size="mini">启用</el-button>
          <el-button v-if="row.isEnabled === 1" type="text" icon="el-icon-close" size="mini">弃用</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--
      分页组件-最完整版
      class : 分页组件
      current-page : 当前页 此处为动态绑定page对象的currentPage属性
      page-sizes : 每页显示个数选择器的选项设置
      page-size : 每页大小
      layout : 组件布局
      total : 总条目数 此处动态绑定page对象的totalCount属性
      @size-change="handleSizeChange"  pageSize 改变时会触发  参数:每页条数
      @current-change="handleCurrentChange" currentPage 改变时会触发 参数:当前页
     -->
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
import { defineComponent } from 'vue'
import { getRuleByPage } from "../../../api/exam/rule";

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
    this.getRuleByPage();
  },
  methods: {
    getRuleByPage() {
      getRuleByPage(this.page).then((res) => {
        this.page = res.data;
        this.loading = false
      });
    },
  },
})
</script>

<style scoped>
  .demo-form-inline {
    padding-top: 10px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
</style>

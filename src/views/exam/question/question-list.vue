<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="试题内容">
        <el-input v-model="page.params.questionContent" placeholder="请输入试题名称" clearable />
      </el-form-item>
      <el-form-item label="题库归属" prop="repositoryId">
        <el-select v-model="page.params.repositoryId" placeholder="请选择所属题库" clearable filterable>
          <el-option
            v-for="repository in requestionList"
            :key="repository.repositoryId"
            :label="repository.repositoryName"
            :value="repository.repositoryId"
          />
        </el-select>
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
      <el-table-column type="expand">
        <template #default={row}>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="试题内容">
              <span>{{ row.questionContent }}</span>
            </el-form-item>
            <el-form-item label="试题图片">
              <span>{{ row.questionImage }}</span>
            </el-form-item>
            <el-form-item label="试题视频">
              <span>{{ row.questionVideo }}</span>
            </el-form-item>
            <el-form-item label="试题代码">
              <span>{{ row.questionCode }}</span>
            </el-form-item>
            <el-form-item label="创建者">
              <span>{{ row.createdUserName }}</span>
            </el-form-item>
            <el-form-item label="更新者">
              <span>{{ row.updateUserName }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ row.remark }}</span>
            </el-form-item>
            <el-form-item label="题库名称">
              <span>{{ row.repositoryName }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="questionId" label="试题编号" min-width="180" align="center" />
      <el-table-column label="试题内容" prop="questionContent" min-width="300" align="left" show-overflow-tooltip>
        <template #default={row}>
          <router-link :to="'questionInfo/' + row.questionId" class="link-type">
            <span>{{ row.questionContent }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="questionTypeId" label="试题类型" min-width="100" align="center">
        <template #default={row}>
          <el-tag v-if="row.questionTypeId === 0" type="info">其它</el-tag>
          <el-tag v-else-if="row.questionType === 1" type="success">单选题</el-tag>
          <el-tag v-else-if="row.questionType === 2">多选题</el-tag>
          <el-tag v-else-if="row.questionType === 3" type="warning">填空题</el-tag>
          <el-tag v-else-if="row.questionType === 4" type="danger">判断题</el-tag>
          <el-tag v-else-if="row.questionType === 5" type="success">简答题</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="questionTagId" label="试题标签" min-width="100" align="center">
        <template #default={row}>
          <el-tag v-if="row.questionTagId === 0">其它</el-tag>
          <el-tag v-else-if="row.questionTag === 1">基础题</el-tag>
          <el-tag v-else-if="row.questionTag === 2" type="danger">提升题</el-tag>
          <el-tag v-else-if="row.questionTag === 3" type="warning">主观题</el-tag>
          <el-tag v-else-if="row.questionTag === 4" type="success">客观题</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="updatedTime" label="更新时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="isEnable" label="状态" min-width="80" align="center">
        <template #default={row}>
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template #default={row}>
          <el-button type="text" size="mini" icon="el-icon-edit">修改</el-button>
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
import { getQuestionByPage } from "../../../api/exam/question"

export default defineComponent({
  data() {
    return {
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 20, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {}, // 查询参数对象
        list: [], // 数据
        sortColumn: 'createdTime', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      requestionList: [],
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      loading: true, // 控制是否显示加载效果
    }
  },
  created() {
    this.getQuestionByPage()
  },
  methods: {
    getQuestionByPage() {
      getQuestionByPage(this.page).then((res) => {
        this.page = res.data;
        this.loading = false
      })
    }
  }

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
    width: 50%;
  }
</style>


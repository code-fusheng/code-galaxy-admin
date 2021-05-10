<template>
  <div class="dicttype-container">
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="字典标签">
        <el-input v-model="page.params.dictLabel" placeholder="请输入字典标签" clearable />
      </el-form-item>
      <el-form-item label="字典类型">
        <el-input v-model="page.params.dictType" placeholder="请输入字典类型" clearable />
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
      <el-col :span="1.5">
        <el-button type="warning" icon="el-icon-refresh" size="mini">缓存同步</el-button>
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
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="dictLabel" label="字典标签" min-width="180" align="center" show-overflow-tooltip />
      <el-table-column prop="dictValue" label="字典键值" min-width="120" align="center" />
      <el-table-column prop="dictType" label="字典类型" min-width="180" align="center" show-overflow-tooltip />
      <el-table-column prop="dictSort" label="字典排序" min-width="120" align="center" />
      <el-table-column prop="createdTime" label="创建时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="updateTime" label="更新时间" min-width="180" align="center" sortable="custom" />
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
import { getDictDataByPage } from '../../../../api/base/dictData'

export default defineComponent({
  data() {
    return {
      dictType: {},
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {
          dictType: {}
        }, // 查询参数对象
        list: [], // 数据
        sortColumn: 'createdTime', // 排序列
        sortMethod: 'asc' // 排序方式
      },
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
    this.page.params.dictType = this.$route.params.dictType
    this.getDictDataByPage()
  },
  methods: {
    getDictDataByPage() {
      getDictDataByPage(this.page).then((res) => {
        this.page = res.data
        this.loading = false
      })
    }
  }
})
</script>



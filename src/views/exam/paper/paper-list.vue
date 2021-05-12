<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="试卷名称">
        <el-input v-model="page.params.paperName" placeholder="请输入试卷名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini">恢复</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格工具按钮开始 -->
    <el-row :gutter="10" style="margin-bottom: 8px;">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="openAddDialog">新增</el-button>
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
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="paperId" label="试卷编号" width="200" align="center" />
      <el-table-column label="试卷名称" prop="paperName" min-width="200" align="center" show-overflow-tooltip>
        <template #default={row}>
          <router-link :to="'paperInfo/' + row.paperId" class="link-type">
            <span>{{ row.paperName }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="ruleName" label="规则名称" min-width="200" align="center" show-overflow-tooltip />
      <!-- <el-table-column prop="createdTime" label="创建时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="updatedTime" label="更新时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="creatorName" label="创建者" min-width="120" align="center" />
      <el-table-column prop="updaterName" label="更新者" min-width="120" align="center" /> -->
      <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip />
      <el-table-column prop="isEnable" label="状态" min-width="100" align="center">
        <template #default={row}>
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="250" align="center">
        <template #default={row}>
          <el-button type="text" icon="el-icon-position" size="mini">发布考试</el-button>
          <el-button type="text" size="mini" icon="el-icon-edit" >修改</el-button>
          <el-button v-if="row.isEnabled === 0" type="text" icon="el-icon-check" size="mini">启用</el-button>
          <el-button v-if="row.isEnabled === 1" type="text" icon="el-icon-close" size="mini">弃用</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      分页组件-最完整版
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

    <!-- 添加弹窗 -->
    <el-dialog title="添加试卷" v-model="addDialog">
      <paper-add @closeAddDialog="closeAddDialog" @getPaperByPage="getPaperByPage" />
    </el-dialog>
    <!--
      修改弹窗
      :paper="paper" 用于传递参数对象
    -->
    <el-dialog title="修改试卷" v-model="updateDialog">
      <paper-update :paper="paper" @closeUpdateDialog="closeUpdateDialog" @getPaperByPage="getPaperByPage" />
    </el-dialog>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getPaperByPage } from '../../../api/exam/paper'

// 导入组件
import paperAdd from './paper-add.vue'
import paperUpdate from './paper-update.vue'


export default defineComponent({
  //  定义添加的组件 子组件/私有组件
  components: {
    paperAdd,
    paperUpdate
  },
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
      loading: true, // 控制是否显示加载效果
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      loading: true, // 控制是否显示加载效果
      selectPapers: [], // 被选中的列
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  created() {
    this.getPaperByPage()
  },
  methods: {
    getPaperByPage() {
      getPaperByPage(this.page).then((res) => {
        this.page = res.data
        this.loading = false
      })
    },
    // 模块功能组件
    openAddDialog() {
      // 打开添加弹窗
      this.addDialog = true
    },
    closeAddDialog() {
      // 关闭添加弹窗
      this.addDialog = false
    },
    closeUpdateDialog() {
      // 关闭修改弹窗
      this.updateDialog = false
    }
  }
})
</script>


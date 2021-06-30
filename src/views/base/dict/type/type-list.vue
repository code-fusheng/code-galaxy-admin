<template>
  <div class="dictType-container">
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="类型名称">
        <el-input v-model="page.params.dictName" placeholder="请输入类型名称" clearable />
      </el-form-item>
      <el-form-item label="类型标识">
        <el-input v-model="page.params.dictType" placeholder="请输入类型标识" clearable />
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.dictTypeTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini" @click="search">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini" @click="refresh">重置</el-button>
      </el-form-item>
    </el-form>
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
      <el-col :span="1.5">
        <el-button type="warning" icon="el-icon-refresh" size="mini">缓存同步</el-button>
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
      @selection-change="handleSelectionChange"
      @sort-change="changeSort"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="dictName" label="类型名称" width="120" align="center" show-overflow-tooltip />
      <el-table-column prop="dictType" label="字典类型" width="180" align="center" show-overflow-tooltip>
        <template #default={row}>
          <router-link :to="'/base/dictData/' + row.dictType" class="link-type">
            <span>{{ row.dictType }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="160" align="center" sortable="custom" />
      <el-table-column prop="updatedTime" label="更新时间" width="160" align="center" sortable="custom" />
      <el-table-column prop="creatorName" label="创建者" width="120" align="center" show-overflow-tooltip  />
      <el-table-column prop="updaterName" label="更新者" width="120" align="center" show-overflow-tooltip  />
      <el-table-column prop="remark" label="备注" width="120" align="center" show-overflow-tooltip />
      <el-table-column prop="isEnabled" label="状态" width="80" align="center">
        <template #default={row}>
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" align="center">
        <template #default={row}>
          <el-button type="text" size="mini" icon="el-icon-edit" @click="openUpdateDialog(row)">修改</el-button>
          <el-button v-if="row.isEnabled === 0" type="text" icon="el-icon-check" size="mini" >启用</el-button>
          <el-button v-if="row.isEnabled === 1" type="text" icon="el-icon-close" size="mini" >弃用</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="toDelete(row)">删除</el-button>
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 添加弹窗 -->
    <el-dialog title="添加字典类型" v-model="addDialog">
      <type-add @closeAddDialog="closeAddDialog" @getDictTypeByPage="getDictTypeByPage" />
    </el-dialog>
    <!--
      修改弹窗
      :type="type" 用于传递参数对象
    -->
    <el-dialog title="修改字典类型" v-model="updateDialog">
      <type-update :type="type" @closeUpdateDialog="closeUpdateDialog" @getDictTypeByPage="getDictTypeByPage" />
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getDictTypeByPage, getDictTypeById, deleteDictTypeByIds } from '@/api/base/dictType'
import { ElMessageBox, ElMessage } from 'element-plus'

import TypeAdd from './type-add.vue'
import TypeUpdate from './type-update.vue'

export default defineComponent({
  components: {
    TypeAdd,
    TypeUpdate
  },
  data() {
    return {
      type: {},
      dictTypeTime: {},
      page: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
        params: {
          dictName: '',
          dictType: '',
          dictTypeTime: undefined
        },
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
      selectTypes: [], // 被选中的列
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  created() {
    this.getDictTypeByPage()
  },
  methods: {
    getDictTypeByPage() {
      this.loading = true
      getDictTypeByPage(this.page).then((res) => {
        this.page = res.data
        this.loading = false
      })
    },
    openAddDialog() {
      this.addDialog = true
    },
    openUpdateDialog(row: any) {
      var id: number = row.dictId
      if (id === undefined) {
        id = this.selectTypes[0]
      }
      getDictTypeById(id).then(res => {
        this.type = res.data
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
    },
    // 删除
    toDelete(row: any) {
      let ids: any[] = []
      if (row.dictId == undefined) {
        ids = this.selectTypes
      } else {
        var id: any = row.dictId
        ids.push(id)
      }
      console.log('批量删除' + ids)
      ElMessageBox.confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDictTypeByIds(ids).then(res => {
          this.getDictTypeByPage()
        })
      }).catch(() => {
        ElMessage.info('操作提示: 已取消删除!')
      })
    },
    // 页面功能组件
    // 条件搜索
    search() {
      this.page.currentPage = 1
      this.getDictTypeByPage()
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.dictName = ''
      this.page.params.dictType = ''
      this.page.params.dictTypeTime = undefined
      this.getDictTypeByPage()
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getDictTypeByPage()
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getDictTypeByPage()
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
      this.getDictTypeByPage()
    },
    // 数据表格的多选择框选择时触发
    handleSelectionChange(selection) {
      this.selectTypes = selection.map(item => item.dictId)
      console.log(this.selectTypes)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
  }
})
</script>

<template>
  <div class="dictDype-container">
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="字典标签">
        <el-input v-model="page.params.dictLabel" placeholder="请输入字典标签" clearable />
      </el-form-item>
      <el-form-item label="字典类型">
        <el-input v-model="page.params.dictType" placeholder="请输入字典类型" clearable />
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.dictDataTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini" @click="search">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini" @click="refresh">恢复</el-button>
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
            <el-table-column prop="dictValue" label="字典键值" width="100" align="center" show-overflow-tooltip />
      <el-table-column prop="dictLabel" label="字典标签" width="120" align="center" show-overflow-tooltip />
      <el-table-column prop="dictType" label="字典类型" width="180" align="center" show-overflow-tooltip />
      <el-table-column prop="dictSort" label="排序" width="80" align="center" sortable="custom" />
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
    />

    <!-- 添加弹窗 -->
    <el-dialog title="添加字典数据" v-model="addDialog">
      <data-add @closeAddDialog="closeAddDialog" @getDictDataByPage="getDictDataByPage" />
    </el-dialog>
    <!--
      修改弹窗
      :type="type" 用于传递参数对象
    -->
    <el-dialog title="修改字典数据" v-model="updateDialog">
      <data-update :type="type" :data="data" @closeUpdateDialog="closeUpdateDialog" @getDictDataByPage="getDictDataByPage" />
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getDictDataByPage, getDictDataByCode, deleteDictDataByCodes } from '@/api/base/dictData'

import DataAdd from './data-add.vue'
import DataUpdate from './data-update.vue'

import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    DataAdd,
    DataUpdate
  },
  data() {
    return {
      dictType: {},
      // 组件传输对象
      type: {}, // 字典类型
      data: {}, // 字典数据
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {
          dictType: {},
          dictLabel: '',
          dictDataTime: undefined
        }, // 查询参数对象
        list: [], // 数据
        sortColumn: 'createdTime', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      loading: true, // 控制是否显示加载效果
      // 选中数组
      codes: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      selectDatas: [], // 被选中的列
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  created() {
    this.page.params.dictType = this.$route.params.dictType
    this.getDictDataByPage()
  },
  methods: {
    getDictDataByPage() {
      this.loading = true
      getDictDataByPage(this.page).then((res) => {
        this.page = res.data
        this.loading = false
      })
    },
    openAddDialog() {
      this.addDialog = true
      this.type = this.$route.params.dictType
    },
    openUpdateDialog(row: any) {
      var code: number = row.dictCode
      if (code === undefined) {
        code = this.selectDatas[0]
      }
      getDictDataByCode(code).then(res => {
        this.data = res.data
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
      let codes: any[] = []
      if (row.dictCode == undefined) {
        codes = this.selectDatas
      } else {
        var code: any = row.dictCode
        codes.push(code)
      }
      console.log('批量删除' + codes)
      ElMessageBox.confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDictDataByCodes(codes).then(res => {
          this.getDictDataByPage()
        })
      }).catch(() => {
        ElMessage.info('操作提示: 已取消删除!')
      })
    },
    // 页面功能组件
    // 条件搜索
    search() {
      this.page.currentPage = 1
      this.getDictDataByPage()
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.dictLabel = ''
      this.page.params.dictDataTime = undefined
      this.getDictDataByPage()
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getDictDataByPage()
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getDictDataByPage()
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
      this.getDictDataByPage()
    },
    // 数据表格的多选择框选择时触发
    handleSelectionChange(selection) {
      this.selectDatas = selection.map(item => item.dictCode)
      console.log(this.selectDatas)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
  }
})
</script>



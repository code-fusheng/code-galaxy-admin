<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="分类名称">
        <el-input v-model="page.params.categoryName" placeholder="分类名称" clearable />
      </el-form-item>
      <el-form-item label="分类级别">
        <el-select v-model="page.params.level" placeholder="请求状态" clearable filterable>
          <el-option label="一级" :value="1" />
          <el-option label="二级" :value="2" />
          <el-option label="三级" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.categoryTime"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini" @click="search">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini" @click="refresh">恢复</el-button>
        <el-button type="primary" icon="el-icon-plus" class="add-button" size="mini" @click="openAddDialog">添加</el-button>
      </el-form-item>
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
      @selection-change="handleSelectionChange"
      @sort-change="changeSort"
    >
      <el-table-column type="index" fixed="left" label="#" min-width="60" align="center" />
      <el-table-column prop="categoryName" label="模版名称" min-width="150" align="center" sortable="custom" />
      <el-table-column prop="categoryImage" label="分类图片" align="center" width="120">
        <template #default={row}>
          <el-image
            style="width: 100%;height: 50px"
            :src="row.categoryImage"
            :preview-src-list="[row.categoryImage]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="articleCount" label="文章数" width="100" align="center" sortable="custom" />
      <el-table-column prop="level" label="级别" min-width="120" align="center" sortable="custom">
        <template #default={row}>
          <el-tag v-if="row.level === 1">一级</el-tag>
          <el-tag v-else-if="row.level === 2" type="info">二级</el-tag>
          <el-tag v-else type="error">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pid" label="父级id" width="100" align="center" sortable="custom" />
      <el-table-column prop="createdTime" label="创建时间" width="160" align="center" sortable="custom" />
      <el-table-column prop="updatedTime" label="更新时间" width="160" align="center" sortable="custom" />
      <el-table-column prop="creatorName" label="创建者" width="120" align="center" show-overflow-tooltip  />
      <el-table-column prop="updaterName" label="更新者" width="120" align="center" show-overflow-tooltip  />
      <el-table-column prop="remark" label="备注" width="120" align="center" show-overflow-tooltip />
      <el-table-column prop="enable" label="状态" min-width="150" align="center">
        <template #default={row}>
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300" align="center">
        <template #default={row}>
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="openUpdateDialog(row)">修改</el-button>
          <el-button v-if="row.isEnabled === 0" icon="el-icon-check" size="mini" type="success" @click="toEnable(row.categoryId)">启用</el-button>
          <el-button v-if="row.isEnabled === 1" icon="el-icon-close" size="mini" type="warning" @click="toDisable(row.categoryId)">弃用</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="toDelete(row)">删除</el-button>
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
    <el-dialog title="添加" v-model="addDialog">
      <category-add @closeAddDialog="closeAddDialog" @pageCategory="pageCategory" />
    </el-dialog>
    <!--
      修改弹窗
      :model="model" 用于传递参数对象
    -->
    <el-dialog title="修改" v-model="updateDialog">
      <category-update :category="category" @closeUpdateDialog="closeUpdateDialog" @pageCategory="pageCategory" />
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { infoCategory, pageCategory, deleteCategory } from '@/api/article/category'
import { ElMessageBox, ElMessage } from 'element-plus'

// 导入组件
import CategoryAdd from './category-add.vue'
import CategoryUpdate from './category-update.vue'
export default defineComponent({
  //  定义添加的组件 子组件/私有组件
  components: {
    CategoryAdd,
    CategoryUpdate
  },
  data() {
    return {
      category: {},
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {
          categoryName: ''
        }, // 查询参数对象
        list: [], // 数据
        sortColumn: 'createdTime', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      loading: true, // 控制是否显示加载效果
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      selectCategorys: [], // 被选中的列
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  created() {
    this.pageCategory()
  },
  methods: {
    pageCategory() {
      this.loading = true
      pageCategory(this.page).then(res => {
        this.page = res.data
        this.loading = false
      })
    },
        openAddDialog() {
      this.addDialog = true
    },
    openUpdateDialog(row: any) {
      var id: number = row.categoryId
      if (id === undefined) {
        id = this.selectCategorys[0]
      }
      infoCategory(id).then(res => {
        this.category = res.data
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
      if (row.categoryId == undefined) {
        ids = this.selectCategorys
      } else {
        var id: any = row.categoryId
        ids.push(id)
      }
      console.log('批量删除' + ids)
      ElMessageBox.confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory(ids).then(res => {
          this.pageCategory()
        })
      }).catch(() => {
        ElMessage.info('操作提示: 已取消删除!')
      })
    },
    // 页面功能组件
    // 条件搜索
    search() {
      this.page.currentPage = 1
      this.pageCategory()
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.categoryName = ''
      this.pageCategory()
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.pageCategory()
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.pageCategory()
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
      this.pageCategory()
    },
    // 数据表格的多选择框选择时触发
    handleSelectionChange(selection) {
      this.selectCategorys = selection.map(item => item.categoryId)
      console.log(this.selectCategorys)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
  }
})
</script>


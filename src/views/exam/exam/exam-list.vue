<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="考试名称">
        <el-input
          v-model="page.params.examName"
          placeholder="请输入试卷规则名称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini"
          >查询</el-button
        >
        <el-button type="success" icon="el-icon-refresh-left" size="mini"
          >恢复</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格工具按钮开始 -->
    <el-row :gutter="10" style="margin-bottom: 8px">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" class="xxx"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          >删除</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格工具按钮结束 -->
    <el-table
      v-loading="loading"
      :data="page.list"
      border
      fit
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :row-style="{ cursor: 'pointer' }"
    >
      <el-table-column type="expand"></el-table-column>
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        prop="examId"
        label="考试编号"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="examName"
        label="考试名称"
        min-width="200"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column prop="isPublic" label="是否公开" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.isPublic === 1" type="success">公开</el-tag>
          <el-tag v-else type="info">不公开</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isLimitTime" label="是否限时" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.isLimitTime === 1" type="danger">限时</el-tag>
          <el-tag v-else type="success">不限时</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        min-width="140"
        align="center"
        show-overflow-tooltip
        sortable="custom"
      />
      <el-table-column
        prop="endTime"
        label="结束时间"
        min-width="140"
        align="center"
        sortable="custom"
        show-overflow-tooltip
      />
      <!-- <el-table-column prop="createdTime" label="创建时间" min-width="180" align="center" sortable="custom" />
      <el-table-column prop="updatedTime" label="更新时间" min-width="180" align="center" sortable="custom" />-->
      <!-- <el-table-column prop="creatorName" label="创建者" min-width="120" align="center" />
      <el-table-column prop="updaterName" label="更新者" min-width="120" align="center" />-->
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column prop="isEnable" label="状态" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template #default="{ row }">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-s-platform"
            @click="showPaperListDiglog(row.examId)"
            >进入考试</el-button
          >
          <el-button type="text" size="mini" icon="el-icon-edit"
            >修改</el-button
          >
          <el-button type="text" size="mini" icon="el-icon-delete"
            >删除</el-button
          >
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
      :page-sizes="[5, 10, 20, 50]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
    />

    <el-dialog
      title="提示!请选择试卷开始作答!"
      v-model="paperListDialog"
      width="50%"
      center
    >
      <el-card
        v-for="paperVo in paperVoList"
        :key="paperVo.paperId"
        class="box-card"
      >
        <template #header>
          <div class="card-header">
            <span>{{ paperVo.paperName }}</span>
            <!-- <el-button type="text" size="mini" icon="el-icon-s-platform">
              <router-link :to="'online-exam/' + paperVo.paperId" class="link-type">
                <span>开始作答</span>
              </router-link>
            </el-button> -->
            <el-button class="button" type="text" @click="toOnlineExam(paperVo)"
              >开始作答</el-button
            >
          </div>
        </template>
      </el-card>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getExamByPage } from '@/api/exam/exam';
import { getPaperVoListByExamId } from '@/api/exam/paper';

export default defineComponent({
  data() {
    return {
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
      examId: '',
      paperVo: {},
      // 考试对应试卷列表
      paperVoList: [],
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      loading: true, // 控制是否显示加载效果
      paperListDialog: false
    };
  },
  created() {
    this.getExamByPage();
  },
  methods: {
    getExamByPage() {
      getExamByPage(this.page).then((res) => {
        this.page = res.data;
        this.loading = false;
      });
    },
    showPaperListDiglog(id) {
      this.examId = id;
      this.paperListDialog = true;
      getPaperVoListByExamId(id).then((res) => {
        this.paperVoList = res.data;
      });
    },
    toOnlineExam(paperVo) {
      this.$router.push({
        name: 'Online-exam',
        params: {
          examId: this.examId,
          paperId: paperVo.paperId
        }
      });
    }
  }
});
</script>

<style scoped>
/* 试卷列表 卡片样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>

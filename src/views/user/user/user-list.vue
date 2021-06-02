<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="page.params.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="用户性别">
        <el-select v-model="page.params.sex" placeholder="评论状态" clearable filterable>
          <el-option label="私密" :value="0" />
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="page.params.isEnabled" placeholder="评论状态" clearable filterable>
          <el-option label="启用" :value="1" />
          <el-option label="弃用" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" sizi="mini" @click="getUserByPage">查询</el-button>
        <el-button type="success" icon="el-icon-refresh-left" size="mini" @click="refresh">恢复</el-button>
      </el-form-item>
      <!-- 表格工具按钮开始 -->
      <el-row :gutter="10" style="margin-bottom: 8px;">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="openAddDialog">添加</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="openUpdateDialog"
          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" icon="el-icon-delete" :disabled="single" size="mini">删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" icon="el-icon-refresh-left" size="mini">重置密码</el-button>
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
        @selection-change="handleSelectionChange"
        @sort-change="changeSort"
      >
        <el-table-column type="selection" align="center" width="45" />
        <el-table-column type="expand">
          <template #defalut="{row}">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="真实姓名">
                <span>{{ row.realname }}</span>
              </el-form-item>
              <el-form-item label="签名">
                <span>{{ row.signature }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ row.description }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{ row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" align="center" />
        <el-table-column prop="username" label="用户名(账号)" min-width="150" align="center" show-overflow-tooltip/>
        <el-table-column prop="phone" label="电话" min-width="120" align="center" />
        <el-table-column prop="mail" label="邮箱" min-width="200" align="center" show-overflow-tooltip/>
        <el-table-column prop="sex" label="性别" width="60" align="center">
          <template #default="{row}">
            <el-tag v-if="row.sex === 0" type="info">私密</el-tag>
            <el-tag v-if="row.sex === 1">男</el-tag>
            <el-tag v-if="row.sex === 2" type="danger">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="header" label="头像" align="center" width="60">
          <template #default="{row}">
            <el-image
              style="width: 100%;height: 40px"
              :src="row.header"
              :preview-src-list="[row.header]"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="createdTime" label="创建时间" min-width="180" align="center" sortable="custom" show-overflow-tooltip/>
        <!-- <el-table-column prop="updatedTime" label="更新时间" min-width="220" align="center" sortable="custom"/>s -->
        <el-table-column prop="isEnabled" label="状态" width="100" align="center">
          <template #default="{row}">
            <el-tag v-if="row.isEnabled === 1">启用</el-tag>
            <el-tag v-else type="info">弃用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="300" align="center">
          <template #default="{row}">
            <el-button
              v-if="row.userId!=1"
              type="success"
              icon="el-icon-thumb"
              size="mini"
              @click="handleSelectRole(row)"
            >分配角色</el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            >修改</el-button>
            <el-button
              v-if="row.userId != 1"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="toDelete(row.userId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件-最完整版 -->
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
    <!-- 分配角色的弹出层开始 -->
    <el-dialog
      title="分配角色"
      v-model="selectRoleOpen"
      width="900px"
      center
      append-to-body
    >
      <el-table
        ref="roleListTable"
        border
        :data="roleTableList"
        @selection-change="handleRoleTableSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="角色ID" align="center" prop="roleId" />
        <el-table-column label="角色名称" align="center" prop="roleName" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="创建时间" align="center" prop="createdTime" />
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleSaveUserRoleSubmit">确 定</el-button>
          <el-button @click="cancelUserRole">取 消</el-button>
        </span>
      </template>

    </el-dialog>
    <!-- 分配角色的弹出层结束 -->

  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getUserByPage } from "@/api/user/user";
import { getRoleList, getRoleIdsByUserId } from "@/api/user/role";

import UserAdd from "./user-add.vue";
import UserUpdate from "./user-update.vue";

export default defineComponent({
  components: {
    UserAdd,
    UserUpdate,
  },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
        params: {
          username: "",
        },
        list: [],
        sortColumn: "created_time",
        sortMethod: "asc",
      },
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      selectUsers: [], // 被选中的列
      loading: true, // 控制是否显示加载效果
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false, // 控制修改弹窗显示
      // 是否显示分配权限的弹出层
      selectRoleOpen: false,
      // roleIds 分配角色列表选择状态
      roleIds: [],
      // 角色数据
      roleTableList: [],
      // 当前选中的用户
      currentUserId: undefined
    };
  },
  created() {
    this.getUserByPage();
  },
  methods: {
    getUserByPage() {
      getUserByPage(this.page).then((res) => {
        this.page = res.data;
        this.loading = false;
      });
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
      this.page.params.username = "";
      this.getUserByPage();
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val;
      // 重新请求,刷新页面
      this.getUserByPage();
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getUserByPage();
    },
    // 条件排序 e 和 val 都行
    changeSort(e) {
      if (e.order) {
        this.page.sortColumn = e.prop;
        this.page.sortMethod = e.order;
      } else {
        this.page.sortColumn = "";
        this.page.sortMethod = "asc";
      }
      this.getUserByPage();
    },
    // 数据表格的多选择框选择时触发
    handleSelectionChange(selection) {
      this.selectUsers = selection.map((item) => item.userId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    openAddDialog() {
      // 打开添加弹窗
      this.addDialog = true;
    },
    // 修改
    openUpdateDialog(row) {
      var id = row.userId;
      if (id === undefined) {
        id = this.selectUsers[0];
      }
      getUserById(id).then((res) => {
        this.user = res.data;
        this.updateDialog = true;
      });
    },
    closeAddDialog() {
      // 关闭添加弹窗
      this.addDialog = false;
    },
    closeUpdateDialog() {
      // 关闭修改弹窗
      this.updateDialog = false;
    },
    // 打开分配角色的弹出层
    handleSelectRole(row) {
      this.selectRoleOpen = true
      this.currentUserId = row.userId || this.ids[0]
      const _this = this
      getRoleList().then(res => {
        _this.roleTableList = res.data
        this.$nextTick(() => {
          // 根据当前用户查找之前拥有的角色IDS
          getRoleIdsByUserId(_this.currentUserId).then(res2 => {
            res2.data.filter(r1 => {
              _this.roleTableList.filter(r2 => {
                if (r1 === r2.roleId) {
                  // 选中表格checkbox
                  _this.$refs.roleListTable.toggleRowSelection(r2, true)
                }
              })
            })
          })
        })
      })
    },
    cancelUserRole() {
      this.selectRoleOpen = false
    },
    // 数据表格的多选择框选择时触发
    handleRoleTableSelectionChange(selection) {
      this.roleIds = selection.map(item => item.roleId)
    },
    // 保存用户和角色之间的关系
    handleSaveUserRoleSubmit() {
    },
  },
});
</script>


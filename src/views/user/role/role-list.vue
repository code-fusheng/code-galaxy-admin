<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="role" class="demo-form-inline" size="mini">
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
      :data="roleList"
      border
      fit
      style="width: 100%"
    >
      <!-- 展开列 -->
      <el-table-column type="expand"></el-table-column>
      <el-table-column type="index" label="#" align="center" />
      <el-table-column prop="roleName" min-width="100" label="角色名称" align="center" />
      <el-table-column prop="createdTime" label="创建时间" min-width="220" align="center" sortable="custom" />
      <el-table-column prop="updatedTime" label="更新时间" min-width="220" align="center" sortable="custom" />
      <el-table-column prop="enable" label="状态" width="150" align="center">
        <template #default={row}>
          <el-tag v-if="row.isEnabled === 1">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" min-width="100" label="备注" align="center" />
      <el-table-column label="操作" min-width="400" align="center">
        <template #default={row}>
          <el-button size="mini" type="text" icon="el-icon-setting" @click="handleSelectMenu(row)">分配权限</el-button>
          <el-button size="mini" type="text" icon="el-icon-edit">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分配权限和菜单弹出层开始 -->
    <el-dialog
      title="分配权限和菜单"
      v-model="selectMenuOpen"
      width="400px"
      center
      append-to-body
    >
      <el-tree
        ref="menu"
        :data="menuOptions"
        show-checkbox
        node-key="menuId"
        highlight-current
        empty-text="加载中，请稍后"
        :props="{id:'menuId',children:'children',label:'name'}"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" size="mini" @click="handleSelectMenuSubmit">确 定</el-button>
        <el-button size="mini" @click="cancelSelectMenu">取 消</el-button>
      </span>
      </template>
    </el-dialog>
    <!-- 分配权限和菜单弹出层结束 -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { listRole } from '@/api/user/role'
import { getMenuList, getMenuIdsByRoleId } from '@/api/user/menu'

export default defineComponent({
  data() {
    return {
      role: {},
      roleList: [],
      // 菜单树的数据
      menuOptions: [],
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 是否打开分配权限的弹出层
      selectMenuOpen: false,
      selectRules: [], // 被选中的列
      loading: true, // 控制是否显示加载效果
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  created() {
    this.listRole()
  },
  methods: {
    listRole() {
      listRole().then((res) => {
        this.roleList = res.data
        this.loading = false
      })
    },
    // 分配权限
    // 打开分配权限和菜单的弹出层
    handleSelectMenu(row) {
      this.currentRoleId = row.roleId || this.ids[0]
      this.title = '分配权限和菜单'
      this.selectMenuOpen = true
      // 查询所有可用的菜单
      getMenuList().then(res => {
        this.menuOptions = this.$handleTree(res.data, 'menuId')
        console.log(this.menuOptions)
      })
      // 根据角色ID查询当前角色拥有的哪些菜单权限
      getMenuIdsByRoleId(this.currentRoleId).then(res => {
        this.$refs.menu.setCheckedKeys(res.data)
      })
    },
    // 保存角色和菜单权限的关系
    handleSelectMenuSubmit() {},
    // 关闭分配权限和菜单的弹出层
    cancelSelectMenu() {
      this.selectMenuOpen = false
      this.menuOptions = []
    },
  }
})
</script>


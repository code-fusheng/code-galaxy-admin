<template>
  <div>
    <!--添加题库  -->
    <el-form ref="form" :model="repository" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="题库名称" prop="repositoryName">
            <el-input v-model="repository.repositoryName" placeholder="请输入题库名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="题库备注">
            <el-input v-model="repository.remark" placeholder="请输入题库备注" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="题库状态" prop="isEnabled">
            <el-radio-group v-model="repository.isEnabled">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">弃用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <!-- 分割线 -->
        <el-divider />
        <el-col :span="24">
          <el-button type="primary" v-loading="eventLoading"  @click="onSubmit" style="float: right; margin-left: 20px" size="mini">提交</el-button>
          <el-button @click="close" type="info"  style="float: right" size="mini">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { saveRepository } from "@/api/exam/repository";
export default defineComponent({
  data() {
    return {
      repository: {
        repositoryName: '',
        remark: '',
        isEnabled: ''
      },
      // 表单校验
      rules: {
        repositoryName: [
          { required: true, message: '题库名称不能为空', tirgger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择题库状态', trigger: 'change' }
        ]
      },
      eventLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.eventLoading = true
      saveRepository(this.repository).then((res) => {
        this.eventLoading = false
        this.$emit('closeAddDialog')
        this.$emit('getRepositoryByPage')
        console.log(res)
      })
    },
    close() {
      this.$emit('closeAddDialog')
    }
  }
})
</script>

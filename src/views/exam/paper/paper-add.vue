<template>
  <div>
    <!--添加试卷  -->
    <el-form ref="form" :model="paper" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="试卷名称" prop="paperName">
            <el-input v-model="paper.paperName" placeholder="请输入试卷名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试卷规则">
            <el-select v-model="paper.ruleId" placeholder="请选择试卷规则" clearable filterable>
              <el-option
                v-for="rule in ruleList"
                :key="rule.ruleId"
                :label="rule.ruleName"
                :value="rule.ruleId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试卷状态" prop="isEnabled">
            <el-radio-group v-model="paper.isEnabled">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">弃用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-divider />
        <el-col :span="24">
          <el-button type="primary" @click="onSubmit" style="float: right; margin-left: 20px" size="mini">提交</el-button>
          <el-button @click="close" type="info"  style="float: right" size="mini">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { savePaper } from '@/api/exam/paper'
import store from '@/store/index'

export default defineComponent({
  data() {
    return {
      ruleList: [],
      paper: {},
      // 表单校验
      rules: {
        paperName: [
          { required: true, message: '试卷名称不能为空', tirgger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择试卷状态', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.ruleList = store.getters.ruleList
  },
  methods: {
    onSubmit() {
      savePaper(this.paper).then(res => {
        this.$emit('closeAddDialog')
        this.$emit('getPaperByPage')
      })
    },
    close() {
      this.$emit('closeAddDialog')
    }
  }
})
</script>

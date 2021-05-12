<template>
  <div>
    <!--添加自定义试题  -->
    <el-form ref="form" v-loading="loading" :model="question" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-card>
        <template #header class="clearfix">
          <span>自定义试题内容</span>
          <el-button style="float: right; padding: 3px 10px" class="filter-item" type="text" icon="el-icon-refresh" @click="saveQuestion">
            保存试题
          </el-button>
        </template>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="试题类型" prop="questionType">
              <el-select v-model="question.questionType" placeholder="请选择试题类型" clearable filterable>
                <el-option
                  v-for="item in questionTypeList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="试题标签" prop="questionTag">
              <el-select v-model="question.questionTag" placeholder="请选择试题标签" clearable filterable>
                <el-option
                  v-for="item in questionTagList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="题库归属" prop="repositoryId">
              <el-select v-model="question.repositoryId" placeholder="请选择所属题库" clearable filterable>
                <el-option
                  v-for="repository in $store.getters.repositoryList"
                  :key="repository.repositoryId"
                  :label="repository.repositoryName"
                  :value="repository.repositoryId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="试题备注">
              <el-input v-model="question.remark" placeholder="请输入试题备注" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="试题内容" prop="questionContent">
              <el-input v-model="question.questionContent" type="textarea" :rows="4" placeholder="请输入试题内容" />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="内容扩展">
              <el-button size="mini">添加图片</el-button>
              <el-button size="mini">添加视频</el-button>
              <el-button size="mini">添加代码</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="试题状态" prop="isEnabled">
              <el-radio-group v-model="question.isEnabled">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">弃用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-show="paperid !== null" label="试题排序">
              <el-input-number v-model="question.questionSort" :min="0" :max="9999" placeholder="请输入试题排序" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-show="paperid !== null" label="试题分值">
              <el-input v-model="question.questionScore" placeholder="请输入试题分值" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="试题分析">
              <el-input v-model="question.anaylsis" type="textarea" :rows="2" placeholder="请输入试题分析" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <template #header class="clearfix">
          <span>选项列表</span>
          <el-button style="float: right; padding: 3px 10px" class="filter-item" type="text" icon="el-icon-plus" @click="handleAdd">
            添加选项
          </el-button>
        </template>
        <el-table
          :data="question.optionList"
          :border="true"
          style="width: 100%"
        >
          <el-table-column label="是否答案" width="120" align="center">
            <template #default={row}>
              <el-checkbox v-model="row.isRight" :true-label="1" :false-label="0" :checked="row.isRight === 1 ? true : false">答案</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="选项内容">
            <template #default={row}>
              <el-input v-model="row.optionContent" type="textarea" :rows="2" />
            </template>
          </el-table-column>
          <el-table-column label="选项解析">
            <template #default={row}>
              <el-input v-model="row.analysis" type="textarea" :rows="2" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template #default={row}>
              <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeItem(row.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="saveQuestion">提交</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { saveQuestion } from '@/api/exam/question'

export default defineComponent({
  props: {
    paperid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      question: {
        paperId: '',
        questionType: '',
        questionTag: '',
        optionList: []
      },
      questionTypeList: [
        { dictLabel: '其它', dictValue: 0 },
        { dictLabel: '单选题', dictValue: 1 },
        { dictLabel: '多选题', dictValue: 2 },
        { dictLabel: '填空题', dictValue: 3 },
        { dictLabel: '判断题', dictValue: 4 },
        { dictLabel: '简答题', dictValue: 5 }
      ],
      questionTagList: [
        { dictLabel: '其它', dictValue: 0 },
        { dictLabel: '基础题', dictValue: 1 },
        { dictLabel: '提升题', dictValue: 2 },
        { dictLabel: '开放题', dictValue: 3 },
        { dictLabel: '主观题', dictValue: 4 },
        { dictLabel: '客观题', dictValue: 5 }
      ],
      // 题库列表
      repositoryList: this.$store.getters.repositoryList,
      // 表单校验
      rules: {
        questionType: [
          { type: 'date', required: true, message: '试题类型不能为空', tirgger: 'change' }
        ],
        questionTag: [
          { type: 'date', required: true, message: '试题标签不能为空', tirgger: 'change' }
        ],
        repositoryId: [
          { required: true, message: '题库归属不能为空', tirgger: 'change' }
        ],
        questionContent: [
          { required: true, message: '试题内容不能为空', tirgger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择试题状态', trigger: 'change' }
        ]
      },
      loading: false
    }
  },
  methods: {
    close() {
      this.$emit('closeCustomAddDrawer')
      this.question.optionList = []
    },
    handleAdd() {
      this.question.optionList.push({isRight: 0, optionContent: '', analysis: '' })
    },
    removeItem(index) {
      console.log(index)
      this.question.optionList.splice(index, 1)
    },
    // 添加试题
    saveQuestion() {
      this.loading = true
      console.log(this.paperid)
      // 添加常规试题
      if (this.paperid === null || this.paperid === '') {
        saveQuestion(this.question).then(res => {
          this.loading = false
          this.$message.success(res.msg)
          this.$emit('closeCustomAddDrawer')
          this.$emit('getQuestionByPage')
          this.question.optionList = []
        })
      }
    }
  }
})
</script>

<style scoped>

</style>

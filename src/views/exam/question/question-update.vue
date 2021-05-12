<template>
  <div>
    <el-form ref="form" v-loading="loading" :model="questionVo" label-position="left" label-width="80px">
      <el-card class="box-card">
        <template #header class="clearfix">
          <span>试题信息</span>
          <el-button style="float: right; padding: 3px 0; margin-left: 20px" icon="el-icon-refresh" type="text">更新试题</el-button>
          <el-button @click="close" type="text" style="float: right; padding: 3px 0" icon="el-icon-back">返回列表</el-button>
        </template>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="试题类型" prop="questionTypeId">
              <el-select v-model="questionVo.questionType" placeholder="请选择试题类型" clearable filterable>
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
            <el-form-item label="试题标签" prop="questionTagId">
              <el-select v-model="questionVo.questionTag" placeholder="请选择试题标签" clearable filterable>
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
              <el-select disabled v-model="questionVo.repositoryId" placeholder="请选择所属题库" clearable filterable>
                <el-option
                  v-for="repository in repositoryList"
                  :key="repository.repositoryId"
                  :label="repository.repositoryName"
                  :value="repository.repositoryId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="试题备注">
              <el-input v-model="questionVo.remark" placeholder="请输入题库备注" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="试题内容" prop="questionContent">
              <el-input v-model="questionVo.questionContent" type="textarea" placeholder="请输入题库内容" />
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
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header class="clearfix">
          <span>选项信息</span>
          <el-button style="float: right; padding: 3px 0; margin-left: 20px" icon="el-icon-refresh" type="text">
            更新选项
          </el-button>
          <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-plus" @click="handleAdd">
            添加选项
          </el-button>
        </template>
        <el-table
          :data="questionVo.optionList"
          :border="true"
          style="width: 100%"
        >
          <el-table-column label="是否答案" width="120" align="center">
            <template #default={row}>
              <el-checkbox v-model="row.isRight" true-label="1" false-label="0" :checked="row.isRight === 1 ? true : false">选项</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="选项内容">
            <template #default={row}>
              <el-input v-model="row.optionContent" type="textarea" :rows="1" />
            </template>
          </el-table-column>
          <el-table-column label="选项解析">
            <template #default={row}>
              <el-input v-model="row.analysis" type="textarea" :rows="1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <el-button type="danger" icon="el-icon-delete" size="mini" circle />
          </el-table-column>
        </el-table>
      </el-card>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="saveQuestionVo">提交</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updateQuestionWithOptionsAndAnswers } from "@/api/exam/question";
import store from '@/store/index'

export default defineComponent({
  // 父组件将数据传递给子组件
  props: {
    question: {
      type: Object,
      default: null
    },
    paperid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      // 题库列表
      questionVo: this.question,
      // 题库列表
      repositoryList: store.getters.repositoryList,
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
      // 表单校验
      rules: {
        questionTypeId: [
          { type: 'date', required: true, message: '试题类型不能为空', tirgger: 'blur' }
        ],
        questionTagId: [
          { type: 'date', required: true, message: '试题标签不能为空', tirgger: 'blur' }
        ],
        repositoryId: [
          { required: true, message: '题库归属不能为空', tirgger: 'blur' }
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
  watch: {
    'question': function() {
      this.questionVo = this.question
    }
  },
  methods: {
    saveQuestionVo() {
      this.loading = true
      console.log(this.paperid)
      if (this.paperid === null || this.paperid === '') {
        updateQuestionWithOptionsAndAnswers(this.questionVo).then(res => {
          console.log('修改了试题!')
          this.$emit('closeUpdateDrawer')
          this.$emit('getQuestionByPage')
        })
      }
      // else {
      //   this.questionVo.paperId = this.paperid
      //   console.log('修改了试卷中的试题!')
      //   updateQuestionVoForPaper(this.questionVo).then(res => {
      //     this.$emit('closeUpdateDrawer')
      //     this.$emit('getQuestionVoListByPaperId')
      //     this.questionVo.optionList = []
      //   })
      // }
    },
    handleAdd() {
      this.questionVo.optionList.push({ isRight: 0, optionContent: '', analysis: '' })
    },
    removeItem(index) {
      this.questionVo.optionList.splice(index, 1)
    },
    close() {
      this.$emit('closeUpdateDrawer')
    }
  }
})
</script>

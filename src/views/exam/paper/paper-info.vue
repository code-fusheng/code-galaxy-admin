<template>
  <div>
    <el-form ref="paperVo" v-loading="loading" :model="paperVo" label-position="left" label-width="80px">
      <!-- 试卷信息 -->
      <el-card class="box-card">
        <template #header class="clearfix">
          <span>试卷信息</span>
          <el-button style="float: right; padding: 3px 0" icon="el-icon-refresh" type="text">更新试卷</el-button>
        </template>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="试卷标题">
              <el-input v-model="paperVo.paperName" placeholder="请输入试卷标题" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试卷编号">
              <el-input v-model="paperVo.paperId" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出卷人">
              <el-input v-model="paperVo.creatorName" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 规则信息 -->
      <el-card class="box-card">
        <template #header class="clearfix">
          <span>规则信息</span>
          <el-button style="float: right; padding: 3px 0" icon="el-icon-refresh" type="text">更新规则</el-button>
        </template>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="试卷规则" prop="paperRuleId">
              <el-select v-model="ruleVo.ruleId" placeholder="请选择试卷规则" clearable filterable>
                <el-option
                  v-for="paperRule in ruleList"
                  :key="paperRule.ruleId"
                  :label="paperRule.ruleName"
                  :value="paperRule.ruleId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规则题库" prop="repositoryId">
              <el-select placeholder="请选择所属题库" clearable filterable>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="试卷总分">
              <el-input v-model="ruleVo.totalScore" placeholder="请输入试卷总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="试卷时长">
              <el-input v-model="ruleVo.totalTime" placeholder="请输入试卷时长" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合格分数">
              <el-input v-model="ruleVo.eligibilityScore" placeholder="请输入试卷总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规则状态" prop="isEnabled">
              <el-radio-group v-model="ruleVo.isEnabled">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">弃用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单选题数">
              <el-input-number v-model="ruleVo.singleCount" :min="0" :max="9999" placeholder="请输入单选题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单选总分">
              <el-input v-model="ruleVo.singleScore" placeholder="请输入试卷时长" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="多选题数">
              <el-input-number v-model="ruleVo.multipleCount" :min="0" :max="9999" placeholder="请输入多选题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="多选总分">
              <el-input v-model="ruleVo.multipleScore" placeholder="请输入多选总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="填空题数">
              <el-input-number v-model="ruleVo.fillCount" :min="0" :max="9999" placeholder="请输入填空题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="填空总分">
              <el-input v-model="ruleVo.fillScore" placeholder="请输入填空总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="判断题数">
              <el-input-number v-model="ruleVo.judgeCount" :min="0" :max="9999" placeholder="请输入判断题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="判断总分">
              <el-input v-model="ruleVo.judgeScore" placeholder="请输入判断总分" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="简答题数">
              <el-input-number v-model="ruleVo.shortCount" :min="0" :max="9999" placeholder="请输入简答题数" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="简答总分">
              <el-input v-model="ruleVo.shortScore" placeholder="请输入简答总分" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规则备注">
              <el-input v-model="ruleVo.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 试题信息 -->
      <el-card class="box-card" v-loading="questionLoading">
        <template #header class="clearfix">
          <span>试题信息</span>
          <el-button style="float: right; padding: 3px 10px" icon="el-icon-refresh" type="text">更新试题</el-button>
          <el-button style="float: right; padding: 3px 10px" icon="el-icon-video-play" type="text">生成试题</el-button>
          <el-button style="float: right; padding: 3px 10px" icon="el-icon-edit" type="text">自定义试题</el-button>
          <el-button style="float: right; padding: 3px 10px" icon="el-icon-view" type="text">显示/隐藏答案</el-button>
        </template>
          <el-card
            v-for="(questionVo, questionIndex) in page.list"
            :key="questionVo.questionId"
          >
            <el-row :gutter="20">
              <div style="clear: both; float: none; width: 100%">
                <el-col :span="1.5">
                  <el-tag v-if="questionVo.questionType === 0" style="padding: 0 10px" size="mini">其它</el-tag>
                  <el-tag v-else-if="questionVo.questionType === 1" style="padding: 0 10px" size="mini">单选题</el-tag>
                  <el-tag v-else-if="questionVo.questionType === 2" style="padding: 0 10px" size="mini" type="danger">多选题</el-tag>
                  <el-tag v-else-if="questionVo.questionType === 3" style="padding: 0 10px" size="mini" type="warning">填空题</el-tag>
                  <el-tag v-else-if="questionVo.questionType === 4" style="padding: 0 10px" size="mini" type="success">判断题</el-tag>
                  <el-tag v-else-if="questionVo.questionType === 5" style="padding: 0 10px" size="mini" type="info">简答题</el-tag>
                </el-col>
                <el-col :span="1.5">
                  <el-tag type="danger" effect="plain" size="mini">
                  <span>{{ questionVo.questionScore }} 分</span>
                  </el-tag>
                </el-col>
                <div style="float: right; margin-right: 20px">
                  <el-button style="float: right; margin-right: 20px" type="danger" icon="el-icon-delete" size="mini" circle/>
                  <el-button style="float: right; margin-right: 20px" type="primary" icon="el-icon-edit" size="mini" circle/>
                </div>
              </div>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <span style="color: #909399">第{{ questionIndex + 1 }}题 </span><span> {{ questionVo.questionContent }}</span>
              </el-col>
            </el-row>
            <!-- 单选、多选、判断 -->
            <el-row v-for="(optionVo) in questionVo.optionList" :key="optionVo.optionId" :gutter="20">
              <el-col :span="0.5">
                <el-checkbox v-model="optionVo.isRight" :true-label="1" :false-label="0" :checked="optionVo.isRight === 1 ? true : false" />
              </el-col>
              <el-col :span="23.5">
                <span :class="optionVo.isRight === 1 ? 'right-answer-content' : 'default-answer-content' ">{{ optionVo.optionContent }}</span>
              </el-col>
            </el-row>
          </el-card>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="11">
              <el-button class="filter-item" type="text" icon="el-icon-bottom">
                加载更多
              </el-button>
              <el-button class="filter-item" type="text" icon="el-icon-plus">
                添加自定义试题
              </el-button>
              <el-button class="filter-item" type="text" icon="el-icon-plus">
                添加题库试题
              </el-button>
              <el-button class="filter-item" type="text" icon="el-icon-back">
                返回
              </el-button>
            </el-col>
          </el-row>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getPaperBaseInfoById } from '@/api/exam/paper'
import { getRuleById } from "@/api/exam/rule"
import { getQuestionAndOptionsWithAnswersByPageForPaperId } from '@/api/exam/question'


export default defineComponent({
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 50,
        totalPage: 0,
        totalCount: 0,
        params: {
          paperId: ''
        },
        list: [],
        sortColumn: 'question_sort',
        sortMethod: 'asc'
      },
      paperId: {},
      paperVo: {
        paperId: '',
        ruleId: '',
        ruleVo: {

        }
      },
      ruleVo: {},
      questionVoList: [
        {
          questionId: '',
          questionContent: '',
          optionList: []
        }
      ],
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
      loading: true, // 控制是否显示加载效果
      questionLoading: true
    }
  },
  created() {
    this.paperId = this.$route.params.paperId
    this.getPaperBaseInfoById()
  },
  methods: {
    getPaperBaseInfoById() {
      getPaperBaseInfoById(this.paperId).then((res) => {
        this.paperVo = res.data
        this.loading = false
        if (this.paperVo.ruleId !== undefined || this.paperVo.ruleId !== null) {
          this.getRuleById()
          this.getQuestionAndOptionsWithAnswersByPageForPaperId()
        }
      })
    },
    getRuleById() {
      getRuleById(this.paperVo.ruleId).then((res) => {
        this.ruleVo = res.data
        console.log(this.ruleVo)
      })
    },
    getQuestionAndOptionsWithAnswersByPageForPaperId() {
      this.page.params.paperId = this.paperVo.paperId
      getQuestionAndOptionsWithAnswersByPageForPaperId(this.page).then((res) => {
        this.page = res.data
        this.questionLoading = false
      })
    }
  }
})
</script>

<style scoped>
  .el-card {
    margin-top: 10px !important ;
    margin-bottom: 10px !important;
  }

  .el-row {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
    line-height: 28px;
  }

  .el-col {
    border-radius: 4px;
  }

  .el-form-item {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .right-answer-content {
    color: #67C23A;
  }

  .default-answer-content {
    color: #606266;
  }

  .error-answer-content {
    color: red;
  }
</style>

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
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getPaperBaseInfoById } from '../../../api/exam/paper'
import { getRuleById } from "../../../api/exam/rule"

export default defineComponent({
  data() {
    return {
      paperId: {},
      paperVo: {
        paperId: '',
        ruleId: '',
        ruleVo: {

        }
      },
      ruleVo: {},
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
        }
      })
    },
    getRuleById() {
      getRuleById(this.paperVo.ruleId).then((res) => {
        this.ruleVo = res.data
        console.log(this.ruleVo)
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
    line-height: 40px;
  }
  .el-col {
    border-radius: 4px;
  }

  .el-form-item {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
  }
</style>

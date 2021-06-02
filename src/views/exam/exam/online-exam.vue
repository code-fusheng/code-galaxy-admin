<template>
  <div>
    <div class="progress-affix">
      <el-progress type="circle" :percentage="80">
        <template #default="{ percentage }">
          <span class="percentage-label">完成进度</span>
          <br />
          <span class="percentage-value">{{ percentage }}%</span>
        </template>
      </el-progress>
    </div>
    <el-form
      ref="paperVo"
      v-loading="loading"
      :model="paperVo"
      label-position="left"
      label-width="80px"
    >
      <!-- 试卷信息 -->
      <el-card class="box-card">
        <template #header class="clearfix">
          <span>试卷信息</span>
        </template>
        <el-row :gutter="20">
          <el-col :span="10">
            <span>试卷标题：</span>
            {{ paperVo.paperName }}
          </el-col>
          <el-col :span="10">
            <span>出卷人：</span>
            {{ paperVo.creatorName }}
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <span>考试编号：</span>
            {{ examId }}
          </el-col>
          <el-col :span="10">
            <span>试卷编号：</span>
            {{ paperId }}
          </el-col>
        </el-row>
      </el-card>
      <!-- 用户信息 -->
      <el-card class="box-card">
        <template #header class="clearfix">
          <span>用户信息</span>
        </template>
        <el-row :gutter="20">
          <el-col :span="10">
            <span>用户名</span>
            {{ user.username }}
          </el-col>
        </el-row>
      </el-card>
      <!-- 试题卡片信息 -->
      <el-card>
        <template #header class="clearfix">
          <span>试题信息</span>
          <el-button
            style="float: right; padding: 3px 10px"
            icon="el-icon-s-promotion"
            type="text"
          >交卷</el-button>
        </template>
        <el-card v-for="(questionVo, questionIndex) in questionVoList" :key="questionIndex">
          <el-row :gutter="20">
            <el-col :span="1.5">
              <el-tag v-if="questionVo.questionType === 0" style="padding: 0 10px" size="mini">其它</el-tag>
              <el-tag
                v-else-if="questionVo.questionType === 1"
                style="padding: 0 10px"
                size="mini"
              >单选题</el-tag>
              <el-tag
                v-else-if="questionVo.questionType === 2"
                style="padding: 0 10px"
                size="mini"
                type="danger"
              >多选题</el-tag>
              <el-tag
                v-else-if="questionVo.questionType === 3"
                style="padding: 0 10px"
                size="mini"
                type="warning"
              >填空题</el-tag>
              <el-tag
                v-else-if="questionVo.questionType === 4"
                style="padding: 0 10px"
                size="mini"
                type="success"
              >判断题</el-tag>
              <el-tag
                v-else-if="questionVo.questionType === 5"
                style="padding: 0 10px"
                size="mini"
                type="info"
              >简答题</el-tag>
            </el-col>
            <el-col :span="1.5">
              <el-tag type="danger" effect="plain" size="mini">{{ questionVo.questionScore }} 分</el-tag>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <span style="color: #909399">第{{ questionIndex + 1 }}题</span>
              <span>{{ questionVo.questionContent }}</span>
            </el-col>
          </el-row>
          <!-- 单选、多选、判断 -->
            <el-row v-for="(optionVo) in questionVo.optionList" :key="optionVo.optionId" :gutter="20">
              <el-col :span="0.5">
                <el-checkbox v-model="optionVo.isSelect" :true-label="1" :false-label="0" :checked="optionVo.isSelect === 1 ? true : false" />
              </el-col>
              <el-col :span="23.5">
                <span :class="optionVo.isSelect === 1 ? 'right-answer-content' : 'default-answer-content' ">{{ optionVo.optionContent }}</span>
              </el-col>
            </el-row>
          <!-- <el-row :gutter="20">
            <el-col :span="24"> -->
              <!-- {{ questionVo.optionList }} -->
                <!-- <el-checkbox-group v-model="questionVo.optionList" @change="handleSelectOption">
                  {{ questionVo.optionList }}
                  <el-checkbox v-for="(optionVo, optionIndex) in questionVo.optionVoList" :key="optionIndex" :label="optionVo.optionId">{{ optionVo.optionContent }}</el-checkbox>
                </el-checkbox-group> -->
            <!-- </el-col>
          </el-row> -->
        </el-card>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col style="text-align: center; margin-top: 10px">
            <el-button v-if="noMore" class="filter-item" type="text" icon="el-icon-error">到底了</el-button>
            <el-button
              v-else
              class="filter-item"
              type="text"
              icon="el-icon-bottom"
              :loading="loadingMore"
              @click="loadMore()"
            >加载更多</el-button>
            <el-button icon="el-icon-s-promotion" type="text">交卷</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getPaperBaseInfoById } from "@/api/exam/paper";
import { getQuestionAndOptionsNotWithAnswersByPageForExam } from "@/api/exam/question";
import { getRuleById } from "@/api/exam/rule";
import store from "@/store/index";

export default defineComponent({
  data() {
    return {
      checkList: ['选中且禁用','复选框 A'],
      user: {},
      page: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
        params: {
          paperId: {},
        },
        list: [],
        sortColumn: "question_sort",
        sortMethod: "asc",
      },
      examId: {},
      paperId: {},
      paperVo: {
        paperName: "",
        paperId: "",
        ruleId: "",
        ruleVo: {},
      },
      ruleList: [],
      ruleVo: {},
      questionVoList: [
         {
          questionVo: {
            paperId: this.$route.params.paperId,
            examId: this.$route.params.examId,
            userId: 1,
            questionId: '',
            questiontype: '',
            questionScore: '',
            optionList: []
          }
        }
      ],
      // 作答信息集合
      questionReplyList: [
        {
          questionReply: {
            questionId: '',
            paperId: this.$route.params.paperId,
            examId: this.$route.params.examId,
            userId: store.getters.userId,
            questionTypeId: '',
            userAnswer: [],
            questionScore: '',
            actualScore: '',
            isRight: '',
            useTime: ''
          }
        }
      ],
      questionTypeList: [
        { dictLabel: "其它", dictValue: 0 },
        { dictLabel: "单选题", dictValue: 1 },
        { dictLabel: "多选题", dictValue: 2 },
        { dictLabel: "填空题", dictValue: 3 },
        { dictLabel: "判断题", dictValue: 4 },
        { dictLabel: "简答题", dictValue: 5 },
      ],
      questionTagList: [
        { dictLabel: "其它", dictValue: 0 },
        { dictLabel: "基础题", dictValue: 1 },
        { dictLabel: "提升题", dictValue: 2 },
        { dictLabel: "开放题", dictValue: 3 },
        { dictLabel: "主观题", dictValue: 4 },
        { dictLabel: "客观题", dictValue: 5 },
      ],
      loadingMore: false,
      noMore: false,
      loading: true, // 控制是否显示加载效果
      questionLoading: true,
    };
  },
  created() {
    this.examId = this.$route.params.examId;
    this.paperId = this.$route.params.paperId;
    this.user = store.getters.user;
    this.getPaperBaseInfoById();
    this.getQuestionAndOptionsNotWithAnswersByPageForExam();
  },
  methods: {
    getPaperBaseInfoById() {
      getPaperBaseInfoById(this.paperId).then((res) => {
        this.paperVo = res.data;
        this.loading = false;
      });
    },
    getQuestionAndOptionsNotWithAnswersByPageForExam() {
      this.page.params.paperId = this.paperId;
      getQuestionAndOptionsNotWithAnswersByPageForExam(this.page).then(
        (res) => {
          this.page = res.data;
          this.questionVoList = this.page.list;
          this.questionLoading = false;
        }
      );
    },
    // 加载更多
    loadMore() {
      this.page.currentPage += 1;
      this.loadingMore = true;
      getQuestionAndOptionsNotWithAnswersByPageForExam(this.page).then(
        (res) => {
          if (res.data.list.length < this.page.pageSize) {
            (this as any).$message.warning("当前是最后一页了");
            this.noMore = true;
          }
          const dataList = res.data.list;
          this.loadingMore = false;
          dataList.forEach((item) => {
            this.questionVoList.push(item);
          });
          this.loadingMore = false;
        }
      );
    },
    // 选中答案
    handleSelectOption(e) {
      console.log(e);
    },
  },
});
</script>

<style scoped>
.progress-affix {
  position: fixed;
  top: 60px;
  right: 25px;
}

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
  color: #67c23a;
}

.default-answer-content {
  color: #606266;
}

.error-answer-content {
  color: red;
}
</style>


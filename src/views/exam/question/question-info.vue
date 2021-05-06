<template>
  <div>
        <el-form ref="form" v-loading="loading" :model="questionInfo" label-position="left" label-width="80px">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="试题类型" prop="questionTypeId">
              <el-select v-model="questionInfo.questionTypeId" placeholder="请选择试题类型" clearable filterable>
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
              <el-select v-model="questionInfo.questionTagId" placeholder="请选择试题标签" clearable filterable>
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
              <el-select v-model="questionInfo.repositoryId" placeholder="请选择所属题库" clearable filterable>
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
              <el-input v-model="questionInfo.remark" placeholder="请输入题库备注" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="试题内容" prop="questionContent">
              <el-input v-model="questionInfo.questionContent" type="textarea" placeholder="请输入题库内容" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容扩展">
              <el-button>添加试题图片</el-button>
              <el-button>添加试题视频</el-button>
              <el-button>添加试题代码</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="试题状态" prop="isEnabled">
              <el-radio-group v-model="questionInfo.isEnabled">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">弃用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button class="filter-item" type="primary" icon="el-icon-refresh" size="small" plain @click="toUpdate">
              更新试题
            </el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-plus" size="small" plain @click="handleAdd">
              添加答案项
            </el-button>
          </el-col>
        </el-row>
        <el-table
          :data="questionInfo.optionList"
          :border="true"
          style="width: 100%"
        >
          <el-table-column label="是否答案" width="120" align="center">
            <template #default={row}>
              <el-checkbox v-model="row.isRight" true-label="1" false-label="0" :checked="row.isRight === 1 ? true : false">答案</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="答案内容">
            <template #default={row}>
              <el-input v-model="row.optionContent" type="textarea" :rows="1" />
            </template>
          </el-table-column>
          <el-table-column label="答案解析">
            <template #default={row}>
              <el-input v-model="row.analysis" type="textarea" :rows="1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <el-button type="danger" icon="el-icon-delete" size="mini" circle />
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button type="primary" @click="onSubmit(questionInfo)">保存</el-button>
          <el-button type="info" @click="goBack">返回</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getQuestionWithOptionsAndAnswersById } from "../../../api/exam/question";

export default defineComponent({
  data() {
    return {
      questionId: {},
      repositoryList: [],
      questionInfo: {
        answerList: []
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
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      loading: true, // 控制是否显示加载效果
    };
  },
  created() {
    this.getQuestionWithOptionsAndAnswersById();
  },
  methods: {
    getQuestionWithOptionsAndAnswersById() {
      this.questionId = this.$route.params.questionId
      getQuestionWithOptionsAndAnswersById(this.questionId).then((res) => {
        this.questionInfo = res.data;
        this.loading = false
      });
    },
  },
})
</script>


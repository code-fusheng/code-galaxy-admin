<template>
  <div>
    <!--修改字典数据  -->
    <el-form ref="form" :model="dictData" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="字典标签" prop="dictLabel">
            <el-input v-model="dictData.dictLabel" placeholder="请输入字典标签" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型标识" prop="dictType">
            <el-input v-model="dictData.dictType" placeholder="请输入类型标识" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字典键值" prop="dictValue">
            <el-input v-model="dictData.dictValue" placeholder="请输入字典键值" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字典排序">
            <el-input-number v-model="dictData.dictSort" :min="1" :max="99" placeholder="字典排序" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="类型备注">
            <el-input v-model="dictData.remark" placeholder="请输入类型备注" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型状态" prop="isEnabled">
            <el-radio-group v-model="dictData.isEnabled">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">弃用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-button type="primary" v-loading="eventLoading"  @click="onSubmit" style="float: right; margin-left: 20px" size="mini">提交</el-button>
          <el-button @click="close" type="info"  style="float: right" size="mini">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { updateDictData } from '@/api/base/dictData'
export default {
  // 父组件将数据传递给子组件
  props: {
    type: {
      type: Object,
      default: null
    },
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dictData: {
      },
      // 表单校验
      rules: {},
      eventLoading: false
    }
  },
  created() {
    this.dictData = this.data
  },
  methods: {
    onSubmit() {
      this.eventLoading = true
      updateDictData(this.dictData).then(res => {
        this.eventLoading = false
        this.$emit('closeUpdateDialog')
        this.$emit('pageDictData')
      })
    },
    close() {
      this.$emit('closeUpdateDialog')
    }
  }
}
</script>


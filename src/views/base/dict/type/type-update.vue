<template>
  <div>
    <!--修改字典类型  -->
    <el-form ref="form" :model="dictType" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="类型名称" prop="dictName">
            <el-input v-model="dictType.dictName" placeholder="请输入类型名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型标识" prop="dictType">
            <el-input v-model="dictType.dictType" placeholder="请输入类型标识" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型备注">
            <el-input v-model="dictType.remark" placeholder="请输入类型备注" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型状态" prop="isEnabled">
            <el-radio-group v-model="dictType.isEnabled">
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
import { updateDictType } from '@/api/base/dictType'
export default {
  props: {
    type: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dictType: {},
      eventLoading: false,
      rules: {}
    }
  },
  created() {
    this.dictType = this.type
  },
  watch: {
    type: function() {
      this.dictType = this.type
    }
  },
  methods: {
    onSubmit() {
      this.eventLoading = true
      updateDictType(this.dictType).then(res => {
        this.eventLoading = false
        this.$emit('closeUpdateDialog')
        this.$emit('getDictTypeByPage')
      })
    },
    close() {
      this.$emit('closeUpdateDialog')
    }
  }


}
</script>


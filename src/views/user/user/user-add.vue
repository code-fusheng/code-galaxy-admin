<template>
  <div>
    <!--添加表单  -->
    <el-form ref="form" :model="user" :rules="rules" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名称（账号）" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="user.password" type="password" placeholder="请输入用户密码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户性别" prop="sex">
            <el-radio-group v-model="user.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="0">私密</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户状态" prop="isEnabled">
            <el-radio-group v-model="user.isEnabled">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">弃用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="user.realname" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="user.phone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱" prop="mail">
            <el-input v-model="user.mail" placeholder="请输入邮箱地址" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址" prop="address">
            <el-input v-model="user.address" type="textarea" :rows="1" placeholder="请输入地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户签名" prop="signature">
            <el-input v-model="user.signature" type="textarea" :rows="2" placeholder="请输入签名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户描述" prop="description">
            <el-input v-model="user.description" type="textarea" :rows="2" placeholder="请输入描述" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="用户头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :headers="headers"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
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

<script>
import { saveUser } from '@/api/user/user'
import { PcCookie, Key } from '@/utils/cookie'
export default {
  data() {
    return {
      user: {
        roleId: 3,
        header: null
      },
      imageUrl: null, // 上传图片回显
      uploadUrl: import.meta.env.VITE_APP_UPLOAD_URL, // 上传图片路径
      headers: { // 上传文件的请求头
        Authorization: "Bearer " + PcCookie.get(Key.accessTokenKey)
      },
      eventLoading: false,
      // 表单校验
      rules: {
        username: [
          { required: true, message: '用户名称不能为空', tirgger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', tirgger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', tirgger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择用户性别', trigger: 'change' }
        ],
        isEnabled: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    /**
     * 1、父组件可以使用 props 把数据传给子组件。
     * 2、子组件可以使用 $emit 触发父组件的自定义事件
     */
    onSubmit() {
      this.eventLoading = true
      saveUser(this.user).then(res => {
        this.eventLoading = false
        this.$emit('closeAddDialog')
        this.$emit('pageUser')
      })
    },
    uploadSuccess(res, file) {
      this.imageUrl = res.data
      this.user.header = res.data
    },
    close() {
      this.$emit('closeAddDialog')
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>


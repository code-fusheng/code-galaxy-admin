import axios from '../../utils/axios'
var server_name = 'auth-server'

// 数据格式
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
// 请求头添加 Authorization: Basic client_id:client_secret
const auth = {
  username: 'user-admin-server',
  password: 'test'
}

export interface loginDto {
  loginType: number,
  username: String,
  password: String
}

export const login = (data: loginDto) => axios({
  headers,
  auth,
  url: `/${server_name}/login`,
  method: 'post',
  params: data
})

export const info = () => axios({
  url: `/${server_name}/user/info`,
  method: 'get'
})


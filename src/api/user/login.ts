import axios from '../../utils/axios'
var server_name = 'user-admin-server'

export interface loginDto {
  loginType: number,
  username: String,
  password: String
}

export const login = (data: loginDto) => axios({
  url: `/${server_name}/login`,
  method: 'post',
  data
})

export const info = () => axios({
  url: '/auth-server/user/info',
  method: 'get'
})


import axios from '@/utils/axios'
var prefix_name = 'user-admin-server/role'

export const getRoleList = () => axios({
  url: `/${prefix_name}/getRoleList`,
  method: 'get',
})

export const getRoleIdsByUserId = (id: number) => axios({
  url: `/${prefix_name}/getRoleIdsByUserId/${id}`,
  method: 'get',
})

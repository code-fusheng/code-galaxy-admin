import axios from '@/utils/axios'
var prefix_name = 'article-server/admin/category'

// 添加文章分类
export const saveCategory = (data: any) => axios({
  url: `/${prefix_name}/saveCategory`,
  method: 'post',
  data
})

// 分页查询分类
export const pageCategory = (data: any) => axios({
  url: `/${prefix_name}/pageCategory`,
  method: 'post',
  data
})

// 查询分类详情
export const infoCategory = (id: number) => axios({
  url: `/${prefix_name}/infoCategory/${id}`,
  method: 'get'
})

// 修改字典类型
export const updateCategory = (data: any) => axios({
  url: `/${prefix_name}/updateCategory`,
  method: 'put',
  data
})

// 删除分类
export const deleteCategory = (id: any) => axios({
  url: `/${prefix_name}/deleteCategory/${id}`,
  method: 'delete'
})



import axios from '../../utils/axios'
var prefix_name = 'base-admin-server/dict/type'

export interface page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

export interface dictTypeDto {
  dictId: number,
  dictName: String,
  dictType: number,
  remark: String
}

export const getDictTypeByPage = (data: page) => axios({
  url: `/${prefix_name}/getDictTypeByPage`,
  method: 'post',
  data
})

export const saveDictType = (data: dictTypeDto) => axios({
  url: `/${prefix_name}/saveDictType`,
  method: 'post',
  data
})

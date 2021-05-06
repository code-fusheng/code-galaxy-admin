import axios from '../../utils/axios'
var prefix_name = 'base-admin-server/dict/data'

export interface page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

export interface dictDataDto {
  dictCode: String,
  dictLabel: String,
  dictValue: String,
  dictType: String,
  dictSort: number,
  remark: String
}

export const getDictDataByPage = (data: page) => axios({
  url: `/${prefix_name}/getDictDataByPage`,
  method: 'post',
  data
})

export const saveDictData = (data: dictDataDto) => axios({
  url: `/${prefix_name}/saveDataType`,
  method: 'post',
  data
})

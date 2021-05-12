// 基础查询对象
export interface baseQuery {
  pageNum: number,
  pageSize: number,
  sortColumn: string,
  sortMethod: string,
  beginTime: string,
  endTime: string,
  isEnabled: number,
}

export interface baseDto {
  state: number,
  remark: string,
  memo: string,
  version: number,
  isEnabled: number,
  isDeleted: number,
}

export interface IRepositoryDto {
  repositoryId: number,
  repositoryName: string
}

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

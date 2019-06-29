import request from '@/utils/request'

export default{
  getList(params) {
    return request({
      url: '/table/list',
      method: 'get',
      params
    })
  },
  getTableListPage(page,size,params){
    return request({
     url: `/table/pageList/${page}/${size}`,
     method:'post',
     data:params 
    })
  }
}


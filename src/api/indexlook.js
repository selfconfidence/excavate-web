import request from '@/utils/request'
const prefix_name = "index"
export  default {
    getIndexList(){
        return request({
            url: `/${prefix_name}/indexList`,
            method: 'get'
        })
    },
    getsIndexSearchList(page,size,parameterMap){
        return request({  //es6模板字符串写法 不用拼接
            url: `/${prefix_name}/indexSearchList/${page}/${size}`,
            method: 'post',
            data:parameterMap
        })
    },
    save(pojo){
   return request({
       url:`/${prefix_name}/save`,
       method:'post',
       data:pojo
   })
    },
   update(id,pojo){
       if (id =='' || id == null) {
          return this.save(pojo);
        
       }else{
        return request({
            url: `/${prefix_name}/update/${id}`,
            method:'put',
            data:pojo
        })
       }
    
   },
   findOneById(id){
      return request({
    url:`/${prefix_name}/${id}`,
    method:'get'
})
   } ,
   indexDelete(id){
       return request({
           url:`/${prefix_name}/${id}`,
           method:'delete'
       })
   }
}
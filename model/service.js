import Http from "../utils/http";
import Base from './base'
class Service extends Base{
  /**
   * 分页获取服务列表
   * @param {分类id} category_id
   * @param {服务类型} type
   */
  async getServiceList(category_id = null, type = null) {

    if (!this.hasMoreData) {
        return this.data
    }
    //发起网络请求 获取数据
    //统一的响应 异常处理
    const serviceList = await Http.request({
      url: "v1/mission/list",
      data: { 
          page: this.page, 
          count: this.count ,
          category_id: category_id ,
          type: type 
        },
    });
    
    this.data = this.data.concat(serviceList.data)
    this.hasMoreData = !(this.page === serviceList.last_page)
    this.page++
    return this.data
  }
  static updateServiceStatus(serviceId, action) {
    return Http.request({
        url: `v1/mission/${serviceId}`,
        data: {
            action
        },
        method: 'POST'
    })
}
static publishService(formData) {
  return Http.request({
      url: 'v1/mission',
      data: formData,
      method: 'POST'
  })
}

static editService(serviceId, formData) {
  return Http.request({
      url: `v1/mission/${serviceId}`,
      data: formData,
      method: 'PUT'
  })
}
  static getServiceById(serviceId){
     return Http.request({
        url:`v1/mission/${serviceId}`
     })
  }
  static getServiceStatus(type) {
    return Http.request({
        url: `v1/mission/count?type=${type}`
    })
}

async getMyService(type, status) {
    if (!this.hasMoreData) {
        return
    }

    const serviceList = await Http.request({
        url: 'v1/mission/my',
        data: {
            page: this.page,
            count: this.count,
            type,
            status
        }
    })

    this.data = this.data.concat(serviceList.data)
    this.hasMoreData = this.page !== serviceList.last_page
    this.page++
    return this.data
}
}
export default Service;

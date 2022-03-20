import Http from "../utils/http";
import Base from './base'
class Rating extends Base {
 async getServiceRatingList(serviceId,servicer_id){
    if (!this.hasMoreData) {
        return this.data
    }
    //发起网络请求 获取数据
    //统一的响应 异常处理
    const ratingList = await Http.request({
      url: "v1/rating/mission",
      data: { 
          page: this.page, 
          count: this.count ,
          mission_id: serviceId || '',
          servicer_id:servicer_id||''

        },
    });
    this.data = this.data.concat(ratingList.data)
    this.hasMoreData = !(this.page === ratingList.last_page)
    this.page++
    return this.data
 }
 static async getRatingByOrderId(orderId) {
  return Http.request({
      url: 'v1/rating/order',
      data: {
          order_id: orderId
      }
  })
}

static async createRating(order_id, score, content, illustration,mission_id) {
  return Http.request({
      url: 'v1/rating',
      data: {
          order_id, score, content, illustration,mission_id
      },
      method: 'POST'
  })
}

}
export default Rating;
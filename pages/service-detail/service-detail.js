const { default: Service } = require("../../model/service");
const { default:User } = require("../../model/user");
import serviceType from "../../enum/service-type";
import serviceStatus from "../../enum/service-status";
import { getEventParam,formateDate } from "../../utils/utils";
import serviceAction from "../../enum/service-action";
import Rating from "../../model/rating"
import Order from '../../model/order'
import cache from '../../enum/cache'
const rating = new Rating();
// pages/service-detail/service-detail.js
Page({
//   {
//     "id": 1,
//     "score": 5,
//     "content": "非常好，家里狗子甚至都不想回家了。",
//     "illustration": [],
//     "status": 2,
//     "create_time": "2021-03-07 15:45:32",
//     "author": {
//         "id": 1,
//         "nickname": "沁塵",
//         "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/icvFO1UdPCSmB5KpPANibbCHyktWCpsNtjtnuE0ibzHJz9sNO275JoB1Ur9HcZ25Hf9j31XiaEAXxxJBQsy5OJibCeg/132",
//         "real_name": "沁塵",
//         "gender": 1,
//         "tel": null
//     }
// }
  /**
   * 页面的初始数据
   */
  data: {
    service:{},
    serviceId:null,
    serviceTypeEnum:serviceType,
    serviceStatusEnum: serviceStatus,
    isPublisher:false,
    ratingList:[   
    ],
    loading:true,
    isServicer:null,
    hasOrder:false
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    this.data.serviceId = options.service_id;
    await this._getService();
   // await this._getServiceRatingList();
    
    this._checkRole();
    this.checkHasOrder();
    this.setData({
      loading:false
    })
  },
  async _getService(){
     const service =  await Service.getServiceById(this.data.serviceId)
    
     this.setData({
       service: service
     })
  },
  async _getServiceRatingList(){
     const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId)
      this.data.ratingList = ratingList;
      this.setData({
       ratingList
      })
  },
  _checkRole(){
      const userInfo = User.getUserInfoByLocal()
      const service = this.data.service;
      let isPublisher = false;
    
      if(userInfo&&userInfo._id === service.publisher._id){
        isPublisher = true;    
      }
      this.setData({
        isPublisher,
        isServicer:userInfo.isServicer,
       
      })
  },
  checkHasOrder:async function(){
    const userInfo = User.getUserInfoByLocal()
    const res =  await Order.checkHasOrder(this.data.serviceId,userInfo._id)
    if(res){
      this.setData({
        hasOrder:true
      })
    }
  },
  handleUpdateStatus: async function (event) {
    const action = getEventParam(event, 'action')
    const content = this._generateModalContent(action)
    const res = await wx.showModal({
        title: '注意',
        content,
        showCancel: true
    })
    if (!res.confirm) {
        return
    }
    await Service.updateServiceStatus(this.data.serviceId, action)
    await this._getService()
},

handleEditService: function () {
 const service = JSON.stringify(this.data.service);

  wx.navigateTo({
    url:`/pages/recycle-edit/recycle-edit?service=${service}`
  })
},

handleChat: function () {
  const targetUserId = this.data.service.publisher._id;
  const service = JSON.stringify(this.data.service);
   wx.navigateTo({
     url:`/pages/conversation/conversation?targetUserId=${targetUserId}&service=${service}`
   })
},

handleOrder: function () {
  const service = JSON.stringify(this.data.service);
  if(!wx.getStorageSync(cache.TOKEN)){
     wx.navigateTo({
       url:'/pages/login/login',
       events:{
          login:()=>{
            this._checkRole();
          }
       }
     })
     return;
  }
 
   wx.navigateTo({
    url:`/pages/order/order?service=${service}`
  })
},
  _generateModalContent(action) {
    let content

    switch (action) {
        case serviceAction.PAUSE:
            content = '暂停后服务状态变为“待发布”，' +
                '可在个人中心操作重新发布上线，' +
                '是否确认暂停发布该服务？'
            break;
        case serviceAction.PUBLISH:
            content = '发布后即可在广场页面中被浏览到，是否确认发布？'
            break;
        case serviceAction.CANCEL:
            content = '取消后不可恢复，需要重新发布并提交审核；' +
                '已关联该服务的订单且订单状态正在进行中的，仍需正常履约；' +
                '是否确认取消该服务？'
            break;
    }

    return content
},
})
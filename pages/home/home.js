// pages/home/home.js
import Category from '../../model/category';
import Service from '../../model/service';
import Tim from '../../model/tim'
import { throttle,debounce, getEventParam } from '../../utils/utils';
import { setTabBarBadge } from "../../utils/wx";
import cache from "../../enum/cache";
const service = new Service()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tabs:['全部服务','用户提供','小哥找单'],
     categoryList:[

     ],
     serviceList:null,
     categoryImageList:[],
     show_items:2,
     tabIndex:0,
     categoryId:0,
     loading:true,
     texts:[
       {
         id:1,
         title:'加入废旧驿站回收小哥团队才能接单赚钱哦☞'
       },
       {
        id:2,
        title:'随时接单，随时赚钱，有空就来，一起绿色回收☜'
       }
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
   
     //await this._getServiceList();
     //await this._getCategoryList();

     this.setData({
       loading:false
     }) 
  },
  onShow: async function () {
     await this._getServiceList();
     await this._getCategoryList();
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    setTabBarBadge(unreadCount)
    // this.setData({
    //   loading:false
    // }) 
},
 async _getServiceList(){
    //发起网络请求 获取服务列表的数据

    const serviceList = await service.reset().getServiceList(this.data.categoryId,0)

      this.setData({
        serviceList: serviceList
      })
    
  
    
 },
 async _getCategoryList(){
   const categoryList = await Category.getCategoryListWithAll()

   this.setData({
    categoryList
   })
 },
 async _getImageCategoryList(){
  const categoryImageList = await Category.getImageCategoryListWithAll()

  this.setData({
    categoryImageList
  })
},
  handleCategorySwitch: throttle(function (event) {
  const id = getEventParam(event,'id')
    if (this.data.categoryId === id) {
        return
    }
    
    this.data.categoryId = id
    this._getServiceList()
})
  ,
  handleSelectService:function (event) {
    const service = event.currentTarget.dataset.service
    
        //     1. 缓存。存在数据不一致
        // 2. 只传递一个 id .然后跳转的目标页面根据这个 id 发起一个请求获取数据
        wx.navigateTo({
            url: '/pages/service-detail/service-detail?service_id=' + service._id
        })
},
  handleTabSwitch :debounce(function (event) {
    this.data.tabIndex = event.detail.index
    this._getServiceList()
}),
  //下拉刷新
  async onPullDownRefresh(){
    this._getServiceList()
    wx.stopPullDownRefresh()
  },
  //上拉触底加载更多
  async onReachBottom(){
     // 获取下一页的数据并且和当前的数据合并
     if(!service.hasMoreData){
       return;
     }
    const serviceList = await service.getServiceList(this.data.categoryId,this.data.tabIndex);
    this.setData({
      serviceList
    })
  }
})
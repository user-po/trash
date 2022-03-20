import { setTabBarBadge } from "../../utils/wx";
import cache from "../../enum/cache";
import publishPreview from "../../config/publish-preview"
const { default: Category } = require("../../model/category");
Page({

  data: {
    playSlide:true,
    loading:true,
    swiperList:publishPreview.swiperList,
    categorySquareList:null,
    requirementList:publishPreview.requirementList,
    hotList:publishPreview.hotList,
    imageSrc:publishPreview.imageSrc,
    adSrc:"http://112.74.54.65:3000/storage/20220226/0-17f33f70e9e.png",
    imageList:[{
       id:1,
       src:"https://www.gxfjyz.com/storage/20220315/0-17f8af2aab6.jpg"
    },
  {
    id:2,
    src:"https://www.gxfjyz.com/storage/20220315/0-17f8af36e18.jpg"
  },{
    id:3,
    src:"https://www.gxfjyz.com/storage/20220315/1-17f8af3cf11.jpg"
  },{
    id:4,
    src:"https://www.gxfjyz.com/storage/20220315/0-17f8c4f18c7.jpg"
  }],
    shopImageList:[
      {
        id:1,
        path:"http://112.74.54.65:3000/storage/20220226/0-17f34b301d2.png"
      },
      {
        id:2,
        path:"http://112.74.54.65:3000/storage/20220226/0-17f34bb46d9.png"
      },
      {
        id:3,
        path:"http://112.74.54.65:3000/storage/20220226/0-17f34bc208b.png"
      },{
        id:4,
        path:"http://112.74.54.65:3000/storage/20220226/0-17f34bc82fd.png"
      }
    ]
  },
  //下拉刷新
  async onPullDownRefresh(){
    await this.getCategoryList();
    wx.stopPullDownRefresh()
  },
  onLoad: async function (options) {
    await this.getCategoryList();
      this.setData({
        loading:false
      })
  },
  async getCategoryList(){
    const categoryList = await Category.getCategoryList();
    this.setData({
      categorySquareList:categoryList
    })
  },
  onShow: function () {
    this.setData({
      playSlide:true
    })
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    setTabBarBadge(unreadCount)
},
onHide:function(){
  this.setData({
    playSlide:false
  })
}
})
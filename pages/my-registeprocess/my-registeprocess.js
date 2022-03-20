// pages/my-registeprocess/my-registeprocess.js
import { debounce, getEventParam } from "../../utils/utils";
import User from '../../model/user'
import cache from '../../enum/cache'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', '待审核', '已同意', '已拒绝'],
    active: 0,
    registeList:null,
    status:null,
    userInfo:wx.getStorageSync(cache.USER_INFO)||[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const status = parseInt(options.status)

    this.setData({
        active: status,
    })

    this.data.status = status < 0 ? '' : status
  },
  handleTabChange: debounce(async function (event) {
       
    const index = getEventParam(event, 'index')
    this.data.status = index;
    await this.getRegisteList();
  
}),

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
     await this.getRegisteList();
  },
  async getRegisteList(){
    console.log(this.data.userInfo)
    const registeList = await User.getRegisteList(this.data.userInfo._id,this.data.status)
    this.setData({
      registeList:registeList.data
    })
  }
})
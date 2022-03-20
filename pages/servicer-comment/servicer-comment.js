// pages/servicer-comment/servicer-comment.js
import Rating from '../../model/rating'
const rating  = new Rating();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let {servicer_id} = options;
     this.getRatingList(servicer_id)
  },
  getRatingList:async function(servicer_id){
   
    const ratingList = await rating.reset().getServiceRatingList('',servicer_id)
    this.setData({
      ratingList,
      servicer_id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getRatingList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {

     // 获取下一页的数据并且和当前的数据合并
     if(!rating.hasMoreData){
      return;
    }
    const ratingList = await rating.getServiceRatingList('',this.data.servicer_id)
    this.setData({
      ratingList
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
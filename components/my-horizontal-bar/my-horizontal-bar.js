// components/my-horizontal-bar/my-horizontal-bar.js
Component({
  /**
   * 组件的属性列表
   */
   options:{
    multipleSlots:true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goWallet:function(){
      wx.navigateTo({
         url:"/pages/my-wallet/my-wallet"
      })
    },
    goAddress:function(){
      wx.navigateTo({
        url:"/pages/address/address"
      })
    }
  }
})

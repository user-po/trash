// components/appointment-button/appointment-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageSrc:{
      type:String,
      default:""
    },
    text:{
      type:String,
      default:"一键预约"
    }
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
    goPublish:function(){
      wx.navigateTo({
        url:'/pages/publish/publish'
      })
    }
  }
})

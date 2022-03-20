const { getDataSet } = require("../../utils/utils")

// components/category_square/category_square.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categorySquareList:{
      type:Array,
      default:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    categoryPickerIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goPublish:function(event){
      //const index = getDataSet(event,"index")

       wx.switchTab({
         url: '/pages/recycle/recycle',
       })
    }
  }
})

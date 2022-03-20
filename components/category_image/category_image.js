// components/category_image/category_image.js
const { throttle } = require("../../utils/utils");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryList:{
      type:Array,
      value:[]
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    categoryId:0,
    currentTabIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCategorySwitch:throttle(
      function (e){
        
        const {id,index} =  e.currentTarget.dataset;
        if(this.data.categoryId === id){
          return;
        }
         this.setData({
          currentTabIndex:index,
          categoryId:id
         })
         this.triggerEvent('switch',{id})
    
      }
    ) 
  }
})

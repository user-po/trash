const { throttle } = require("../../utils/utils");

// components/category/category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryList:{
      type:Array,
      value:[]
    },
    show_items:{
      type:Number,
      value:5
    },
    showTitle:{
      type:Boolean,
      value:false
    },
    title:{
      type:String,
      value:"选择回收品类"
    },
    categoryPickerIndex:{
      type:Number,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    categoryId:0,
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
        
           
        
         this.data.categoryId = id;
         this.setData({
          categoryPickerIndex:index
        })
         this.triggerEvent('switch',{id,index})
    
      }
    ) 
  }
})

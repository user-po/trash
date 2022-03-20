// components/swiper/swiper.js
const { getEventParam, getDataSet } = require("../../utils/utils");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList:{
      type:Array,
      default:[]
    },
    indicator:{
      type:Boolean,
      default:true
    },
    circular:{
      type:Boolean,
      default:true
    },
    autoplay:{
      type:Boolean,
      default:true
    },
    interval:{
      type:Number,
      default:5000
    },
    duration:{
      type:Number,
      default:500
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
    handleSwiperTap:function(e){
      const index = getEventParam(e,"index")
      this.triggerEvent('getUserInfo',{index})
    }
  }
})

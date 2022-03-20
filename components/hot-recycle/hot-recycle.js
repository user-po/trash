const { getDataSet } = require("../../utils/utils")

Component({
  data: {
    currentIndex:0
  },
  options: {
    multipleSlots:true
  },
  properties: {
     showTopLine:{
      type: Boolean,
      value: true
     },
     list:Array
  },
  methods: {
    handleSelect(event){
      const index = getDataSet(event, 'index')
      this.setData({
         currentIndex:index
      })
      wx.switchTab({
        url: '/pages/recycle/recycle',
      })
    }
  }
})
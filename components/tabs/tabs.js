const { throttle } = require("../../utils/utils");

// components/tabs/tabs.js
Component({
  options: {
    multipleSlots:true
  },
  properties: {
      tabs:{
        type: Array,
        value:[]
      },
      active:{
         type:Number,
         value:0
      },
      hide:{
        type:Boolean,
        value:false
      }
  },
  observers:{
     active:function(active){
       this.setData({
          currentTabIndex:active
       })
     }
  },
  data: {
    currentTabIndex:0
  },
  methods: {
    handleTabSwitch:throttle(
      function (e){
        const {index} = e.currentTarget.dataset
        if (index === this.data.currentTabIndex) {
          this.triggerEvent('doubleclicktab')
          return
      }
        this.setData({
            currentTabIndex:index
        })
  
        this.triggerEvent('switch',{index})
      }
    ),
    hanldeTouchMove(event){
      //0 -1 1
        const direction = event.direction
        const currentTabIndex = this.data.currentTabIndex
        const targetTabIndex = currentTabIndex + direction;
      
        if(targetTabIndex<0 || targetTabIndex>this.data.tabs.length-1){
          return;
        }

        const customEvent = {
           currentTarget:{
              dataset:{
                 index:targetTabIndex
              }
           }
        }

        this.handleTabSwitch(customEvent)
    }
  }
})

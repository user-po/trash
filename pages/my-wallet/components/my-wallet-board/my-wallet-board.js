// pages/my-wallet/components/my-wallet-board/my-wallet-board.js
import NumberAnimate from '../../../../utils/NumberAnimate'
import { getDataSet, getEventParam } from '../../../../utils/utils';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    money:{
      type:String,
      value:"0,00"
    }
  },
  observers:{
    'money':function(money){
      
     let n = new NumberAnimate({
        from:parseFloat(this.data._money),
        to:parseFloat(money),
        refreshTime:100,
        decimals:2,
        onUpdate:()=>{

          this.setData({

            _money:String(n.tempValue).replace(".",",")

          });

        },

        onComplete:()=>{

          this.setData({

            _money:money

          });
        }
     })     
    }
 },
  /**
   * 组件的初始数据
   */
  data: {
    numArray: [20, 30, 50, 80, 100,'m'],
    activeIndex: 0, //默认选中第一个,
    _money:"0,00",
    count:20,
  },

  /**
   * 组件的方法列表
   */
  methods: {
     handleMoneyInput(e){
       let money = getEventParam(e,'value')
       money = Number(money)
       this.setData({
        count:money
       })
     },
     goCharge(e){
       this.triggerEvent('charge',{money:this.data.count})
     },
     activethis(event) { //点击选中事件
      let thisindex = event.currentTarget.dataset.thisindex; //当前index
      this.setData({
        activeIndex: thisindex,
        count:Number(this.data.numArray[thisindex])
      })
    }
  }
})

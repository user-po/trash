const { getEventParam } = require("../../utils/utils");
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { moneyStore } from "../../store/money";
import Money from '../../model/money.js'
import payOrder from '../../model/payOrder.js'
import payAction from '../../enum/pay-action.js'
// pages/my-wallet/my-wallet.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    moneyOrderList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store: moneyStore,
      fields: ["money"],
      actions: ["setMoney"],
    });
  },
  onUnload: function () {
    this.storeBindings.destroyStoreBindings()
  },
  handleCharge: async function (e) {
    let money = getEventParam(e, "money");
    money = Number(money)
    //console.log(money);
    const res = await Money.Charge(money)
   wx.requestPayment(
     {
      timeStamp: res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: 'MD5',
      paySign: res.paySign,
      success: async ()=> {
        await payOrder.createPayOrder({openid:res.openid,order_no:res.order_no,action:'charge',count:res.count})
      
        //this.setMoney(res.count)
      },
      fail () { 
      },
      complete: async ()=>{
         const result = await payOrder.payOrderQuery(res.order_no)
         if(result.trade_state==='SUCCESS'){
            wx.showToast({
              title: result.trade_state_desc,
              icon:'success'
            })
            const res = await Money.moneyQuery()
            const payOrderRes = await payOrder.payOrderList();
            this.setData({
              money:res.count,
              moneyOrderList:payOrderRes
            })
         }else{
          wx.showToast({
            title: result.trade_state_desc,
            icon:'error'
          })
         }
      }
     }
   )
 
  },
  onShow: async function () {
    
    const res = await Money.moneyQuery()
    const payOrderRes = await payOrder.payOrderList();
    
    this.setData({
      money:res.count,
      moneyOrderList:payOrderRes
    })
  },
});

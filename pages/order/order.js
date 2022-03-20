import Order from "../../model/order";
const {getLocation}  = require("../../utils/getLocation")
import Money from '../../model/money'
Page({
    data: {
        service: null,
        to: {
            latitude:"",
            longitude:""
        }
    },
    onLoad: function (options) {
        const service = JSON.parse(options.service);
      
        this.setData({
            service
        })
    },

    handleSelectAddress: async function () {
        const address = await wx.chooseAddress();
        getLocation().then((posObj)=>{

            this.data.to.latitude = posObj.latitude;
            this.data.to.longitude = posObj.longitude
        });
        this.setData({
            address
        })
    },

    handleOrder: async function () {
       
      setTimeout(async ()=>{
        if ( !this.data.address||!this.data.to.latitude||!this.data.to.longitude) {
            wx.showModal({
                title: '错误',
                content: '该服务必须指定服务地点',
                showCancel: false
            })
            return
        }

        const res =  await wx.showModal({
            title: '注意',
            content: '是否确认预约该服务'
        })

        if (!res.confirm) {
            return
        }

        wx.showLoading({ title: '正在预约...', mask: true })

        try {
            wx.showModal({
                title:'注意',
                content:'即将扣除您一定的钱包余额，继续吗',
                success: async ()=>{
                    const moneyRes = await Money.moneyQuery();
                    if(moneyRes.count>0){
                        const res = await Order.createOrder(this.data.service._id, this.data.address,this.data.to)
                        await Money.pay(res.order_id)
                        wx.navigateTo({
                            url: '/pages/order-success/order-success'
                        })
                    }else{
                        wx.showToast({
                          title: '余额不足请充值',
                          icon:'error',
                          duration:2300,
                          success(){
                              wx.navigateTo({
                                url: '/pages/my-wallet/my-wallet',
                              })
                          }
                        })
                    }
                },
                fail(){
           
                },
                complete:async ()=>{
                   
                }
           
              })
           
            
        } catch (e) {
            wx.showModal({
                title:'错误',
                content:'预约失败，请稍后重试'
            })
            console.log(e)
        }

        wx.hideLoading()
      },500)
    }
});
const {  getEventParam } = require("../../utils/utils");

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     addressList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
   
    let addressList = wx.getStorageSync("address")||[];
    if(addressList.length>0){
      console.log('in')
      this.setFirstAsDefault();
    }
  },
  onShow:function(){
      let addressList = wx.getStorageSync("address")||[];
      if(addressList.length>0){
        console.log('in')
        this.setFirstAsDefault();
      }
      // this.setData({
      //     addressList
      // })
  },
  setFirstAsDefault:function(){
    let index = 0;
    let address = wx.getStorageSync("address")|| [];
    address[index]["isDefault"] = true;
    console.log(address)
    wx.setStorageSync("address",address)
    this.setData({
        addressList:address
    })
  },
  handleSetDefault:function(e){
    let index =  getEventParam(e,"index")
    let address = wx.getStorageSync("address")|| [];
    address.map(item=>{
        if(item.isDefault){
            item.isDefault = false;
        }
    })
    address[index]["isDefault"] = true;
    wx.setStorageSync("address",address)
    this.setData({
        addressList:address
    })
  },
  handleDeleteAddress:async function(e){
    let index =  getEventParam(e,"index")
    let address = wx.getStorageSync("address")|| [];
    const res = await wx.showModal({
        title:"注意",
        content:"是否删除地址信息"
    })
    if(!res.confirm){
        return;
    }
    address.splice(index,1)
    wx.setStorageSync("address",address)
    this.setData({
        addressList:address
    })
  },
  handleEditAddress:function(e){
        let index =  getEventParam(e,"index")
        wx.chooseAddress({
            success: (res)=>{
                  let address = wx.getStorageSync("address")|| [];
                  let isDefault = address[index]["isDefault"]
                  address.splice(index,1,{
                    "index":index,
                    "name": res.userName,
                    "phone": res.telNumber,
                    "province": res.provinceName,
                    "city": res.cityName,
                    "county": res.countyName,
                    "detailInfo": res.detailInfo,
                    "isDefault":isDefault
                  })                
                  wx.setStorageSync("address",address)
                  this.setData({
                      addressList:address
                  })
                
            },
            fail: () => {
              console.log('用户拒绝');   // 如果获取地址权限失败，弹出确认弹窗，让用户选择是否要打开设置，手动去开权限
            }
          })
  },
  addAddress:function(){
    wx.chooseAddress({
        success: (res)=>{
              let address = wx.getStorageSync("address")|| [];
              address.push({
                "name": res.userName,
                "phone": res.telNumber,
                "province": res.provinceName,
                "city": res.cityName,
                "county": res.countyName,
                "detailInfo": res.detailInfo,
                "isDefault":false
              })
              address[address.length-1]["index"] = address.length-1
              wx.setStorageSync("address",address)
              this.setData({
                  addressList:address
              })
            
        },
        fail: () => {
          console.log('用户拒绝');   // 如果获取地址权限失败，弹出确认弹窗，让用户选择是否要打开设置，手动去开权限
        }
      })
  
  }
})
// pages/my/my.js
import { setTabBarBadge } from "../../utils/wx";
import {getEventParam} from '../../utils/utils'
import cache from "../../enum/cache";
import Token from "../../model/token";
import User from "../../model/user";
import Order from "../../model/order";
import roleType from "../../enum/role-type";
import Service from "../../model/service";
import serviceType from "../../enum/service-type";
import { appointWithMeGrid, myAppointGrid, myProvideGird, mySeekGrid,toolsBoxGrid,registeProcess } from "../../config/grid";
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userInfo:{
       nickname:'点击授权登陆',
       avatar:'../../images/adminmo.png'
     },
     // 宫格配置
        // 预约我的宫格
        appointWithMeGrid: appointWithMeGrid,
        // 我的预约宫格
        myAppointGrid: myAppointGrid,
        // 我在提供宫格
        myProvideGird: myProvideGird,
        toolsBoxGrid:toolsBoxGrid,
        registeProcess:registeProcess,
        // 正在找宫格
        mySeekGrid: mySeekGrid,
        appointWithMeStatus: null,
        myAppointStatus: null,
        provideServiceStatus: null,
        seekServiceStatus: null,
        //回收注册流程状态
        RegisteStatus:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
   async onShow(){
   
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    setTabBarBadge(unreadCount)

    const verifyToken = await Token.verifyToken();
    if(verifyToken.valid){
        const userInfo = User.getUserInfoByLocal()
        this.setData({
           userInfo
        })
        this._getOrderStatus()
        this._getServiceStatus()
        this._getRegisteStatus();
    }
},

async _getOrderStatus() {
  const appointWithMeStatus = Order.getOrderStatus(roleType.PUBLISHER); // 6
  const myAppointStatus = Order.getOrderStatus(roleType.CONSUMER); // 3

  this.setData({
      appointWithMeStatus: await appointWithMeStatus,
      myAppointStatus: await myAppointStatus
  })
},
checkRegisteStatus:async function(){
  const userInfo = await User.getUserInfoByRemote(this.data.userInfo.openid)
  console.log(userInfo);
   if(userInfo.isServicer===true&&this.data.userInfo.isServicer!==true){

      wx.navigateTo({
        url: '/pages/login/login',
      })
   }
},
async _getRegisteStatus(){
  const RegisteStatus = User.getRegisteStatus();
  this.setData({
    RegisteStatus: await RegisteStatus
  },()=>{
    this.checkRegisteStatus()
  })
},
async _getServiceStatus() {
  const provideServiceStatus = Service.getServiceStatus(serviceType.PROVIDE);
  const seekServiceStatus = Service.getServiceStatus(serviceType.SEEK);
  this.setData({
      provideServiceStatus: await provideServiceStatus,
      seekServiceStatus: await seekServiceStatus
  })
},

handleNavToOrder(event) {
  const cell = getEventParam(event, 'cell')
  if (!('status' in cell)) {
      wx.navigateTo({
          url: `/pages/refund-list/refund-list?role=${cell.role}`
      })
      return
  }

  wx.navigateTo({
      url: `/pages/my-order/my-order?role=${cell.role}&status=${cell.status}`
  })
},
handleCheckRegisteProcess(e){
 const {status} = getEventParam(e,'cell')
 if(typeof status === 'undefined'){
   wx.navigateTo({
     url: '/pages/register/register',
   })
 }else{
  wx.navigateTo({
    url: `/pages/my-registeprocess/my-registeprocess?status=${status}`,
  })
 }
},
handleNavToMyService(event) {
  const { type, status } = getEventParam(event, 'cell')
  wx.navigateTo({
      url: `/pages/my-service/my-service?type=${type}&status=${status}`
  })
},

handleToLogin() {
  wx.navigateTo({
      url: '/pages/login/login'
  })
},
handleRegister:function(){
   wx.navigateTo({
     url:"/pages/register/register"
   })
},
})
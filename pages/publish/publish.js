// pages/publish/publish.js
import Service from "../../model/service";
import { getEventParam } from "../../utils/utils";
import cache from '../../enum/cache'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      type: null,
      title: "",
      category_id: null,
      cover_image: null,
      description: "",
      designated_place: false,
      begin_date: "",
      end_date: "",
      price: "",
      weight:"",
      address:"",
      phone:""
    },
  },
  handleSubmit: async function (event) {
    const res = await wx.showModal({
      title: "提示",
      content: "是否确认申请发布该服务？",
      showCancel: true,
    });

    if (!res.confirm) {
      return;
    }

    wx.showLoading({ title: "正在发布....", mask: true });
    const formData = getEventParam(event, "formData");
    try {
     const res =  await Service.publishService(formData);
     console.log(res)
      this._resetForm();
      wx.navigateTo({
        url: `/pages/publish-success/publish-success?type=${formData.type}`,
      });
    } catch (e) {
      console.log(e);
    }
    wx.hideLoading();
  },
  _resetForm() {
    const formData = {
      type: null,
      title: "",
      category_id: null,
      cover_image: null,
      description: "",
      designated_place: false,
      begin_date: "",
      end_date: "",
      price: "",
      weight:"",
      address:"",
      phone:""
    };

    this.setData({
      formData,
    });
  },
  onLoad: function (options) {},
  onShow:function(){
   //const userInfo = wx.getStorageSync(cache.userInfo)||[]
    // if(userInfo.length===0){
    //   wx.showToast({
    //     title: '注意',
    //     content:"检测到您未登录,请登录",
    //     success:()=>{
    //        wx.navigateTo({
    //          url: '/pages/login/login',
    //        })
    //     },
    //     fail:()=>{
    //       wx.navigateTo({
    //         url: '/pages/login/login',
    //       })
    //     }
    //   })
    // }
  }
});

const { getDataSet, getEventParam } = require("../../utils/utils");

import Category from "../../model/category";
import Service from "../../model/service";
const { getLocation } = require("../../utils/getLocation");
// pages/recycle/recycle.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    form: {
      // type: 1,
      title: "",
      category_id: "",
      cover_image_id: "",
      service_date: "",
      weight: "",
      address: "",
      phone: "",
      latitude: "",
      longitude: "",
    },
    bannerSrc: "http://112.74.54.65:3000/storage/20220226/0-17f362c8518.png",
    recycleList: [
      {
        id: 1,
        src: "http://112.74.54.65:3000/storage/20220226/0-17f364d5aff.png",
        detail: "手机下单",
      },
      {
        id: 2,
        src: "http://112.74.54.65:3000/storage/20220226/1-17f364e1892.png",
        detail: "预约上门",
      },
      {
        id: 3,
        src: "http://112.74.54.65:3000/storage/20220226/1-17f364e9fb4.png",
        detail: "上门回收",
      },
      {
        id: 4,
        src: "http://112.74.54.65:3000/storage/20220226/1-17f364f6e83.png",
        detail: "完成结算",
      },
    ],
    attentionList: [
      {
        id: 1,
        title: "拒绝掺水/掺杂",
        text: "当回收物掺水/掺入其他异物导致重 量与实际不符，回收员可拒绝回收。",
      },
      {
        id: 2,
        title: "上门时间",
        text: "下单成功，回收小哥将会与您预约上门时间并准时上门服务。",
      },
      {
        id: 3,
        title: "单次10kg起",
        text: "确保回收物重量超 过10kg,当少于 10kg可能会影响回收时效。",
      },
    ],
    questionList: [
      {
        id: 1,
        title: "1、旧纺织品怎么回收？",
        text: "答：尊敬的用户，旧纺织品将按照平台定价免费上门有偿回收，回收员接单后将与您联系 确认上门服务时间。",
        isShow: true,
      },
      {
        id: 2,
        title: "2、家具家电怎么回收？",
        text: "答：测试测试cesium",
      },
      {
        id: 3,
        title: "2、家具家电怎么回收？",
        text: "答：回收员现场结算",
      },
    ],
    categoryList: null,
    defaultItem: null,
    addressImgSrc:
      "http://112.74.54.65:3000/storage/20220228/0-17f4080014a.png",
    gainSrc: "http://112.74.54.65:3000/storage/20220228/0-17f40b4ee4f.png",
    scoreSrc: "http://112.74.54.65:3000/storage/20220228/1-17f40b524b5.png",
    tabs: [
      {
        id: 0,
        text: "10-20公斤",
      },
      {
        id: 1,
        text: "20-50公斤",
      },
      {
        id: 2,
        text: "50-100公斤",
      },
      {
        id: 3,
        text: "100公斤以上",
      },
    ],
    gain: [
      {
        id: 0,
        money: "30",
      },
      {
        id: 1,
        money: "40",
      },
      {
        id: 2,
        money: "50",
      },
      {
        id: 3,
        money: "60",
      },
    ],
    score: [
      {
        id: 0,
        score: "30",
      },
      {
        id: 1,
        score: "40",
      },
      {
        id: 2,
        score: "50",
      },
      {
        id: 3,
        score: "60",
      },
    ],
    currentTabIndex: null,
    formData: {
      type: 1,
      title: "",
      category_id: null,
      cover_image_id: null,
      service_date: "",
      weight: "20-50公斤",
      address: "",
      phone: "",
      name: "",
      latitude: "",
      longitude: "",
      price:"40",
      currentTabIndex:0
    },
    files: [],
    categoryList: [],
    categoryPickerIndex: null,
    categoryId: null,
    resetForm: true,
  },

  async _init() {
    const categoryList = await Category.getCategoryList();
    const categoryPickerIndex = categoryList.findIndex(
      (item) => this.data.form.category_id === item._id
    );
    const currentTabIndex = this.data.tabs.findIndex(
      (item)=>this.data.form.weight===item.text
    )
    this.setData({
      showForm: true,
      // typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
      categoryPickerIndex:
        categoryPickerIndex !== -1 ? categoryPickerIndex : null,
        currentTabIndex:
        currentTabIndex !== -1 ? currentTabIndex : null,
      categoryList,
      files: this.data.form.cover_image ? [this.data.form.cover_image] : [],

      //深拷贝 浅拷贝
      formData: {
         type: this.data.form.type,
        title: this.data.form.title,
        category_id: this.data.form.category_id,
        cover_image_id: this.data.form.cover_image
          ? this.data.form.cover_image._id
          : null,
        service_date: this.data.form.service_date,
        weight: this.data.form.weight,
        address: this.data.form.address,
        phone: this.data.form.phone,
        latitude: this.data.form.latitude,
        longitude: this.data.form.longitude,
        name: this.data.form.publisher.realname,
        currentTabIndex: this.data.form.currentTabIndex,
        price:this.data.form.price
      },
    });
  },
  async submit() {
    const formData = this.data.formData;
    if (
      (!formData.title && !formData.title.length >= 5) ||
      !formData.category_id ||
      !formData.cover_image_id ||
      !formData.service_date||
      !formData.weight||
      !formData.address||
      !formData.phone||
      !formData.name||
      !formData.latitude||
      !formData.longitude||
      !formData.price
    ) {
        wx.showToast({
          title:"参数不完整",
          icon:"error"
        })
        return;
    }
    const res = await wx.showModal({
      title: "提示",
      content: "是否确认修改该服务？提交后会重新进入审核状态",
      showCancel: true,
    });

    if (!res.confirm) {
      return;
    }

    wx.showLoading({ title: "正在发布....", mask: true });
   
    try {
     const res =  await Service.editService(this.data.form._id,formData);
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
      title: "",
      category_id: null,
      cover_image_id: null,
      service_date: "",
      weight: "",
      address: "",
      phone: "",
      name: "",
      latitude: "",
      longitude: "",
      currentTabIndex: "",
    };

    this.setData({
      formData,
      files:[]
    });
  },
  async _getCategoryList() {
    const categoryList = await Category.getCategoryList();

    this.setData({
      categoryList,
    });
  },
  handleTabChange: function (e) {
    const index = getDataSet(e, "index");
    this.setData({
      currentTabIndex: index,
      ["formData.weight"]: this.data.tabs[index].text,
      ["formData.currentTabIndex"]: index,
      ["formData.price"]: this.data.gain[index].money,
    });
  },
  handleCategorySwitch: function (e) {
    const index = getEventParam(e, "index");
    console.log(e);
    this.setData({
      categoryPickerIndex: index,
      ["formData.category_id"]: this.data.categoryList[index]._id,
    });
  },
  handleFold: function (e) {
    const index = getDataSet(e, "index");
    let isShow = this.data.questionList[index].isShow;

    for (let i in this.data.questionList) {
      if (i !== index) {
        this.data.questionList[i].isShow = false;
      }
    }

    this.setData({
      [`questionList[${index}].isShow`]: !isShow,
    });
  },
  onLoad: async function (options) {
    // const   form={
    //   // type: 1,
    //   title: "",
    //   category_id: "",
    //   cover_image_id: "",
    //   service_date: "",
    //   weight:"",
    //   address:"",
    //   phone:"",
    //   latitude:"",
    //   longitude:""
    // }
    const  service  = options.service ? JSON.parse(options.service) : "";
   // const categoryPickerIndex = options.categoryPickerIndex?options.categoryPickerIndex:null;
    if (Boolean(service)) {
      this.setData({
        form: service,
      });
    }
    await this._getCategoryList();
  },
  onShow: function () {
   //没有从首页过来的话
    if(this.data.resetForm){
      this._init(this.data.form);
    }
    this.data.resetForm = true
    getLocation().then( (posObj) => {
      this.data.formData.latitude = posObj.latitude;
      this.data.formData.longitude = posObj.longitude;
    });
  },
  onHide(){
    console.log('hide')
    if (this.data.resetForm) {

      this.setData({
          showForm: false
      })
  }
  },
  goGetAddress: function () {
    let addressList = wx.getStorageSync("address");
    let hasDefaultAddress = false;
    for (let i in addressList) {
      if (addressList[i].isDefault === true) {
        this.setData({
          ["formData.address"]: `${addressList[i].province}${addressList[i].city}${addressList[i].county}${addressList[i].detailInfo}`,
          ["formData.phone"]: `${addressList[i].phone}`,
          ["formData.name"]: `${addressList[i].name}`,
        });
        hasDefaultAddress = true;
        break;
      }
    }
    if (!hasDefaultAddress) {
      wx.navigateTo({
        url: "/pages/address/address",
      });
      hasDefaultAddress = false;
    }
  },
  handleServiceDateChange: function (event) {
    const serviceDate = getEventParam(event, "value");
    this.setData({
      ["formData.service_date"]: serviceDate,
    });
  },
  handleUploadSuccess: function (e) {
    const id = e.detail.files[0].id;
    this.setData({
      ["formData.cover_image_id"]: id,
    });
  },
  handleUploadFail: function (e) {
    console.log(e);
  },
  handleHidePage: function () {
    this.data.resetForm = false;
  },
  handleInput: function (e) {
    const value = getEventParam(e, "value");
    const field = getDataSet(e, "field");

    this.setData({
      [`formData.${field}`]: value,
    });
  },
});

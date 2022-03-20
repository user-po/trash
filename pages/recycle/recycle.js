const { getDataSet, getEventParam } = require("../../utils/utils");
import cache from "../../enum/cache";
import Category from "../../model/category";
import Service from "../../model/service";
import Question from '../../model/question'
import Protocol from '../../model/protocol'
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
    
    ],
    showModal:false,
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
  async getQuestionList(){
      const questionList = await Question.getQuestionList();
      this.setData({
        questionList
      })
  },
  async _init() {
    const categoryList = await Category.getCategoryList();
    const categoryPickerIndex = categoryList.findIndex(
      (item) => this.data.form.category_id === item._id
    );
    this.setData({
      showForm: true,
      // typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
      categoryPickerIndex:
        categoryPickerIndex !== -1 ? categoryPickerIndex : null,
      categoryList,
      files: this.data.form.cover_image ? [this.data.form.cover_image] : [],
      currentTabIndex: null,
      //深拷贝 浅拷贝
      formData: {
         type: this.data.form.type,
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
        name: this.data.form.name,
        currentTabIndex: this.data.form.currentTabIndex,
        price:this.data.form.price
      },
    });
  },
  handleValidatefail(e){
    const error = getEventParam(e,'error')
    wx.showToast({
      title: error,
      icon:'error'
    })
  },
  async submit() {
    if(typeof this.data.categoryPickerIndex !== 'undefined'){
      this.data.formData.title = this.data.categoryList[this.data.categoryPickerIndex].name+'类回收'
    }else{
      wx.showToast({
        title:"参数不完整",
        icon:"error"
      })
      return;
    }
    const formData = this.data.formData;
    if (
      (!formData.title && !formData.title.length >= 5) ||
      !formData.category_id ||
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
      content: "是否确认申请发布该服务？",
      showCancel: true,
    });

    if (!res.confirm) {
      return;
    }

    wx.showLoading({ title: "正在发布....", mask: true });
   
    try {
     const res =  await Service.publishService(formData);
     
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
    const index =getDataSet(e, "index");
    console.log(this.data.tabs[index].text)
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
    const { service } = options.service ? JSON.parse(options.service) : "";
    if (Boolean(service)) {
      this.setData({
        form: service,
      });
    }
   
    await this.getQuestionList();
    await this._getCategoryList();
  },
  handleModal(){
    this.setData({
      showModal:false
    })
  },
  getProtocolAndShow:async function(){
      const protocol = await Protocol.getProtocol();
     this.setData({
       protocol:protocol[0],
       showModal:true
     })
     
  },
  onShow: function () {

    if(this.data.resetForm){
      this._init(this.data.form);
    }
   this.data.resetForm = true
   
    getLocation().then((posObj) => {
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

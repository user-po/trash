const { default: serviceType } = require("../../enum/service-type");
const { default: Category } = require("../../model/category");
const { getEventParam, getDataSet } = require("../../utils/utils");
const moment = require("../../lib/moment");
const { default: cache } = require("../../enum/cache");
const {getLocation}  = require("../../utils/getLocation")
// components/service-form/service-form.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    form: Object,
  },
  lifetimes:{
    attached(){

      getLocation().then((posObj)=>{
        this.data.formData.latitude = posObj.latitude;
        this.data.formData.longitude = posObj.longitude
      });


    },
  },
  pageLifetimes: {
    show() {
     
      const address = wx.getStorageSync(cache.ADDRESS)||[];
      if(address.length===0){
       
          wx.showModal({
            title:'注意',
            content:"检测到您没有设置地址，请先设置默认地址",
            success(){
              wx.navigateTo({
                url:"/pages/address/address"
              })
            }
          })
          
      }
      console.log('show')
      if (this.data.resetForm) {
          this._init(this.data.form)
      }
      this.data.resetForm = true
  },

  hide() {
      console.log('hide')
      if (this.data.resetForm) {
          this.setData({
              showForm: false
          })
      }
  }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeList: [
      {
        id: serviceType.PROVIDE,
        name: "用户提供",
      },
      {
        id: serviceType.SEEK,
        name: "小哥找单",
      },
    ],
    files:[],
    categoryList: [],
    categoryPickerIndex: null,
    typePickerIndex: null,
    error: null,
    resetForm: true,
    formData: {
      // type: 1,
      title: "",
      category_id: null,
      cover_image_id: null,
      description: "",
      designated_place: false,
      begin_date: "",
      end_date: "",
      weight:"",
      address:"",
      phone:"",
      latitude:"",
      longitude:""
    },
    rules: [
      // {
      //     name: 'type',
      //     rules: { required: true, message: '请指定服务类型' },
      // },
      {
          name: 'title',
          rules: [
              { required: true, message: '服务标题内容不能为空' },
              { minlength: 5, message: '服务描述内容不能少于 5 个字' },
          ],
      },
      {
          name: 'category_id',
          rules: { required: true, message: '未指定服务所属分类' },
      },
      {
        name: 'address',
        rules: { required: true, message: '未指定地址' },
    },
      {
          name: 'cover_image_id',
          rules: { required: true, message: '请上传封面图' },
      },
      {
          name: 'description',
          rules: [
              { required: true, message: '服务描述不能为空' },
              { minlength: 5, message: '服务描述内容不能少于 5 个字' },
          ],
      },
      {
          name: 'begin_date',
          rules: [
              { required: true, message: '请指定服务有效日期开始时间' },
          ],
      },
      {
          name: 'end_date',
          rules: [
              { required: true, message: '请指定服务有效日期结束时间' },
              {
                  validator: function (rule, value, param, models) {
                      if (moment(value).isSame(models.begin_date) || moment(value).isAfter(models.begin_date)) {
                          return null
                      }
                      return '结束时间必须大于开始时间'
                  }
              }
          ],

      },
      {
        name: 'phone',
        rules: [
            { required: true, message: '需填写手机号' },
            {
              validator:function(rule,value){
                let  mobile = /^[1][3,4,5,7,8][0-9]{9}$/;
                let isMoblie = mobile.exec(value)
                if(!isMoblie){
                  return '手机号码格式错误'
                }
              }
            }
           
        ],
    },
      // {
      //     name: 'price',
      //     rules: [
      //         { required: false, message: '请指定服务价格' },
      //         {
      //             validator: function (rule, value) {
      //                 // 正则表达式
      //                 const pattern = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
      //                 const isNum = pattern.test(value);

      //                 if (isNum) {
      //                     return null
      //                 }
      //                 return '价格必须是数字'
      //             }
      //         },
      //         { min: 1, message: '天下没有免费的午餐' },
      //     ],
      // },
      {
        name: 'weight',
        rules: [
            { required: true, message: '请指定废品重量' },
            {
                validator: function (rule, value) {
                    // 正则表达式
                    const pattern = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
                    const isNum = pattern.test(value);

                    if (isNum) {
                        return null
                    }
                    return '重量必须是数字'
                }
            },
            { min: 1, message: '最少为1kg' },
        ],
    },
  ],
  serviceTypeEnum:serviceType
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _init() {
      // const typePickerIndex = this.data.typeList.findIndex(
      //   (item) => this.data.form.type === item.id
      // );
      const categoryList = await Category.getCategoryList();
      const categoryPickerIndex = categoryList.findIndex(
        (item) => this.data.form.category_id === item._id
      );
  
      this.setData({
        showForm:true,
        // typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
        categoryPickerIndex:
          categoryPickerIndex !== -1 ? categoryPickerIndex : null,
        categoryList,
        files: this.data.form.cover_image ? [this.data.form.cover_image] : [],
       
        //深拷贝 浅拷贝
        formData: {
          // type: this.data.form.type,
          title: this.data.form.title,
          category_id: this.data.form.category_id,
          cover_image_id: this.data.form.cover_image
            ? this.data.form.cover_image._id
            : null,
          description: this.data.form.description,
          designated_place: this.data.form.designated_place,
          begin_date: this.data.form.begin_date,
          end_date: this.data.form.end_date,
          weight: this.data.form.weight,
          address:this.data.form.address,
          phone:this.data.form.phone,
          latitude:this.data.form.latitude,
          longitude:this.data.form.longitude
        },
      });
    },
    goGetAddress:function(){
      let addressList = wx.getStorageSync("address")
      let hasDefaultAddress = false;
      for(let i in addressList){
          if(addressList[i].isDefault === true){
             this.setData({
              ['formData.address']:`${addressList[i].province}${addressList[i].city}${addressList[i].county}${addressList[i].detailInfo}`
             })
             hasDefaultAddress = true;
             break;
          }
      }
      if(!hasDefaultAddress){
        wx.navigateTo({
          url:"/pages/address/address"
        })
        hasDefaultAddress=false;
      }
    },
    goGetPhone:function(){
      let addressList = wx.getStorageSync("address")
      let hasDefaultPhone = false;
      for(let i in addressList){
          if(addressList[i].isDefault === true){
             this.setData({
              ['formData.phone']:`${addressList[i].phone}`
             })
             hasDefaultPhone = true;
             break;
          }
      }
      if(!hasDefaultPhone){
        wx.navigateTo({
          url:"/pages/address/address"
        })
        hasDefaultPhone=false;
      }
    },
    submit() {
    
         
      this.selectComponent('#form').validate((valid, errors) => {
        if (!valid) {
            const errMsg = errors.map(error => error.message)
            this.setData({
                error: errMsg.join(';')
            })
            return
        }
        console.log(this.data.formData)
        this.triggerEvent('submit', { formData: this.data.formData })
    })
    },
    handleTypeChange: function (e) {
      const index = getEventParam(e, "value");
      this.setData({
        typePickerIndex: index,
        ["formData.type"]: this.data.typeList[index].id,
      });
    },
    handleInput: function (e) {
      const value = getEventParam(e, "value");
      const field = getDataSet(e, "field");

      this.setData({
        [`formData.${field}`]: value,
      });
    },
    handleCategoryChange: function (e) {
      const index = getEventParam(e, "value");
      this.setData({
        categoryPickerIndex: index,
        ["formData.category_id"]: this.data.categoryList[index]._id,
      });
    },
    handleSwitchChange: function (e) {
      const res = getEventParam(e, "value");
      this.setData({
        ["formData.designated_place"]: res,
      });
    },
    handleBeginDateChange: function (event) {
      const beginDate = getEventParam(event, "value");
      this.setData({
        ["formData.begin_date"]: beginDate,
      });
    },

    handleEndDateChange: function (event) {
      const endDate = getEventParam(event, "value");
      this.setData({
        ["formData.end_date"]: endDate,
      });
    },
    handleUploadSuccess: function (e) {
      const id = e.detail.files[0].id
      this.setData({
          ['formData.cover_image_id']: id
      })
    },
    handleUploadFail:function(e){
      console.log(e);
    },
    handleHidePage:function(){
      this.data.resetForm = false
    }
  },
});

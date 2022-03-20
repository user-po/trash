const { default: User } = require("../../model/user");
const { checkIdCard } = require("../../utils/checkId");
const { getEventParam, getDataSet } = require("../../utils/utils");
import Protocol from '../../model/protocol'
Component({
  data: {
    error:null,
    illustration: [],
    showPrivacyModal:false,
    resetForm: true,
    protocol:[],
    checked:false,
    formData: {
      name: "",
      phone: "",
      address: "",
      idNumber: "",
      illustration:null
    },
    rules: [
      {
          name: 'name',
          rules: { required: true, message: '需填写真实姓名' },
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
                    return '电话号码格式错误'
                  }
                }
              }
             
          ],
      },
      {
          name: 'address',
          rules: { required: true, message: '需填写地址' },
      },
      {
          name: 'idNumber',
          rules: [
              { required: true, message: '身份证号不能为空' },
              {
                validator:function(rule,value){
                    let isIdCard = checkIdCard(value)
                    if(!isIdCard){
                       return '身份证号码格式错误'
                    }
                }
              }
          ],
      },
      {
        name: 'illustration',
        rules: [
            { required: true, message: '身份证图片不能为空' },
            {
               validator:function(rule, value, param, models){
        
                   if(models.illustration<2){
                      return '图片必须有两张'
                   }
               }
            }
        ],
    },
  ],
  },
  properties: {

  },
  methods: {
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
    handleRegister:function(){
     const {checked} = this.data;

     if(!checked){
        wx.showModal({
          title:'错误',
          content:'请先同意用户服务协议及隐私政策'
        })
        return;
     }
      this.selectComponent('#form').validate(async (valid, errors) => {
        if (!valid) {
            const errMsg = errors.map(error => error.message)
            this.setData({
                error: errMsg.join(';')
            })
            return
        }

        wx.showLoading({ title: '正在提交', mask: true })

        const illustration = this.data.illustration.map(item => item.url)
        await User.registerServicer(this.data.formData.name,this.data.formData.phone,this.data.formData.address,this.data.formData.idNumber,illustration);
        
        wx.hideLoading()
        await wx.showModal({
            title: '提示',
            content: '注册成功，请耐心等待后台审核',
            showCancel: false
        })
        wx.navigateBack()
    })
    },
    getProtocolAndShow:async function(){
      const protocol = await Protocol.getProtocol();

      this.setData({
        protocol:protocol[1],
        showModal:true
      })
    },
    getPrivacyProtocol:async function(){
      const protocol = await Protocol.getProtocol();

      this.setData({
        protocol:protocol[2],
        showPrivacyModal:true
      })
    },
    handleInput: function (e) {
      const value = getEventParam(e, "value");
      const field = getDataSet(e, "field");

      this.setData({
        [`formData.${field}`]: value.trim(),
      });
    },
    
    handleUploadSuccess(event) {
      this.data.illustration =  this.data.illustration.concat(getEventParam(event, 'files')) 
   
      this.setData({
          ['formData.illustration']: this.data.illustration
      })
  },

  handleUploadDelete(event) {
      const deleteIndex = this.data.illustration
          .findIndex(item => item.key === event.detail.item.key)
      this.data.illustration.splice(deleteIndex, 1)
  },
  onChange:function(event){
    this.setData({
      checked: event.detail,
    });
  },
  handleModal:function(){
    wx.navigateBack({
      delta: 1,
    })
  }
  }
})
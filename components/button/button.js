Component({
  // 外部样式类
  externalClasses: ['i-button-class', 'i-button-special-class'],
  properties: {
      // 调用指定的开放能力
      openType: String,
      // 是否镂空
      plain: {
          type: Boolean,
          value: false
      },
      greenBorder:{
        type: Boolean,
        value: false
      },
      // 按钮背景色
      bgColor: {
          type: String,
          value: "#f3d066"
      },
      // 字体颜色
      fontColor: String,
      // 按钮宽度
      width: String,
      // 按钮高度
      height: String,
      // 按钮图标
      icon: String,
      // 按钮图标颜色
      iconColor: String,
      // 按钮圆角半径
      radius: {
          type: String,
          value: 0
      },
      // 按钮形状：square 方的，circle 圆角的，semicircle 半圆
      shape: {
          type: String,
          value: 'square'
      },
      // 是否显示特殊样式
      special: Boolean,
      // 按钮大小，三挡可选，mini、medium、long
      size: {
          type: String,
          value: 'medium'
      },
      // 是否显示边框
      border: Boolean
  },
  data: {
   show:false
  },
  methods: {
    getUserInfo:function(e){
        this.triggerEvent('getUserInfo',{e})
    },
    getPhonenumber:function(e){
        this.triggerEvent("getPhonenumber",{e})
    }
  }
});
Component({
  //添加自定义class
  externalClasses: ['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal弹窗
    show: {
      type: Boolean,
      value: false
    },
    //modal的高度
    height: {
      type: String,
      value: '80%'
    },
    title: {
      type: String,
      value: '标题'
    },
    confirmText:{
      type: String,
      value: '确定'
    },
    //控制底部是一个按钮还是两个按钮，默认两个
    single: {
      type: Boolean,
      value: true
    },
    //是否显示标题
    showtitle: {
      type: Boolean,
      value: false
    },
  },
 
  /**
   * 组件的初始数据
   */
  data: {
 
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    clickMask() {
      // 点击modal背景关闭遮罩层，如果不需要注释掉即可
      this.setData({ show: false })
    },
    cancel() {
      this.setData({ show: false })
      this.triggerEvent('cancel')
    },
    // 点击确定按钮的回调函数
    confirm() {
      this.setData({ show: false })
      this.triggerEvent('confirm')
    }
  }
})
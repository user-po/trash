Component({
  relations:{
    '../grid/grid':{
       type:'parent'
    }
  },
  data: {},
  properties: {
    icon: String,
    iconSize: {
        type: String,
        value: '50'
    },
    text: String,
    showBadge: Boolean,
    badgeCount: Number,
    cell: Object
},
  methods: {
    handleSelect: function () {
      this.triggerEvent('select',
          { cell: this.data.cell },
          // 事件冒泡
          { bubbles: true, composed: true }
      )
  }
  }
})
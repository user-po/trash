const { getEventParam, getDataSet } = require("../../../../utils/utils");

Component({
  data: {},
  properties: {
    addressList:{
      type:Array,
      value:[]
    }
  },
  methods: {
    setDefault: function (e) {
      let index = getDataSet(e,"index")
      this.triggerEvent('setDefault',{
           index
      })
    },
    edit: function (e) {
      let index = getDataSet(e,"index")
      this.triggerEvent('edit',{
           index
      })
    },
    delete: function (e) {
      let index = getDataSet(e,"index")
      this.triggerEvent('delete',{
           index
      })
      
    },
  }
})
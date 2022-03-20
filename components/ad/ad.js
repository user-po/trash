Component({
  data: {},
  properties: {
    imageList:{
       type:Array,
       value:[]
    },
    interval:{
      type:Number,
      value:4000,
    },
    duration:{
      type:Number,
      value:500
    },
    autoplay:{
      type:Boolean,
      value:true
    },
    indicatorDots: {
      type:Boolean,
      value:true
    }
  },
  methods: {}
})
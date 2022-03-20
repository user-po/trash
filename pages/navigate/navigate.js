Page({
    data:{
        from:{
            latitude: 0,
          longitude: 0
          },
          to:{
            latitude: 0,
            longitude: 0
          }
    },
    onLoad:function(options){
        let from = JSON.parse(options.from);
        let to = JSON.parse(options.to)
        this.setData({
            from,to
        })
        // this.setData({
        //     from:JSON.parse(options.from),
        //     to:JSON.parse(options.to)
        // })
    }
})
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'JOXBZ-YUFOU-KAXVX-2X7X2-Z5YX5-4BBW5' // 必填
});
Component({
  data: {
    markers: null,

    polyline: [{
      points: [{
        latitude: 0,
        longitude: 0
      }, {
        latitude: 0,
        longitude: 0
      }],
      dottedLine:true,
      width:2
    }],
  },
  properties: {
    from: {
      type: Object,
      value: {},
    },
    to: {
      type: Object,
      value: {},
    },
    scale: {
      type: Number,
      value: 13,
    },
  },
  lifetimes: {
    ready() {
      this._init();
    },
  },
  methods: {
    _init() {
      
      let markers = [
        {
          id: 0,
          iconPath: "../../images/car.png",
          latitude: this.data.to.latitude,
          longitude: this.data.to.longitude,
          width: 50,
          height: 50,
        },
      ];
      
      this.setData({
        markers,
       
      });
     
      this.navigate();
    },
    navigate() {
      wx.showLoading({
        title:'加载中'
      })
      var _this = this;
      //调用距离计算接口
      qqmapsdk.direction({
          mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
    //from参数不填默认当前地址
        from: {
            latitude: _this.data.to.latitude,
            longitude: _this.data.to.longitude
        },
        to: {
            latitude: _this.data.from.latitude,
            longitude: _this.data.from.longitude
        }, 
        success: function (res) {
         
            console.log(res);
            var ret = res;
            var coors = ret.result.routes[0].polyline, pl = [];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            var kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
                coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (var i = 0; i < coors.length; i += 2) {
                pl.push({ latitude: coors[i], longitude: coors[i + 1] })
            }
            console.log(pl)
            //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
            _this.setData({
                latitude:pl[0].latitude,
                longitude:pl[0].longitude,
                ['markers[0].latitude']:pl[0].latitude,
                ['markers[0].longitude']:pl[0].longitude,
                polyline: [{
                    points: pl,
                    color: '#31b977',
                    width: 4
                }]
             })
             console.log(_this.data)
        },
        fail: function (error) {
            wx.showToast({
              title: `${error.message}`,
              icon:'error',
              duration:3500
            })
        },
        complete: function (res) {
          wx.hideLoading()
            console.log(res);
         }
     });
    },
  },
});

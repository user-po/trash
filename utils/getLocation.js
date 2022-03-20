const getLocation = () => {
  return new Promise((resolve, reject) => {
      
      let _locationChangeFn = (res) => {
          resolve(res) // 回传地里位置信息
          wx.offLocationChange(_locationChangeFn) // 关闭实时定位
          wx.stopLocationUpdate(_locationChangeFn); // 关闭监听 不关闭监听的话，有时获取位置时会非常慢
      }
      wx.startLocationUpdate({
          success: (res) => {
              wx.onLocationChange(_locationChangeFn)
          },
          fail: (err) => {
              // 重新获取位置权限
              wx.openSetting({
                  success(res) {
                      res.authSetting = {
                          "scope.userLocation": true
                      }
                  }
              })
             // reject(err)
          }
      })
  })
}

export {getLocation}
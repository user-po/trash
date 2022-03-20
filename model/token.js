import Http from "../utils/http";
import APIConfig from "../config/api";
import cache from "../enum/cache";
class Token{
  static async getToken(){
    const code = wx.getStorageSync("code")||"";
     const res = await Http.request({
          url:'v1/token',
          data:{
             code,
             key:APIConfig.key
            // i_code:APIConfig.i_code,
            // order_no:APIConfig.order_no

          },
          method:'POST',
      })
     
      return res.token;
  }
  static async verifyToken() {
    const token = wx.getStorageSync(cache.TOKEN)
    return Http.request({
        url: 'v1/token/verify',
        data: { token },
        method: 'POST'
    })
}
}
export default Token;
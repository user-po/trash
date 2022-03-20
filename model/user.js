import Token from "./token" ;
import Http from '../utils/http'
import cache from '../enum/cache'
class User{
    static getUserInfoByLocal(){
        return wx.getStorageSync(cache.USER_INFO)
    }
    static async getUserInfoByRemote(openid){
        const res = await Http.request({
            url:'v1/miniUser/remote',
            data:{
               openid
            },
            method:'GET'
       })
       return res;
    }
    static async login(){
        //获取令牌 服务端新增用户
        const token = await Token.getToken();
        wx.setStorageSync(cache.TOKEN,token);
    }
    static async registerServicer(name,phone,address,idNumber,illustration){
        const res = await Http.request({
             url:'v1/miniUser/servicer',
             data:{
                realname:name,
                address,
                tel:phone,
                idNum:idNumber,
                idCardImgs:illustration
             },
             method:'POST'
        })
        return res;
    }
    static async getRegisteList(id,status){
        console.log(id)
        const res = await Http.request({
            url:`v1/miniUser/servicer/${id}`,
            data:{
                status
            }
        })
        return res;
    }
    static getRegisteStatus(){
        return Http.request({
            url:'v1/miniUser/servicer/list/count'
        })
    }
    static async updateUserInfo(userInfo){
        const res = await Http.request({
            url:'v1/miniUser',
            data:{
                nickname:userInfo.nickName,
                avatar:userInfo.avatarUrl,
            },
            method:'PUT',
        })
        wx.setStorageSync(cache.USER_INFO,res)
    }
}
export default User;
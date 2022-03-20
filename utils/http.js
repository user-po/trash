import APIConfig from "../config/api";
import exceptionMessage from "../config/exception-message";
import {wxToPromise} from "./wx";
import cache from "../enum/cache";
import User from "../model/user";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import  {timStore}  from "../store/tim";
class Http {
  static async request(params) {
    const {
      url,
      data,
      method = "GET",
      mock = false,
      refetch = true,
    } = params
    let response
    try {
        response = await wxToPromise("request", {
        url: (mock ? APIConfig.mockUrl : APIConfig.baseUrl) + url,
        data,
        method,
        header: {
          "content-type": "application/json",
          //token: wx.getStorageSync(cache.TOKEN),
           Authorization: `Bearer ${wx.getStorageSync(cache.TOKEN)}`
        },
      });
    } catch (error) {
      Http._showError(-1)
      throw new Error(error.errMsg)
    }

    //1.代码写错
    //2.无网络
    //3.服务端超市
    //全局的统一响应 异常处理
    // 请求成功
    if (response.statusCode < 400) {
      return response.data.data;
    }
    //请求失败
    if (response.statusCode === 401) {
      this.storeBindings = createStoreBindings(this, {
        store: timStore,
        fields:['sdkReady'],
        actions:{timLogout:'logout'}
    })
      //todo 令牌相关操作
      if (response.data.error_code === 10001) {
        if(this.sdkReady){
           this.timLogout();
        }
        wx.navigateTo({
          url: "/pages/login/login",
        });
        throw Error("请求未携带令牌");
      }
      if (refetch) {
        return await Http._refetch({ url, data, method, refetch });
      }
      if(this.sdkReady){
        this.timLogout();
     }
    }
    
    //接口错误信息 哪些适合直接展示
    Http._showError(response.data.error_code, response.data.msg);
   
    const error = Http._generateMessage(response.data.msg);
    throw new Error(error);
  }
  static _showError(errorCode, message) {
    
    let title = "";
    //定义不可展示的一些错误信息
    const errorMessage = exceptionMessage[errorCode];
    //展示 不可展示错误/错误/未知异常
    title = errorMessage || message ;
    //如果有多条错误的情况 转成字符串
    title = Http._generateMessage(title);

    if(title){
      wx.showToast({
        title,
        icon: "none",
        duration: 3000,
      });
    }
  }
  static async _refetch(data) {
    await User.login();
    data.refetch = false;
    return await Http.request(data);
  }
  static _generateMessage(message) {
    return typeof message === "object"
      ? Object.values(message).join(";")
      : message;
  }
}

export default Http;

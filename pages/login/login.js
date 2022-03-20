import User from "../../model/user";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { timStore } from "../../store/tim";
import { wxToPromise } from "../../utils/wx";

Page({
    data: {},
    onLoad: function () {
        this.storeBindings = createStoreBindings(this, {
            store: timStore,
            actions: { timLogin: 'login' },
        })

    },

    onUnload() {
        this.storeBindings.destroyStoreBindings()
    },

    handleLogin: async function () {
        const res = await wx.getUserProfile({
            desc: "完善用户信息"
        })
        // 异常，会中断后续代码的执行
        // 错误，不会中断后续代码的执行

        wx.showLoading({
            title: '正在授权',
            mask: true
        })
        try {
            const {code} = await wxToPromise('login')
            //保存code
            wx.setStorageSync("code",code)
            await User.login()
          
            await User.updateUserInfo(res.userInfo)
            this.timLogin()
            const events = this.getOpenerEventChannel()
            
            events.emit('login')
            wx.navigateBack({
                delta:2
            })
        } catch (e) {
            wx.showModal({
                title: '注意',
                content: '登陆失败，请稍后重试',
                showCancel: false
            })
            console.log(e)
        }
        wx.hideLoading()
    },

    handleToHome: function () {
        wx.switchTab({
            url: '/pages/home/home'
        })
    }
});

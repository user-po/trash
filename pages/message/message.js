// pages/message/message.js
import { timStore } from "../../store/tim";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { getDataSet } from "../../utils/utils";
import cache from "../../enum/cache";
import { setTabBarBadge } from "../../utils/wx";
import Token from '../../model/token'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        conversationList: [],
    
    
        // updateConversationList: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.storeBindings = createStoreBindings(this, {
            store: timStore,
            fields: ['sdkReady', 'conversationList'],
        })

        
     
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {
     
        const res = await Token.verifyToken()
        if (res.valid) {
            
            this.storeBindings = createStoreBindings(this, {
                store: timStore,
                actions: ['login']
            })
            await this.login()
            if(!this.sdkReady){
                this.onPullDownRefresh();
            }
            this.storeBindings.destroyStoreBindings()
        }
       
        const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
        setTabBarBadge(unreadCount)
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      
        this.storeBindings.destroyStoreBindings()
    },

    handleSelect: function (event) {
       
        const item = getDataSet(event, 'item')
        wx.navigateTo({
            url: `/pages/conversation/conversation?targetUserId=${item.userProfile.userID}&service=`,
  
        })
    },

    handleToLogin: function () {
        wx.navigateTo({
            url: '/pages/login/login'
        })
    },
    onPullDownRefresh() {
        console.log('refresh');
         setTimeout(()=>{
            wx.stopPullDownRefresh()
         },300)
        
    },
})

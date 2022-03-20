import { createStoreBindings } from "mobx-miniprogram-bindings";
import { timStore } from "../../store/tim";
import Tim from "../../model/tim";

Page({
    data: {
        targetUserId: null,
        service: null,
        isSent: false
    },
    onLoad: function (options) {
        this.storeBindings = createStoreBindings(this, {
            store: timStore,
            fields: ['sdkReady'],
            actions: ['pushMessage', 'resetMessage', 'getConversationList']
        })

        const targetUserId = options.targetUserId
        // const targetUserId = 'user1'
        this.setData({
            targetUserId: targetUserId,
            service: options.service ? JSON.parse(options.service) : null
        })
    },

    handleSendMessage: function (event) {
        const { type, content } = event.detail
        const message = Tim.getInstance().createMessage(type, content, this.data.targetUserId)
        this.pushMessage(message)
        Tim.getInstance().sendMessage(message)
        this.data.isSent = true
        // this.getOpenerEventChannel().emit('sendMessage')
    },

    handleLogin: function () {
        wx.navigateTo({
            url: '/pages/login/login'
        })
    },

    onUnload() {
        if (!this.data.isSent) {
            this.getConversationList()
        }
        this.resetMessage()
        this.storeBindings.destroyStoreBindings()
    }
});

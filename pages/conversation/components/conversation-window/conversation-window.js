import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { timStore } from "../../../../store/tim";
import { getEventParam } from "../../../../utils/utils";
import TIM from "tim-wx-sdk-ws"
import Tim from "../../../../model/tim";
import cache from '../../../../enum/cache'
import userMessage from '../../../../enum/user-message';
import servicerMessage from "../../../../enum/servicer-message";

Component({
    behaviors: [storeBindingsBehavior],
    properties: {
        targetUserId: String,
        service: Object
    },
    data: {
        text: '',
        scrollHeight: 0,
        userInfo:wx.getStorageSync(cache.USER_INFO)||[],
        customMessageList:[],
        pickerIndex:0,
        showPicker:false
    },
    storeBindings: {
        store: timStore,
        fields: ['messageList', 'intoView', 'isCompleted'],
        actions: ['getMessageList', 'setTargetUserId', 'scrollMessageList', 'pushMessage']
    },
    lifetimes: {
        async attached() {
            this._setNavigationBarTitle()
            this._setScrollHeight()
            this.setTargetUserId(this.data.targetUserId)
            this.handleShowPicker();
            const currentConversation = await Tim.getInstance().getConversationProfile(this.data.targetUserId)
            const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
            const newUnreadCount = unreadCount - currentConversation.unreadCount
            wx.setStorageSync(cache.UNREAD_COUNT, newUnreadCount)
            await this.getMessageList()
            if (this.data.service) {
                const message = Tim.getInstance().createMessage(TIM.TYPES.MSG_CUSTOM
                    , this.data.service, this.data.targetUserId, 'link')
                this.pushMessage(message)
            }
           

        }
    },
    methods: {
        handleMessageChange(e){
            
            const index = getEventParam(e, "value");
            
            this.setData({
                pickerIndex:index,
                text:this.data.customMessageList[index]
            })
        },
        handleShowPicker(){
         
            // this.setData({
            //     customMessageList:userMessage,
            //     showPicker:true
            //  })
         
                if(this.data.userInfo.isServicer === false){
                    this.setData({
                       customMessageList:userMessage,
                       showPicker:true
                    })
               }else{
                   this.setData({
                       customMessageList:servicerMessage,
                       showPicker:true
                   })
               }
            
        },

        async _setNavigationBarTitle() {
            const res = await Tim.getInstance().getUserProfile(this.data.targetUserId)
            wx.setNavigationBarTitle({ title: res[0].nick || '慕慕到家' })
        },

        handleSendLink: function (event) {
            const service = getEventParam(event, 'service')
           
            this.triggerEvent('sendmessage', {
                type: TIM.TYPES.MSG_CUSTOM,
                content: service
            })
        },

        handleSelect: function (event) {
            const service = getEventParam(event, 'service')
            wx.navigateTo({
                url: `/pages/service-detail/service-detail?service_id=${service._id}`
            })
        },

        handleSendImage: async function () {
            const chooseImage = await wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera']
            })

            this.triggerEvent('sendmessage', {
                type: TIM.TYPES.MSG_IMAGE,
                content: chooseImage
            })
        },

        handleInput: function (event) {
            this.data.text = getEventParam(event, 'value')
        },

        handleSend() {
            const text = this.data.text.trim();
            if (text === '') {
                return
            }

            this.triggerEvent('sendmessage', {
                type: TIM.TYPES.MSG_TEXT,
                content: text
            })

            this.setData({
                text: ''
            })
        },

        handleScrolltoupper: async function () {
            if (this.data.isCompleted) {
                return
            }
            wx.showLoading({ title: '正在加载...', mask: true })
            await this.scrollMessageList()
            setTimeout(() => wx.hideLoading(), 1000)
        },

        /**
         * @returns {void}
         */
        async _setScrollHeight() {
            const systemInfo = await wx.getSystemInfo()
            const scrollHeight = systemInfo.windowHeight - (systemInfo.screenHeight - systemInfo.safeArea.bottom) - 95
            this.setData({
                scrollHeight
            })
        },
    }
});

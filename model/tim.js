// 从v2.11.0起，SDK 支持了 WebSocket，推荐接入
import TIM from 'tim-wx-sdk-ws'
import TIMUploadPlugin from 'tim-upload-plugin';
import timConfig from "../config/tim";
import User from "./user";
// import genTestUserSig from "../lib/tim/generate-test-usersig";
import userSig from '../model/userSig'
class Tim {
    /**
     *
     * @type {Tim}
     */
    static instance = null
    _SDKInstance = null
    _nextReqMessageID = ''
    _messageList = []

    constructor() {
        // 单例模式

        // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
        let tim = TIM.create(timConfig.options); // SDK 实例通常用 tim 表示
        // 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#setLogLevel">setLogLevel 接口的说明</a>
        tim.setLogLevel(timConfig.logLevel);
        // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
        // 注册腾讯云即时通信 IM 上传插件
        tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
        this._SDKInstance = tim
    }

    static getInstance() {
        if (!Tim.instance) {
            Tim.instance = new Tim()
        }
        return Tim.instance
    }

    getSDK() {
        return this._SDKInstance
    }

    async login() {                
        const userInfo = User.getUserInfoByLocal()
        // /genTestUserSig(userInfo._id.toString())
        const textUserSig =  await userSig.getUserSig(userInfo._id.toString())
    
        await this._SDKInstance.login({
            userID: userInfo._id.toString(),
            userSig: textUserSig.userSig
        })
    }

    logout() {
        this._SDKInstance.logout()
    }

    async getUserProfile(targetUserId) {
        const res = await this._SDKInstance.getUserProfile({
            userIDList: [targetUserId]
        })
        return res.data
    }

    async updateUserProfile(userInfo) {
        await this._SDKInstance.updateMyProfile({
            nick: userInfo.nickname,
            avatar: userInfo.avatar,
            gender: userInfo.gender === 1 ? TIM.TYPES.GENDER_MALE : TIM.TYPES.GENDER_FEMALE
        })
    }

    async getConversationList() {
        const res = await this._SDKInstance.getConversationList()
        return res.data.conversationList
    }

    async getConversationProfile(targetUserId) {
        const res = await this._SDKInstance.getConversationProfile(`C2C${targetUserId}`)
        return res.data.conversation
    }

    async getMessageList(targetUserId, count = 10) {
        if (this.isCompleted) {
            return this._messageList
        }

        const res = await this._SDKInstance.getMessageList({
            conversationID: `C2C${targetUserId}`,
            nextReqMessageID: this._nextReqMessageID,
            count: count > 15 ? 15 : count
        })

        this._nextReqMessageID = res.data.nextReqMessageID
        this.isCompleted = res.data.isCompleted
        this._messageList = res.data.messageList

        return this._messageList
    }

    async setMessageRead(targetUserId) {
        const res = await this._SDKInstance.setMessageRead({
            conversationID: `C2C${targetUserId}`
        });
        return res.data
    }

    // 根据不同类型，创建不同的实例
    // 工厂模式
    createMessage(type, content, targetUserId, extension = null) {
        let message
        const params = {
            to: targetUserId,
            conversationType: TIM.TYPES.CONV_C2C,
            payload: null
        }
        switch (type) {
            case TIM.TYPES.MSG_TEXT:
                params.payload = { text: content }
                message = this._SDKInstance.createTextMessage(params)
                break
            case TIM.TYPES.MSG_IMAGE:
                params.payload = { file: content }
                message = this._SDKInstance.createImageMessage(params)
                break
            case TIM.TYPES.MSG_CUSTOM:
                params.payload = {
                    data: 'service',
                    description: JSON.stringify(content),
                    extension
                }
                message = this._SDKInstance.createCustomMessage(params)
                break
            default:
                throw Error('未知消息类型')
        }
        return message
    }

    async sendMessage(message) {
        this._SDKInstance.sendMessage(message)
    }

    reset() {
        this._nextReqMessageID = ''
        this.isCompleted = false
        this._messageList = []
        return this
    }
}

export default Tim

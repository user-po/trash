import { wxToPromise } from "../../utils/wx";
import APIConfig from "../../config/api";
import Refund from "../../model/refund";
import roleType from "../../enum/role-type";

Page({
    data: {
        order: null,
        formData: {
            reason: '',
        },
        images: [],
        rules: [
            {
                name: 'reason',
                rules: [
                    { required: true, message: '申请原因不能为空' },
                    { minlength: 20, message: '申请原因内容不能少于 20 个字' },
                ],
            },
        ]
    },
    onLoad: function (options) {
        const order = JSON.parse(options.order)
        this.setData({
            order,
            selectFile: this.selectFile.bind(this),
            uploadFile: this.uploadFile.bind(this)
        })
    },

    async handleSubmit() {

        this.selectComponent('#form').validate(async (valid, errors) => {
            if (!valid) {
                const errMsg = errors.map(error => error.message)
                this.setData({
                    error: errMsg.join('；'),
                })
                return
            }
            const data = {
                order_id: this.data.order.id,
                reason: this.data.formData.reason,
                illustration: this.data.images
            }
            try {
                wx.showLoading({ title: '正在发布...', mask: true })
                await Refund.createRefund(data)
                wx.hideLoading()
                const modalRes = await wx.showModal({
                    title: '提示',
                    content: '提交成功，请等待服务方同意确认，确认同意后款项会在 3-5 个工作日原路退款；'
                        + '如有争议，请到个人中心页面联系官方客服介入处理',
                    showCancel: false,
                })

                wx.navigateTo({
                    url: `/pages/refund-list/refund-list?role=${roleType.CONSUMER}`
                })
            } catch (e) {
                wx.hideLoading()
            }
        })
    },

    bindInputChange(event) {
        const { field } = event.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: event.detail.value
        })
    },

    selectFile: function (event) {
        console.log('select', event)
    },

    uploadFile: function (event) {
        // noinspection JSUnusedLocalSymbols
        return new Promise(async (resolve, reject) => {
            const files = { urls: [] }
            for (let i = 0; i < event.tempFilePaths.length; i++) {
                const uploaded = await wxToPromise('uploadFile', {
                    url: APIConfig.baseUrl + '/v1/file', //仅为示例，非真实的接口地址
                    filePath: event.tempFilePaths[i],
                    name: 'file',
                })

                files.urls.push(JSON.parse(uploaded.data).data[0].path)
            }
            resolve(files)
        })
    },

    handleUploadSuccess(event) {
        this.data.images = this.data.images.concat(event.detail.urls);
    },

    handleDelete(event) {
        this.data.images.splice(event.detail.index, 1)
    },

    handleUploadError(event) {
        console.log('error', event)
    },

});
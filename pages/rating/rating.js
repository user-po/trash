import { getEventParam } from "../../utils/utils";
import Rating from "../../model/rating";

Page({
    data: {
        formData: {
            score: 0,
            content: ''
        },
        rules: [
            {
                name: 'score',
                rules: [
                    { required: true, message: '请为该服务评分' },
                ],
            },
            {
                name: 'content',
                rules: [
                    { required: true, message: '评价内容不能为空' },
                    { minlength: 10, message: '评价内容不能少于 10 个字' },
                ],
            },
        ],
        illustration: []
    },
    onLoad: function (options) {
        const order = JSON.parse(options.order)
        this.setData({
            order
        })
    },

    handleSubmit() {
        this.selectComponent('#form').validate(async (valid, errors) => {
            if (!valid) {
                const errMsg = errors.map(error => error.message)
                this.setData({
                    error: errMsg.join(';')
                })
                return
            }

            wx.showLoading({ title: '正在提交', mask: true })
            const illustration = this.data.illustration.map(item => item.url)

            await Rating.createRating(this.data.order._id,
                this.data.formData.score, this.data.formData.content, illustration,this.data.order.mission_snap._id)
            wx.hideLoading()
            this.getOpenerEventChannel().emit('rating')
            await wx.showModal({
                title: '提示',
                content: '评价成功，点击确定返回订单详情',
                showCancel: false
            })
            wx.navigateBack()
        })
    },

    handleRating(event) {
        const score = getEventParam(event, 'rating')
        this.setData({
            ['formData.score']: score
        })
    },

    handleInputChange(event) {
        const value = getEventParam(event, 'value')
        this.setData({
            ['formData.content']: value
        })
    },

    handleUploadSuccess(event) {
        this.data.illustration = getEventParam(event, 'files')
    },

    handleUploadDelete(event) {
        const deleteIndex = this.data.illustration
            .findIndex(item => item.key === event.detail.item.key)
        this.data.illustration.splice(deleteIndex, 1)
    }


});

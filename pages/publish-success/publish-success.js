import ServiceStatus from "../../enum/service-status";

Page({
    data: {},
    onLoad: function (options) {
        this.data.type = options.type
    },

    handleCheckService: function () {
        wx.redirectTo({ url: `/pages/my-service/my-service?type=${this.data.type}&status=${ServiceStatus.PUBLISHED}` })
    },

    handleNavToHome: function () {
        wx.switchTab({
            url: '/pages/home/home'
        })
    }
});
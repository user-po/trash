import Refund from "../../model/refund";
import refundStatus from "../../enum/refund-status";
import { debounce } from "../../utils/utils";

const refundModel = new Refund()

Page({
    data: {
        tabs: ['待同意', '处理中', '全部记录'],
        currentTabIndex: 0,
        refundList: [],
        loading: false,
        RefundStatus: refundStatus,
        role: null,
        showStatus: false
    },
    onLoad: function (options) {
        const role = parseInt(options.role)
        this.setData({
            role,
        })
    },

    onShow: function () {
        this.getRefundList(this.data.currentTabIndex)
    },

    handleTabChange: debounce(async function (event) {
        const index = event.detail.index
        this.setData({
            currentTabIndex: index,
        })
        await this.getRefundList(index)
    }),

    handleNavToRefundDetail(event) {
        const refund = event.currentTarget.dataset.refund
        wx.navigateTo({ url: `/pages/refund-detail/refund-detail?role=${this.data.role}&refund=${JSON.stringify(refund)}` })
    },

    async getRefundList(index) {
        switch (index) {
            case 0:
                await this._getInitRefundList(refundStatus.UNAPPROVED)
                break;
            case 1:
                await this._getProcessingRefundList()
                break;
            case 2:
                await this._getInitRefundList()
                break;
        }
    },

    async _getInitRefundList(status = '') {
        this.setData({
            loading: true,
            showStatus: false,
        })
        const refundList = await refundModel.reset().getRefundListByStatus(this.data.role, status)
        this.setData({
            loading: false,
            showStatus: !refundList.length,
            refundList,
        })
        wx.pageScrollTo({
            scrollTop: 0
        })
    },

    async _getProcessingRefundList() {
        this.setData({
            loading: true,
            showStatus: false,
        })
        const refundList = await refundModel.reset().getProcessingRefundList(this.data.role)
        this.setData({
            loading: false,
            showStatus: !refundList.length,
            refundList,
        })
        wx.pageScrollTo({
            scrollTop: 0
        })
    },

    async onPullDownRefresh() {

        await this.getRefundList(this.data.currentTabIndex)
        wx.stopPullDownRefresh()
    },

    handleScrollToTop: function () {
        wx.pageScrollTo({
            scrollTop: 0
        })
    },

    async onReachBottom() {
        if (!refundModel.hasMoreData) {
            return
        }

        let refundList

        switch (this.data.currentTabIndex) {
            case 0:
                refundList = await refundModel.getRefundListByStatus(this.data.role, refundStatus.UNAPPROVED)
                break;
            case 1:
                refundList = await refundModel.getProcessingRefundList(this.data.role)
                break;
            case 2:
                refundList = await refundModel.getRefundListByStatus(this.data.role, '')
                break;
        }
        this.setData({
            refundList
        })
    }
});

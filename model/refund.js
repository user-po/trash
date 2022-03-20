/**
 * @Created by WebStorm
 * @Author: 沁塵
 * @Desc:
 */
import Http from "../utils/http";
import Base from "./base";

class Refund extends Base {

    static async createRefund(data) {
        return Http.request({
            url: 'v1/refund',
            data,
            method: 'POST'
        })
    }

    static async updateRefundStatus(refundId, status) {
        return Http.request({
            url: `v1/refund/${refundId}`,
            data: {
                action: status
            },
            method: 'POST'
        })
    }

    static async getRefundById(refundId) {
        return await Http.request({
            url: `v1/refund/${refundId}`,
        });
    }

    async getRefundListByStatus(role, status) {
        if (!this.hasMoreData) {
            return this.data
        }

        const refundList = await Http.request({
            url: 'v1/refund',
            data: {
                page: this.page,
                count: this.count,
                role,
                status
            }
        });

        this.data = this.data.concat(refundList.data)
        this.hasMoreData = this.page !== refundList.last_page
        this.page++
        return this.data
    }

    async getProcessingRefundList(role) {
        if (!this.hasMoreData) {
            return this.data
        }

        const refundList = await Http.request({
            url: 'v1/refund/process',
            data: {
                page: this.page,
                count: this.count,
                role
            }
        });

        this.data = this.data.concat(refundList.data)
        this.hasMoreData = !(this.page === refundList.last_page)
        this.page++
        return this.data
    }
}

export default Refund

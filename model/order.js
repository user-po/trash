import Http from "../utils/http";
import Base from "./base";

class Order extends Base {
    static createOrder(serviceId, address,to) {
        return Http.request({
            url: 'v1/order',
            data: {
                service_id: serviceId,
                address: address,
                to:to
            },
            method: 'POST'
        })
    }
    static async checkHasOrder(mission_id,servicerId){
        const list = await Http.request({
            url:'v1/order/check',
            data:{
                mission_id,
                servicerId
            }
        })
        return list;
    }
    static getOrderStatus(role) {
        return Http.request({
            url: `v1/order/count?role=${role}`
        })
    }

    async getMyOrderList(role, status) {
        if (!this.hasMoreData) {
            return this.data
        }
        const orderList = await Http.request({
            url: 'v1/order/my',
            data: {
                page: this.page,
                count: this.count,
                role,
                status
            }
        })

        this.data = this.data.concat(orderList.data)
        this.hasMoreData = this.page !== orderList.last_page
        this.page++
        return this.data

    }

    static updateOrderStatus(orderId, action) {
       
        return Http.request({
            url: `v1/order/${orderId}`,
            data: {
                action
            },
            method: 'POST'
        })
    }

    static getOrderById(orderId) {
        return Http.request({
            url: `v1/order/${orderId}`
        })
    }
}

export default Order
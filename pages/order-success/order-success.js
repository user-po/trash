import roleType from "../../enum/role-type";
import orderStatus from "../../enum/order-status";

Page({
    data: {},
    onLoad: function (options) {

    },

    handleCheckOrder:function () {
        wx.navigateTo({
            url:`/pages/my-order/my-order?role=${roleType.CONSUMER}&status=${orderStatus.UNPAID}`
        })
    },

    handleNavToHome:function (){
        wx.switchTab({
            url:'/pages/home/home'
        })
    }
});

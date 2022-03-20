import behavior from "../behavior";

Component({
    behaviors: [behavior],
    properties: {},
    data: {},
    methods: {
        handlePay: function () {
            this.triggerEvent('pay')
        },

        handleRefund() {
            this.triggerEvent('refund')
        },

    
    }
});

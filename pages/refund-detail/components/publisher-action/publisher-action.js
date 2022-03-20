import refundStatus from "../../../../enum/refund-status";
import refundAction from "../../../../enum/refund-action";

Component({
    properties: {
        status: Number
    },
    data: {
        RefundStatus: refundStatus,
        refundAction: refundAction
    },
    methods: {
        handleAction(event) {
            const status = event.currentTarget.dataset.status
            this.triggerEvent('action', { status })
        }
    }
});

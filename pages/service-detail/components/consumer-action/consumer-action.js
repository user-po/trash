import serviceType from "../../../../enum/service-type";
import behavior from "../behavior";

Component({
    behaviors: [behavior],
    properties: {},
    data: {
        serviceTypeEnum: serviceType
    },
    methods: {
        handleChat: function () {
            this.triggerEvent('chat')
        },
        handleOrder: function () {
            this.triggerEvent('order')
        }
    }
});

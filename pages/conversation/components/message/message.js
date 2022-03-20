import { formatTime } from "../../../../utils/date";
import TIM from "tim-wx-sdk-ws"
import { getDataSet, getEventParam } from "../../../../utils/utils";

Component({
    properties: {
        message: Object
    },
    observers: {
        'message': function (message) {
            message.time = formatTime(message.time)
            this.setData({
                _message: message
            })
        }
    },
    data: {
        TIM: TIM,
        flowEnum: {
            IN: 'in',
            OUT: 'out'
        },
      
    },
    methods: {
        async handlePreview(event) {
            const url = getDataSet(event, 'image')
            await wx.previewImage({
                urls: [url],
                current: url
            })
        },
        handleSend(event) {
            const service = getEventParam(event, 'service')
            this.triggerEvent('send', { service })
        },

        handleSelect(event) {
            const service = getEventParam(event, 'service')
            this.triggerEvent('select', { service })
        }
    }
});

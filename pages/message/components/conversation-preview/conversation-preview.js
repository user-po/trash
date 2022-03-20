import { formatTime } from "../../../../utils/date";

Component({
    properties: {
        user: Object,
        lastMessage: Object,
        unreadCount: Number
    },
    observers: {
        'lastMessage': function (message) {
            message.lastTime = formatTime(message.lastTime)
            this.setData({
                _lastMessage: message
            })
        }
    },
    data: {
        _lastMessage: null
    },
    methods: {}
});

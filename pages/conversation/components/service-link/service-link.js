Component({
    properties: {
        flow: String,
        service: String,
        extension: String,
    },
    lifetimes: {
        attached() {
            this.setData({
                _service: JSON.parse(this.data.service)
            })
        }
    },
    data: {
        _service: null,
        flowEnum: {
            IN: 'in',
            OUT: 'out'
        }
    },
    methods: {
        handleSendLink: function () {
            this.triggerEvent('send', { service: this.data._service })
        },

        handleSelect: function () {
           
            this.triggerEvent('select', { service: this.data._service })
        }
    }
});
